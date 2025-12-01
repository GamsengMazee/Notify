import Register from "../../../models/register_schema";
import db from "../../../utils/db";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  // Get cookies
  const cookieStore = await cookies();
  
  // Parse the request body
  const body = await request.json();
  const { name, password } = body;

  // Check for missing fields and return a response if any are missing
  if (!name || !password) {
    return new Response(
      JSON.stringify({ message: "Name and password are required" }),
      {
        status: 400, // Bad request
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  // Connect to the database
  await db();

  try {
    // Find user in the database
    const loginUser = await Register.findOne({ name: name });

    if (!loginUser) {
      // If user is not found
      return new Response(
        JSON.stringify({ message: "Invalid Credentials" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Compare the provided password with the stored hash
    const isMatch = await bcrypt.compare(password, loginUser.password);

    if (isMatch) {
      // If password matches, generate auth token
      const token = await loginUser.generateAuthToken();

      // Set the auth token in the cookies
      cookieStore.set({
        name: "_cookie_snp",
        value: token,
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 7, // 7 days
        secure: process.env.SERVER_TYPE === "production", // Use secure cookies in production
      });

      return new Response(
        JSON.stringify({ message: "Login Successful" }),
        {
          status: 200, // OK status
          headers: { "Content-Type": "application/json" },
        }
      );
    } else {
      // If password doesn't match
      return new Response(
        JSON.stringify({ message: "Invalid Credentials" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
  } catch (error) {
    // Catch any unexpected errors
    console.error(error);
    return new Response(
      JSON.stringify({ message: "An error occurred during login" }),
      {
        status: 500, // Internal server error
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
