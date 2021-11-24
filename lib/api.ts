import { createClient } from "contentful";

/**
 * This function returns data from the ContentfulAPI model
 * @return {Object}
 */
export async function getContentfuData() {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID as string,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN as string,
  });

  const collectionContent = await client.getEntries({ content_type: "ring" });
  const aboutContent = await client.getEntry(
    process.env.CONTENTFUL_ABOUT_ENTRY_ID as string
  );

  return {
    aboutContent: aboutContent.fields,
    collectionContent: collectionContent.items,
  };
}

/**
 * This function returns response of the POST request to the telegram bot
 * @param {string} messageText
 * @return {Object}
 */
export async function postTelegramMessage(messageText: string) {
  // send message to telegram bot
  const response = await fetch(
    `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`,
    {
      method: "post",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: process.env.TELEGRAM_CHAT_ID,
        text: messageText,
      }),
    }
  );

  return response.json(); // parses JSON response into native JavaScript objects
}
