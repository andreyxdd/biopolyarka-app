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

  const aboutContent = await client.getEntry(
    process.env.CONTENTFUL_ABOUT_ENTRY_ID as string
  );
  const collectionContent = await client.getEntry(
    process.env.CONTENTFUL_COLLECTION_ENTRY_ID as string
  );
  const ringContent = await client.getEntries({
    content_type: "ring",
  });
  const checkoutContent = await client.getEntry(
    process.env.CONTENTFUL_CHECKOUT_ENTRY_ID as string
  );

  return {
    aboutContent: aboutContent.fields,
    collectionContent: collectionContent.fields,
    ringContent: ringContent.items,
    checkoutContent: checkoutContent.fields,
  };
}

/**
 * This function returns response of the POST request to the telegram bot
 * @param {string} messageText
 * @return {Object}
 */
export async function postTelegramMessage(messageText: string) {
  // getting chat id
  const chatIdFromUpdates = await fetch(
    `https://api.telegram.org/bot${process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN}/getUpdates`,
    {
      method: "get",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
    .then((res) => {
      return res.json();
    })
    .then((updates) => {
      // obtaining the last update fo the given chat title
      for (const update of updates.result.slice(0).reverse()) {
        if (
          update.message &&
          update.message.chat.title ===
            process.env.NEXT_PUBLIC_TELEGRAM_CHAT_TITLE
        ) {
          return update.message.chat.id;
        } else if (
          update.my_chat_member &&
          update.my_chat_member.chat.title ===
            process.env.NEXT_PUBLIC_TELEGRAM_CHAT_TITLE
        ) {
          return update.my_chat_member.chat.id;
        }
      }
    })
    .then((chatId) => {
      if (chatId && typeof chatId === "number") {
        return chatId;
      } else {
        throw new Error("Telgram chatId is undefined!");
      }
    })
    .catch((error) => {
      console.log(process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN);
      console.error("Error:", error);
    });

  // console.log(chatIdFromUpdates);

  // send message to telegram bot
  const response = await fetch(
    `https://api.telegram.org/bot${process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN}/sendMessage`,
    {
      method: "post",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: chatIdFromUpdates,
        text: messageText,
        parse_mode: "markdown",
      }),
    }
  );

  return response.json(); // parses JSON response into native JavaScript objects
}
