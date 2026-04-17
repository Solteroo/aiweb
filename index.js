const { Telegraf } = require('telegraf');

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start((ctx) => {
  ctx.reply(`🚀 Xush kelibsiz!

👇 Web Appni oching:`, {
    reply_markup: {
      inline_keyboard: [[{
        text: "🌐 Web App ochish",
        web_app: { url: "https://aiweb-one-phi.vercel.app/" }
      }]]
    }
  });
});

bot.on('message', async (ctx) => {
  try {
    if (ctx.message.web_app_data) {
      const raw = ctx.message.web_app_data.data;
      if (!raw) return;

      const data = JSON.parse(raw);

      const text = `📩 YANGI ZAKAZ

👤 ${data.name || '-'}
📞 ${data.phone || '-'}
🏢 ${data.business || '-'}
📝 ${data.comment || '-'}`;

      await ctx.telegram.sendMessage(8779954504, text);
      await ctx.reply("✅ Zakaz qabul qilindi!");
    }
  } catch (e) {
    console.log("ERROR:", e);
  }
});

bot.launch()
  .then(()=>console.log("RUNNING"))
  .catch(err=>console.log(err));🏢 Biznes: ${data.business}
📝 Izoh: ${data.comment || '-'}`;

    await ctx.telegram.sendMessage(8779954504, text);

    ctx.reply("✅ Zakazingiz qabul qilindi!");
  }
});

bot.launch();
