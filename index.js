const { Telegraf } = require('telegraf');

// BOT TOKEN ENV CHECK
if (!process.env.BOT_TOKEN) {
  console.error("❌ BOT_TOKEN YO'Q!");
  process.exit(1);
}

const bot = new Telegraf(process.env.BOT_TOKEN);

// START COMMAND
bot.start((ctx) => {
  ctx.reply(
`🚀 Xush kelibsiz!

Bu bot orqali siz:
• Web sayt buyurtma qilishingiz mumkin
• Web App orqali form yuborishingiz mumkin

👇 Web Appni oching`
  );
});

// WEB APP + NORMAL MESSAGE HANDLER
bot.on('message', async (ctx) => {
  try {
    const webAppData = ctx.message?.web_app_data?.data;

    // Agar WebApp bo'lmasa oddiy javob
    if (!webAppData) {
      return ctx.reply("🤖 Bot ishlayapti");
    }

    let data;

    try {
      data = JSON.parse(webAppData);
    } catch (e) {
      return ctx.reply("❌ WebApp data noto‘g‘ri format");
    }

    const text =
`📩 YANGI ZAKAZ

👤 Ism: ${data.name || '-'}
📞 Telefon: ${data.phone || '-'}
🏢 Biznes: ${data.business || '-'}
📝 Izoh: ${data.comment || '-'}`;

    // ADMINGA YUBORISH (ID o‘rniga o‘zingnikini qo‘y)
    await ctx.telegram.sendMessage('8779954504', text);

    await ctx.reply("✅ Zakazingiz qabul qilindi!");

  } catch (err) {
    console.error("ERROR:", err);
    ctx.reply("❌ Server xatolik");
  }
});

// BOT START
bot.launch();

console.log("BOT STARTED");
