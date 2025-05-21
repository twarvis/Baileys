const { default: makeWASocket, useSingleFileAuthState } = require("@whiskeysockets/baileys");
const { state, saveState } = useSingleFileAuthState('./auth.json');

async function startBot() {
    const sock = makeWASocket({
        auth: state,
        printQRInTerminal: true
    });

    sock.ev.on("creds.update", saveState);

    sock.ev.on("messages.upsert", async ({ messages }) => {
        const msg = messages[0];
        if (!msg.message) return;

        const text = msg.message.conversation || msg.message.extendedTextMessage?.text;
        const sender = msg.key.remoteJid;

        if (text === 'hi') {
            await sock.sendMessage(sender, { text: "Hello, I'm *Ereathra* 🤖, your friendly bot!" });
        } else if (text === 'help') {
            await sock.sendMessage(sender, {
                text: `🤖 *Ereathra Bot Menu* 🤖\n\n1. hi – Greet the bot\n2. help – Show menu\n3. about – Info`
            });
        } else if (text === 'about') {
            await sock.sendMessage(sender, { text: "I'm Ereathra, a custom WhatsApp bot built just for you." });
        }
    });
}

startBot();
