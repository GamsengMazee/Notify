import deviceSchema from "@/models/device_info";
import db from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      device_name,
      device_id,
      device_ip,
      last_update,
      api_level,
      version,
      fcm_token,
    } = body;

    if (
      !device_id ||
      !device_name ||
      !device_ip ||
      !last_update ||
      !api_level ||
      !version ||
      !fcm_token
    ) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    await db();
    const check_id = await deviceSchema.findOne({ device_id }); //check if device already exist in db
    

    if (check_id && fcm_token == check_id.fcm_token) {
      return NextResponse.json(
        { message: "Device already exists" },
        { status: 208 }
      );
    } else if (check_id && fcm_token !== check_id.fcm_token) {
      const newData = await deviceSchema.findByIdAndUpdate(
        { _id: check_id._id },
        {
          device_name,
          device_id,
          device_ip,
          last_update,
          api_level,
          version,
          fcm_token,
        },
        { new: true }
      );
      return NextResponse.json(
        { message: "Device Info Updated!" },
        { status: 200 }
      );
    }

    const data = await new deviceSchema({
      device_name,
      device_id,
      device_ip,
      last_update,
      api_level,
      version,
      fcm_token,
    });
    await data.save();

    return NextResponse.json(
      { message: "Stored successfully" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}
