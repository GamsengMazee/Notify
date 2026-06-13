import { Schema, model, models } from "mongoose";

const updatevr = new Schema({
  secret_key: {
    type: String,
    required: true,
  },

  version_name: {
    type: String,
    required: true,
  },
  version_number: {
    type: Number,
    required: true,
  },
});

const updateSchema = models.updatevr || model("updatevr", updatevr);

export default updateSchema;
