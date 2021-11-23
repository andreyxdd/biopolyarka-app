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
  const TelegramBot = require("telegrambot");
  const api = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN);

  // Update the offset to the last receive update_id + 1
  api.invoke(
    "getUpdates",
    { offset: 0 },
    function (err: string, updates: Object) {
      if (err) throw err;
      console.log(updates);
    }
  );

  const body = JSON.parse(req.body);

  const messageText = `
  A new order has been recieved via BIOPOLYARKA APP:

  Client Name: ${body.clientName}
  Contact via: ${body.contactType}
  Contact details: +7${body.contactDetails}
  Order details: ${body.orderDetails}
  `;

  api.sendMessage(
    { chat_id: process.env.TELEGRAM_CHAT_ID, text: messageText },
    function (err: string, message: Object) {
      if (err) throw err;
      console.log(message);
    }
  );

  res.status(200).json({ name: "John Doe" });
}
