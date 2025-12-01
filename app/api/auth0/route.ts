import Register from "../../../models/register_schema";
import db from "../../../utils/db";
import { cookies } from "next/headers";

 const jwt = require("jsonwebtoken");

export async function GET() {
    const cookieStore = await cookies();

    const token =cookieStore.get("_cookie_snp")

     
    try {
      await db();
      //verify token from user
      const id = jwt.verify(token?.value, process.env.SECRET_KEY);
      const tokenId = JSON.stringify(id._id)

      //find the id from db
      const user = await Register.findOne({ _id: id._id });
      const userId = JSON.stringify(user._id)

      if(userId === tokenId){
        return new Response(JSON.stringify({ message: "Login Successful" }), {
          status: 201,
          headers: { "Content-Type": "application/json" },
        });
      }else{
        return new Response(JSON.stringify({ message: "Unauthorized is not Allowed" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
      }
    } catch (error) {
      return new Response(JSON.stringify({error, message: "Unauthorized is not Allowed" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }
  }