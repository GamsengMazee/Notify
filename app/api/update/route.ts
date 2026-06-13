// src/app/api/decrypt/route.ts
import updateSchema from "@/models/update_schema";
import db from "@/utils/db";

export async function POST(request: Request) {
  try {
    const body = await request.json(); // 👈 parse incoming JSON
    const { secret_key, version_name, version_number } = body;

    console.log(secret_key, "    " + version_name,   "    " + version_number   )

    // ✅ validation
    if (!secret_key || !version_name || !version_number) {
      return new Response(JSON.stringify({ error: "Missing fields" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }
    try {
      const response = "App Version Update Request Sent Successfully";

      if(secret_key !== "1960") return

      //store data to db
      await db();
      const db_data = await  updateSchema.findByIdAndUpdate("6a2d4a65991d085d4a245daf", {
        version_name,
        version_number
      });
      await db_data.save();

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
