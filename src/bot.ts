import { Bot } from "grammy";

const token = process.env.BOT_TOKEN;
if (!token) throw new Error("BOT_TOKEN is unset");

const API_TOKEN = "EG71ZjbssmLU05iu5tiSJFYtL7HSvRyaVKUWFiLloXg";
const API_URL = "http://localhost:3000";

export const bot = new Bot(token);

bot.command("start", ctx => ctx.reply("Welcome! Up and running."));

bot.command("health", async ctx => {
  if (ctx.chat.type !== "private") {
    return;
  }

  const response = await fetch(`${API_URL}/api/health`, {
    headers: {
      Authorization: `Bearer ${API_TOKEN}`
    }
  });

  const data = await response.json();

  await ctx.reply(JSON.stringify(data, null, 2));
});

bot.on("message", ctx => ctx.reply("Got another message!"));
