import mongoose from "mongoose";

// create chat schema
const chatSchema = mongoose.Schema(
  {
    members: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "users" }],
    },
    lastMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "messages",
    },
    unReadMessageCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

// export default
export default mongoose.model("Chat", chatSchema);
