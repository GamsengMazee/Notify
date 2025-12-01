import deviceSchema from "@/models/device_info";
import db from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";



export async function GET(request: NextRequest) {
  try {
 
    await db();
    const result = await deviceSchema.find()                 

    if (!result) {
      return NextResponse.json({ message: "No Users found" }, { status: 403 });
    }

    return NextResponse.json({ result }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ message: "Server Error" }, { status: 500 })
  }

}