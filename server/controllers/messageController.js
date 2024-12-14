import asynsHandler from "express-async-handler";
import Chat from "../models/Chat.js";
import Message from "../models/Message.js";

/**
 * @description create new message
 * @method POST
 * @route /api/v1/message/new-message
 * @access public
 */
export const createNewMessage = asynsHandler(async (req, res) => {
  // create message
  const message = new Message(req.body);

  //   check new chat
  if (!message) {
    return res.status(400).json({ message: "something wrong!" });
  }

  //   save chat in database
  const saveMessage = await message.save();

  //   update the chat collection last message
  const currentChat = await Chat.findOneAndUpdate(
    {
      _id: req.body.chatId,
    },
    {
      lastMessage: saveMessage._id,
      $inc: { unReadMessageCount: 1 },
    }
  );

  res
    .status(201)
    .json({ data: saveMessage, message: "message send successfull!" });
});

/**
 * @description get all message
 * @method GET
 * @route /api/v1/message/all-message/:chatId
 * @access public
 */
export const getAllMessage = asynsHandler(async (req, res) => {
  // find all message
  const allmessage = await Message.find({ chatId: req.params.chatId }).sort({
    createdAt: 1,
  });

  //   check message
  if (allmessage.length === 0) {
    return res.status(404).json({ message: "message not found!" });
  }

  res
    .status(201)
    .json({ data: allmessage, message: "message fetched successfull!" });
});
