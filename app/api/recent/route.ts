import notifiSchema from "@/models/notification_schema";
import db from "@/utils/db";




export async function GET() {
  try {
    await db();
    const data = await notifiSchema.find();

    return new Response(JSON.stringify({ data }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }
}