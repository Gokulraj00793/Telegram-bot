
var TelegramBot = require("node-telegram-bot-api");
var request = require("request");

// Replace with your token
var token = "8114476761:AAGUAWhjm0nT7OixWknX3w3LtgU0THVglfA";
var bot = new TelegramBot(token, { polling: true });

// Echo command
bot.onText(/\/echo (.+)/, function (msg, match) {
  var chatId = msg.chat.id;
  var echo = match[1];
  bot.sendMessage(chatId, echo);
});



const axios = require("axios");

bot.onText(/\/movie (.+)/, function (msg, match) {
  var movie = match[1];
  var chatId = msg.chat.id;

  axios
    .get(`https://www.omdbapi.com/?apikey=793eedc8&t=${movie}`)
    .then((response) => {
      var res = response.data;

      if (res.Response === "True") {
        bot
          .sendMessage(chatId, `_Looking for "${movie}"..._`, {
            parse_mode: "Markdown",
          })
          .then(() => {
            bot.sendMessage(
              chatId,
              `🎥 *Title*: ${res.Title}\n📅 *Year*: ${res.Year}\n⭐ *Rated*: ${res.Rated}\n📆 *Released*: ${res.Released}`,
              { parse_mode: "Markdown" }
            );
            if (res.Poster && res.Poster !== "N/A") {
              bot.sendPhoto(chatId, res.Poster, {
                caption: "🎬 Movie Poster",
              });
            } else {
              bot.sendMessage(chatId, "📷 No poster available.");
            }
          });
      } else {
        bot.sendMessage(chatId, `🚫 Movie not found: "${movie}".`);
      }
    })
    .catch((error) => {
      bot.sendMessage(
        chatId,
        "❌ Error occurred while fetching movie details."
      );
    });
});
