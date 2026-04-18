bot.on('message', async (ctx) => {
  try {
    const msg = ctx.message;

    const webAppData = msg?.web_app_data?.data;

    if (!webAppData) return;

    let data;

    try {
      data = JSON.parse(webAppData);
    } catch (e) {
      return ctx.reply("❌ WebApp data noto‘g‘ri formatda");
    }

    const text =
`📩 YANGI ZAKAZ

👤 Ism: ${data.name || '-'}
📞 Telefon: ${data.phone || '-'}
🏢 Biznes: ${data.business || '-'}
📝 Izoh: ${data.comment || '-'}`;

    await ctx.telegram.sendMessage('8779954504', text);

    await ctx.reply("✅ Zakazingiz qabul qilindi!");

  } catch (e) {
    console.error(e);
    ctx.reply("❌ Server xatolik yuz berdi");
  }
});