// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { IItemProps } from "../../types";

const mailer = require("@sendgrid/mail");
mailer.setApiKey(process.env.SENDGRID_API_KEY);

/**
 * Function to handle API requests.
 * @param {NextApiRequest} req - API request.
 * @param {NextApiResponse} res - API result.
 * @return {Promise<void>} - Promise.
 */
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const body = JSON.parse(req.body);

  // message to sent to chat
  const messageText = `👋 *Был получен новый заказ с сайта!*\n\n - Имя заказчика: ${
    body.clientName
  }\n - Связь через: ${body.contactType}\n - Конактные данные: ${
    body.contactType === "Email"
      ? `${body.contactInfo}`
      : `+7${body.contactInfo}`
  }\n - Детали заказа (${body.chartItems.length} шт.): ${body.chartItems
    .map((item: IItemProps) => item.title)
    .join(", ")}
      `;

  return new Promise<void>((resolve, reject) => {
    fetch(
      `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: "post",
        cache: "no-cache",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: 123,
          text: messageText,
          parse_mode: "markdown",
        }),
      }
    )
      .then((response) => {
        // send error report to the developer
        if (!response.ok) {
          const errorReport = `
            Order details have not been sent to the Telegram chat:\r\n\r\n
            Telegram chat id (env): ${process.env.TELEGRAM_CHAT_ID}\r\n
            Link to getUpdates: https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/getUpdates\rn
          `;

          const mailOptions = {
            from: process.env.DEV_EMAIL, // sender address
            to: [process.env.DEV_EMAIL, process.env.DEV_EMAIL_SECONDARY], // list of receivers
            subject: "Biopolyarka API reports errors", // subject line
            text: errorReport, // plain text body
            html: errorReport.replace(/\r\n/g, "<br>"), // html body
          };

          (async () => {
            try {
              await mailer.send(mailOptions);
              res.status(200);
            } catch (error) {
              throw reject(
                new Error("Couldn't sent the error report to devs.")
              );
            }
          })();

          reject(
            new Error("Order details have not been sent to the Telegram chat.")
          );
        }
      })
      .then(() => {
        res.status(200); // telegram message was sent successfully
        res.end();
        resolve();
      })
      .catch((err) => {
        console.error("An error occured on the server (internal):", err);
        res.status(err).end; // telegram message wasn't sent
        return resolve();
      });
  });
}
