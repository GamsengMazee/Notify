import { decryptObject } from "@/utils/crypto";


// src/app/api/decrypt/route.ts

export async function POST(request: Request) {
  try {
    const body = await request.json(); // 👈 parse incoming JSON
    const { iv, auth_tag, data } = body;

    // ✅ validation
    if (!iv || !auth_tag || !data) {
      return new Response(JSON.stringify({ error: 'Missing fields' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }
     
    //Decryt data
    const decrypted_data = decryptObject(body)
    

    return new Response(JSON.stringify({ success: true,  decrypted_data  }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    return new Response(JSON.stringify({ error: 'Invalid JSON' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
