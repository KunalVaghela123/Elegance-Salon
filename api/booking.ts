import type { VercelRequest, VercelResponse } from '@vercel/node';
import mongoose from 'mongoose';

// 1. Define the Mongoose Schema
const BookingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  service: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  status: { type: String, default: 'pending' }
});

// 2. Prevent Overwriting Model upon hot reload
const Booking = mongoose.models.Booking || mongoose.model('Booking', BookingSchema);

// 3. Database Connection Logic (Cached for Serverless)
// Note: We fallback to the provided string if the environment variable is missing.
const DEFAULT_URI = "mongodb+srv://payalvaghelakunal_db_user:Kunal%40123@elegancebeautysalon.dec7xw3.mongodb.net/elegance-salon?retryWrites=true&w=majority";
const MONGODB_URI = process.env.MONGODB_URI || DEFAULT_URI;

// Cached connection interface
let cached = (globalThis as any).mongoose;

if (!cached) {
  cached = (globalThis as any).mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (!MONGODB_URI) {
    throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
  }

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };
    console.log("Connecting to MongoDB...");
    cached.promise = mongoose.connect(MONGODB_URI, opts as any).then((mongoose) => {
      console.log('MongoDB connected successfully');
      return mongoose;
    }).catch(err => {
      console.error("MongoDB Connection Error:", err);
      throw err;
    });
  }
  
  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Add CORS headers to support local development if needed
  res.setHeader('Access-Control-Allow-Credentials', "true");
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Handle preflight request
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    await connectDB();

    const { name, phone, date, time, service } = req.body;

    // Validation
    if (!name || !phone || !date || !time) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Save to Database
    const newBooking = new Booking({
      name,
      phone,
      date,
      time,
      service,
    });

    await newBooking.save();

    // ---------------------------------------------------------
    // Notification Systems
    // ---------------------------------------------------------

    // 1. Discord Webhook (Highly Reliable & Free)
    // We use the environment variable if available, otherwise fallback to the provided URL.
    const discordWebhookUrl = process.env.DISCORD_WEBHOOK_URL || "https://discord.com/api/webhooks/1457035635901857978/rxdkqJQdacImuKkpacfEkc3rnUgafRq25ewDLMBBYmMrQmlbg87gnvkFqjCEhA40oELL";

    if (discordWebhookUrl) {
      try {
        await fetch(discordWebhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            username: "Elegance Salon Bot",
            avatar_url: "https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=200&auto=format&fit=crop",
            content: "💅 **New Appointment Request!**",
            embeds: [{
              title: "Booking Details",
              color: 0xD4AF37, // Gold
              fields: [
                { name: "Name", value: name, inline: true },
                { name: "Phone", value: phone, inline: true },
                { name: "Service", value: service.charAt(0).toUpperCase() + service.slice(1), inline: true },
                { name: "Date", value: date, inline: true },
                { name: "Time", value: time, inline: true },
              ],
              footer: { text: "Please call the customer to confirm." },
              timestamp: new Date().toISOString()
            }]
          })
        });
        console.log("Discord notification sent.");
      } catch (err) {
        console.error("Discord notification failed:", err);
      }
    }

    // 2. WhatsApp Notification via CallMeBot (Free)
    // Sometimes unstable or requires re-activation.
    if (process.env.WHATSAPP_API_KEY && process.env.WHATSAPP_PHONE) {
      try {
        const message = `New Booking Alert! 💅\n\nName: ${name}\nPhone: ${phone}\nDate: ${date}\nTime: ${time}\nService: ${service}`;
        const encodedMessage = encodeURIComponent(message);
        
        // CallMeBot API URL
        const whatsappUrl = `https://api.callmebot.com/whatsapp.php?phone=${process.env.WHATSAPP_PHONE}&text=${encodedMessage}&apikey=${process.env.WHATSAPP_API_KEY}`;
        
        // Fire and forget
        await fetch(whatsappUrl);
        console.log("WhatsApp notification request sent.");
      } catch (notifyError) {
        console.error('WhatsApp notification failed:', notifyError);
      }
    }

    return res.status(200).json({ 
      success: true, 
      message: 'Booking saved successfully',
      id: newBooking._id 
    });

  } catch (error: any) {
    console.error('API Error:', error);
    return res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
}