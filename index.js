require("dotenv").config();
const { App } = require("@slack/bolt");

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  appToken: process.env.SLACK_APP_TOKEN,
  socketMode: true
});

app.command("/calc", async ({ command, ack, respond }) => {
  await ack();
  const text = command.text.trim();

  if (!text) {
    await respond({ text: "Bitte Zahlen eingeben, z.B. `/calc 5+5`" });
    return;
  }

  let s1, s2;
  if (text.includes("+")) {
    [s1, s2] = text.split("+");
  } else {
    [s1, s2] = text.split(" ");
  }

  const zahl1 = parseInt(s1);
  const zahl2 = parseInt(s2);

  if (isNaN(zahl1) || isNaN(zahl2)) {
    await respond({ text: "Das sind keine gültigen Zahlen!" });
  } else {
    await respond({ text: `Ergebnis: ${zahl1 + zahl2}` });
  }
}); 

app.command("/hello", async ({ command, ack, respond }) => {
  await ack();
  await respond({ text: "Hello World!" });
}); 

app.command("/dsb-ping", async ({ command, ack, respond }) => {
  const start = Date.now();
  await ack();
  const latency = Date.now() - start;
  await respond({ text: `Pong!\nLatency: ${latency}ms` });
});

(async () => {
  await app.start();
  console.log(" Bot läuft und hört auf /calc und /hello und /dsb-ping Befehle");
})();