import { Schema, model, models } from "mongoose";

const notifi_data = new Schema({
  title: {
    type: String,
    required: true,
  },

  message_body: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

const notifiSchema = models.notifi_data || model("notifi_data", notifi_data);

export default notifiSchema;
