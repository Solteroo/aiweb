const { Telegraf } = require('telegraf');

const bot = new Telegraf(process.env.BOT_TOKEN);

/* START + INLINE MENU */
bot.start((ctx) => {
  ctx.reply("👋 Xush kelibsiz!", {
    reply_markup: {
      inline_keyboard: [
        [{ text: "🌐 Web App", web_app: { url: "https://aiweb-jet-five.vercel.app/" } }],
        [{ text: "💼 Services", callback_data: "services" }],
        [{ text: "📩 Order", callback_data: "order" }]
      ]
    }
  });
});

/* BUTTONS */
bot.on('callback_query', async (ctx) => {
  const data = ctx.callbackQuery.data;

  if (data === 'services') {
    await ctx.answerCbQuery();
    return ctx.reply("💻 Landing page, Web App, Vizitka sayt");
  }

  if (data === 'order') {
    await ctx.answerCbQuery();
    return ctx.reply("📩 Web App orqali buyurtma bering");
  }
});

/* WEB APP DATA */
bot.on('message', async (ctx) => {
  const webAppData = ctx.message?.web_app_data?.data;

  if (!webAppData) return;

  const data = JSON.parse(webAppData);

  const text =
`📩 YANGI ZAKAZ

👤 Ism: ${data.name}
📞 Telefon: ${data.phone}
🏢 Biznes: ${data.business}
📝 Izoh: ${data.comment || '-'}`;

  await ctx.telegram.sendMessage('8779954504', text);

  await ctx.reply("✅ Zakaz qabul qilindi!");
});

/* START BOT */
bot.launch();

console.log("BOT STARTED");
