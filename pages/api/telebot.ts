// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

/**
 * Function to handle API requests.
 * @param {NextApiRequest} req - API request.
 * @param {NextApiResponse<Data>} res - API result.
 */
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const TeleBot = require("telebot");
  const bot = new TeleBot(process.env.TELEGRAM_BOT_TOKEN);

  const body = JSON.parse(req.body);

  bot.start();

  const messageText = `
  A new order has been recieved via BIOPOLYARKA APP:

  Client Name: ${body.clientName}
  Contact via: ${body.contactType}
  Contact details: +7${body.contactDetails}
  Order details: ${body.orderDetails}
  `;

  bot.sendMessage(process.env.TELEGRAM_CHAT_ID, messageText);

  console.log(messageText);
}
