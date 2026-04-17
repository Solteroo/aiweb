const { Telegraf } = require('telegraf');

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start((ctx) => {
  ctx.reply(
`🚀 Xush kelibsiz!

👇 Web Appni oching:`,
  {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "🌐 Web App ochish",
            web_app: {
              url: "https://aiweb-one-phi.vercel.app/"
            }
          }
        ]
      ]
    }
  });
});

bot.on('message', async (ctx) => {
  console.log(ctx.message);

  if (ctx.message.web_app_data) {
    const data = JSON.parse(ctx.message.web_app_data.data);

    const text =
`📩 YANGI ZAKAZ

👤 Ism: ${data.name}
📞 Telefon: ${data.phone}
🏢 Biznes: ${data.business}
📝 Izoh: ${data.comment || '-'}`;

    await ctx.telegram.sendMessage(8779954504, text);

    ctx.reply("✅ Zakazingiz qabul qilindi!");
  }
});

bot.launch();
