import Register from "../../../models/register_schema";
import db from "../../../utils/db";

/**
 * @route       POST /api/register
 * @description Add admin credentials into the db
 * @access      Admin
 * @author      Gam Marak
 * @created     2025-09-04
 *
 * @returns     {Object} 200 - JSON object of the user
 *              {Object} 500 - Server error
 */

//This is not for production
export async function POST(request: Request) {
    const body = await request.json();
  const { name, password } = body;
  if (!name || !password) {
    return;
  } else {
    await db();
    try {
      const registerUser = await Register.create({ name, password });
      return new Response(JSON.stringify({ registerUser }), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
    } catch (error) {
      return new Response(JSON.stringify({ error }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
    }
  }
}