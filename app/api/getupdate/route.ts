import updateSchema from "@/models/update_schema";
import db from "@/utils/db";




export async function GET() {
  try {
    await db();

    const data = await updateSchema.findOne();

    if (!data) {
      return new Response(
        JSON.stringify({ error: "No update record found" }),
        {
          status: 404,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    return new Response(
      JSON.stringify({
        version_name: data.version_name,
        version_number: data.version_number,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}