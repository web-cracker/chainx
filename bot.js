
// const TelegramBot = require('node-telegram-bot-api');

// // Replace the value below with the Telegram token you receive from @BotFather
// const token = '8324209895:AAGykXFBbzEPwJ7A-RZwpH8KwMK84wccMfk';

// // Create a bot that uses 'polling' to fetch new updates
// const bot = new TelegramBot(token, {polling: true});

// // Listen for any kind of message. There are different kinds of
// // messages.
// bot.on('message', (msg) => {
//   const chatId = msg.chat.id;

//   // send a message to the chat acknowledging receipt of their message
//   bot.sendMessage(chatId, 'Received your message');
// });

// bot.onText(/\/start/, (msg) => {
//     const chatId = msg.chat.id;
//     const url = 'https://chainx-sandy.vercel.app/'; // Replace with your app's URL
//     bot.sendMessage(chatId, "Click the button to open the app", {
//         reply_markup: {
//             inline_keyboard: [[{ text: "Open App", web_app: { url: url } }]]
//         }
//     });
// });
