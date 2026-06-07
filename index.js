require("dotenv").config();

const { App } = require("@slack/bolt");

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  appToken: process.env.SLACK_APP_TOKEN,
  socketMode: true
});

// /calc handler: akzeptiert "3+4", "3 + 4" oder "3 4"
app.command("/calc", async ({ command, ack, respond }) => {
  await ack();
  const text = (command.text || "").trim();
  if (!text) {
    await respond({ text: "Bitte gib zwei Zahlen ein, z.B. `/calc 3 4`" });
    return;
  }

  let s1, s2;
  if (text.includes("+")) {
    [s1, s2] = text.split(/\s*\+\s*/);
  } else {
    [s1, s2] = text.split(/\s+/);
  }

  if (!s1 || !s2) {
    await respond({ text: "Bitte gib zwei Zahlen ein, z.B. `/calc 3 4`" });
    return;
  }

  const zahl1 = parseFloat(s1.trim());
  const zahl2 = parseFloat(s2.trim());
  if (isNaN(zahl1) || isNaN(zahl2)) {
    await respond({ text: "Bitte gib gültige Zahlen ein, z.B. `/calc 3 4`" });
    return;
  }

  await respond({ text: `Das Ergebnis ist ${zahl1 + zahl2}!` });
});

// vorhandener /dsb-ping handler erhalten
app.command("/dsb-ping", async ({ command, ack, respond }) => {
  const text = (command.text || "").trim();
  if (!text) {
    await ack();
    await respond({ text: "Bitte gib zwei Zahlen ein, z.B. `/dsb-ping 3 4`" });
    return;
  }

  let s1, s2;
  if (text.includes("+")) {
    [s1, s2] = text.split(/\s*\+\s*/);
  } else {
    [s1, s2] = text.split(/\s+/);
  }

  const zahl1 = parseFloat(s1) || 0;
  const zahl2 = parseFloat(s2) || 0;
  const summe = zahl1 + zahl2;

  console.log(s1, s2);
  await ack();
  await respond({ text: `hallo ${summe}!` });
});

(async () => {
  await app.start();
  console.log("bot is running!");
})();
