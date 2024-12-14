import asynsHandler from "express-async-handler";
import Chat from "../models/Chat.js";

/**
 * @description create chat
 * @method POST
 * @route /api/v1/chat/create-new-chat
 * @access public
 */
export const createNewChat = asynsHandler(async (req, res) => {
  // create chat
  const chat = new Chat(req.body);

  //   check new chat
  if (!chat) {
    return res.status(400).json({ message: "something wrong!" });
  }

  //   save chat in database
  const saveChat = await chat.save();

  res.status(201).json({ data: saveChat, message: "chat create successfull!" });
});
/**
 * @description get all chat
 * @method GET
 * @route /api/v1/chat/get-all-chat
 * @access public
 */
export const getAllChat = asynsHandler(async (req, res) => {
  // create chat
  const chats = await Chat.find({ members: { $in: req.body.userId } });

  //   check chats
  if (chats.length === 0) {
    return res.status(404).json({ message: "chat not found!" });
  }

  res.status(200).json({ data: chats, message: "chat fetched successfull!" });
});
