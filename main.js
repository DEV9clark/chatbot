import "./css/style.css";
import { alternative, botReplies, userTexts } from "./response.js";

//const app = document.querySelector("#app");
let finalResult;
let reply;
const msgDiv = document.querySelector("#messages");
const input = document.querySelector("#input");

console.log(botReplies);

input.addEventListener("keydown", (e) => {
  if (e.code === "Enter") {
    let data = input.value;
    input.value = "";
    output(data);
    console.log(data);
  }
});

function output(input) {
  //remove all characters except word characters, space, and digits
  let text = input
    .toLowerCase()
    .replace(/[^\w\s]/gi, "")
    .replace(/[\d]/gi, "")
    .trim();
  text = text
    .replace(/ a /g, " ") // replaces 'tell me a story' to 'tell me story'
    .replace(/slt/g, "salut") // replaces "whats" to "what is"
    .replace(/stp/g, "s'il te plait")
    .replace(/ please/g, "")
    .replace(/cmt/g, "comment")
    .replace(/tu vas/g, "vas-tu");

  if (compare(userTexts, botReplies, text)) {
    finalResult = compare(userTexts, botReplies, text);
  } else {
    finalResult = alternative[Math.floor(Math.random() * alternative.length)];
  }
  addToChat(text, finalResult);
}

function compare(userTexts, botReplies, text) {
  for (let x = 0; x < userTexts.length; x++) {
    for (let y = 0; y < botReplies.length; y++) {
      if (userTexts[x][y] == text) {
        let replies = botReplies[x];
        console.log(botReplies[x][y]);
        reply = replies[Math.floor(Math.random() * replies.length)];
      }
    }
  }
  return reply;
}

function addToChat(input, finalResult) {
  let userDiv = document.createElement("div");
  userDiv.id = "user";
  userDiv.className = "response";
  userDiv.innerHTML = `<span>${input}</span><img src="https://res.cloudinary.com/ugwutotheeshoes/image/upload/v1625055846/Movie%20booth/download_cwsons.png" alt="Robot cartoon" height="20px" width="20px">`;
  msgDiv.appendChild(userDiv);

  let botDiv = document.createElement("div");
  let botImg = document.createElement("img");
  let botText = document.createElement("span");
  botDiv.id = "bot";
  botImg.src =
    "https://res.cloudinary.com/ugwutotheeshoes/image/upload/v1625055846/Movie%20booth/unnamed_yyh2zq.jpg";
  botImg.className = "avatar";
  botDiv.className = "bot response";
  botText.innerText = "Typing...";
  botDiv.appendChild(botImg);
  botDiv.appendChild(botText);
  msgDiv.appendChild(botDiv);
  // Keep messages at most recent
  msgDiv.scrollTop = msgDiv.scrollHeight - msgDiv.clientHeight;

  // Fake delay to seem "real"
  setTimeout(() => {
    botText.innerText = `${finalResult}`;
  }, 2000);
}
