
// src/app/api/decrypt/route.ts

import admin from "@/utils/admin";

export async function POST(request: Request) {
  try {
    const body = await request.json(); // 👈 parse incoming JSON
    const { token, title, message_body } = body;


    // ✅ validation
    if (!token || !title || !message_body) {
      return new Response(JSON.stringify({ error: 'Missing fields' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const message = {
    notification: {
      title,
      body: message_body,
    },
    token: token, // FCM token of the target Android device
  };

  try {
    const response = await admin.messaging().send(message);
    console.log('Successfully sent message:', response);
    
     return new Response(JSON.stringify({ success: true, response  }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.log(error);
    throw new Error('Failed to send message');
  }
     
   
    

   
  } catch (error) {
    console.log(error)
    return new Response(JSON.stringify({ error: 'Invalid JSON' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}