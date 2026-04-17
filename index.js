const { Telegraf } = require('telegraf');

const bot = new Telegraf(process.env.BOT_TOKEN);

// START
bot.start((ctx) => {
  ctx.reply(
`🚀 Xush kelibsiz!

Bu bot orqali siz:
• Landing page sayt
• Vizitka sayt
• Web App orqali buyurtma berishingiz mumkin

👇 Web Appni oching:`,
  {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "🌐 Web App ochish",
            web_app: {
              url: "https://aiweb-brown.vercel.app/"
            }
          }
        ]
      ]
    }
  });
});

// WEB APP DAN KELGAN ZAKAZ
bot.on('message', async (ctx) => {
  if (ctx.message.web_app_data) {
    const data = JSON.parse(ctx.message.web_app_data.data);

    const text =
`📩 YANGI ZAKAZ

👤 Ism: ${data.name}
📞 Telefon: ${data.phone}
🏢 Biznes: ${data.business}
📝 Izoh: ${data.comment || '-'}`;

    // ADMINGA YUBORISH
    await ctx.telegram.sendMessage('8779954504', text);

    ctx.reply("✅ Zakazingiz qabul qilindi!");
  }
});

bot.launch();
console.log("Bot ishlayapti...");