import { Schema, model, models } from "mongoose";

const notifi_data = new Schema({
    title: {
        type: String,
        required: true
    },
    target_audience: {
        type: String,
        required: true
    },
    message_body: {
        type: String,
        required: true
    },
    image_url: {
        type: String,
        required: false
    },
    icon_url: {
        type: String,
        required: false
    },
    action_url: {
        type: String,
        required: false
    },
    priority: {
        type: String,
        required: false
    },
    life_span: {
        type: Number,
        required: false
    },
    custom_data: {
        type: Object,
        required: false,
        default: {}
    }
})

const notifiSchema = models.notifi_data || model("notifi_data", notifi_data)

export default notifiSchema;