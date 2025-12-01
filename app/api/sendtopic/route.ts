
// src/app/api/sendtopic

import admin from "@/utils/admin";

export async function POST(request: Request) {
  try {
    const body = await request.json(); // 👈 parse incoming JSON
    const { topic, title, message_body, data, image_url } = body;

    console.log(body)

    // ✅ validation
    if (!topic || !title || !message_body) {
      return new Response(JSON.stringify({ error: 'Missing fields' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const message = {
    notification: {
      title,
      body: message_body,
      ...(image_url ? { image_url } : {})
    },
    data: data || {},
    topic, 
  };

  try {
    const response = await admin.messaging().send(message);
    console.log('Successfully sent message:', response);
    
     return new Response(JSON.stringify({ success: true, response  }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error sending message:', error);
    throw new Error('Failed to send message');
  }
     
   
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Invalid JSON' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }
} 