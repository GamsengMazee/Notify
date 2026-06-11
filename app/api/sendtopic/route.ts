// src/app/api/sendtopic

import notifiSchema from "@/models/notification_schema";
import admin from "@/utils/admin";
import db from "@/utils/db";

export async function POST(request: Request) {
  try {
    const body = await request.json(); // 👈 parse incoming JSON
    const { topic, title, message_body, data, image_url } = body;

    console.log(body);

    // ✅ validation
    if (!topic || !title || !message_body) {
      return new Response(JSON.stringify({ error: "Missing fields" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const message = {
      notification: {
        title,
        body: message_body,
        ...(image_url ? { image_url } : {}),
      },
      data: data || {},
      topic,
    };

    try {
      const response = await admin.messaging().send(message);
      console.log("Successfully sent message:", response);
      
      //store data to db
      await db();
      const db_data = await new notifiSchema({
        title,
        message_body,
      });
        await db_data.save();

        /****Remove docs exceeding 10*****/
        
       // Count documents
      const count = await notifiSchema.countDocuments();

      if (count > 10) {
        // Find oldest document
        const oldest = await notifiSchema.findOne().sort({ createdAt: 1 }); // oldest first

        if (oldest) {
          console.log(oldest)
          await notifiSchema.findByIdAndDelete(oldest._id);
        }
      }

      return new Response(JSON.stringify({ success: true, response }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      console.log(error);
      throw new Error("Failed to send message");
    }
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ error: "Invalid JSON" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }
}
