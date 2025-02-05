// var TelegramBot = require("node-telegram-bot-api");
// var token = "8114476761:AAGUAWhjm0nT7OixWknX3w3LtgU0THVglfA";
// var bot = new TelegramBot(token, { polling: true });
// bot.onText(/\/echo (.+)/, function (msg, match) {
//   var chatId = msg.chat.id;
//   var echo = match[1];
//   bot.sendMessage(chatId, echo);
// });
//www.omdbapi.com/?apikey=793eedc8

//https://www.omdbapi.com/?t=deadpool&apikey=793eedc8

//-->https://www.omdbapi.com/?apikey=793eedc8

// http: var request = require("request");
// bot.onText(/\/ (.+)/, function (msg, match) {
//   var movie = match[1];
//   var chatId = msg.chat.id;
//   request(
//     `https://www.omdbapi.com/?apikey=10e685cb&t=${movie}`,
//     function (error, response, body) {
//       if (!error && response.statusCode == 200) {
//         bot
//           .sendMessage(chatId, "_looking for _" + movie + "...", {
//             parse_mode: "markdown",
//           })
//           .then(function (mag) {
//             var res = JSON.parse(body);
//             bot.sendMessage(
//               chatId,
//               "Result:\nTitle:" +
//                 res.Title +
//                 "\nYear:" +
//                 res.Year +
//                 "\nRated:" +
//                 res.Rated +
//                 "\nReleased:" +
//                 res.Released
//             );
//             bot.sendPhoto(chatId, res.Poster, { caption: "" });
//           });
//       }
//     }
//   );
// });

//---chatgpt

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

// Movie information command
// bot.onText(/\/movie (.+)/, function (msg, match) {
//   var movie = match[1];
//   var chatId = msg.chat.id;

//   // API request to OMDB
//   request(
//     `https://www.omdbapi.com/?apikey=793eedc8&t=${movie}`,
//     function (error, response, body) {
//       if (!error && response.statusCode === 200) {
//         var res = JSON.parse(body);

//         // Check if a valid movie was found
//         if (res.Response === "True") {
//           bot
//             .sendMessage(chatId, `_Looking for "${movie}"..._`, {
//               parse_mode: "Markdown",
//             })
//             .then(() => {
//               bot.sendMessage(
//                 chatId,
//                 `🎥 *Title*: ${res.Title}\n📅 *Year*: ${res.Year}\n⭐ *Rated*: ${res.Rated}\n📆 *Released*: ${res.Released}`,
//                 { parse_mode: "Markdown" }
//               );
//               if (res.Poster && res.Poster !== "N/A") {
//                 bot.sendPhoto(chatId, res.Poster, {
//                   caption: "🎬 Movie Poster",
//                 });
//               } else {
//                 bot.sendMessage(chatId, "📷 No poster available.");
//               }
//             });
//         } else {
//           bot.sendMessage(chatId, `🚫 Movie not found: "${movie}".`);
//         }
//       } else {
//         bot.sendMessage(
//           chatId,
//           "❌ Error occurred while fetching movie details."
//         );
//       }
//     }
//   );
// });

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
