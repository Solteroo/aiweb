const { Telegraf } = require('telegraf');

const bot = new Telegraf(process.env.BOT_TOKEN);

/* START + INLINE MENU */
bot.start((ctx) => {
  ctx.reply("👋 Xush kelibsiz!", {
    reply_markup: {
      inline_keyboard: [
        [{ text: "🌐 Web App", web_app: { url: "https://aiweb-brown.vercel.app/" } }],
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

console.log("BOT STARTED");      data = JSON.parse(webAppData);
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
