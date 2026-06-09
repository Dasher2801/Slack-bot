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
    await respond({ text: "Bitte eine Aufgabe eingeben, z.B. `/calc 5*5` oder `/calc 10-2`" });
    return;
  }

  let s1, s2;
  let zeichen = "";

  if (text.includes("+")) {
    [s1, s2] = text.split("+");
    zeichen = "+";
  } else if (text.includes("-")) {
    [s1, s2] = text.split("-");
    zeichen = "-";
  } else if (text.includes("*")) {
    [s1, s2] = text.split("*");
    zeichen = "*";
  } else if (text.includes("/")) {
    [s1, s2] = text.split("/");
    zeichen = "/";
  } else {
    [s1, s2] = text.split(" ");
    zeichen = "+";
  }

  const zahl1 = parseInt(s1);
  const zahl2 = parseInt(s2);

  if (isNaN(zahl1) || isNaN(zahl2)) {
    await respond({ text: "Das sind keine gültigen Zahlen! Beispiel: `/calc 12/3`" });
    return;
  }

  let ergebnis;
  if (zeichen === "+") {
    ergebnis = zahl1 + zahl2;
  } else if (zeichen === "-") {
    ergebnis = zahl1 - zahl2;
  } else if (zeichen === "*") {
    ergebnis = zahl1 * zahl2;
  } else if (zeichen === "/") {
    if (zahl2 === 0) {
      await respond({ text: "Fehler: Teilen durch 0 ist nicht erlaubt!" });
      return;
    }
    ergebnis = zahl1 / zahl2;
  }

  await respond({ text: `Ergebnis: ${ergebnis}` });
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