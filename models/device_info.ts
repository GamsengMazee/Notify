import { Schema, model, models } from "mongoose";

const device_data = new Schema({
  device_id: {
    type: String,
    required: true,
  },
  device_name: {
    type: String,
    required: true,
  },
  device_ip: {
    type: String,
    required: true,
  },
  last_update: {
    type: String,
    required: true,
  },
  fcm_token: {
    type: String,
    required: true,
  },

  api_level: {
    type: String,
    required: true,
  },
  version: {
    type: String,
    required: true,
  },
});

const deviceSchema = models.device_data || model("device_data", device_data);

export default deviceSchema;
