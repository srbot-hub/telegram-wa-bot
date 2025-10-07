const TelegramBot = require("node-telegram-bot-api");
const config = require("./config");
const texts = require("./text");

const bot = new TelegramBot(config.TELEGRAM_TOKEN, { polling: true });

console.log("🤖 Bot is running...");

// Owner ID check
const OWNER_ID = config.OWNER_TELEGRAM_ID;

// /start কমান্ড
bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, "👋 হাই! আমি Salim Bot! এখন তুমি যেকোন প্রশ্ন করতে পারো।");
});

// অটো রিপ্লাই
bot.on("message", (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text?.toLowerCase();

  // Owner id show (only owner can use)
  if (text === "/myid" && msg.from.id.toString() === OWNER_ID) {
    bot.sendMessage(chatId, `Your Telegram ID: ${msg.from.id}`);
    return;
  }

  // প্রশ্নের উত্তর
  if (texts.questions[text]) {
    bot.sendMessage(chatId, texts.questions[text]);
  } else if (!text.startsWith("/")) {
    bot.sendMessage(chatId, texts.defaultReply);
  }
});
