const { Client, LocalAuth, MessageMedia } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const client = new Client({
    authStrategy: new LocalAuth()
});

client.on('qr', qr => {
    console.log('Scan this QR Code with WhatsApp:');
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('✅ WhatsApp Bot is ready!');
});

// Handle incoming messages
client.on('message', async msg => {
    console.log(`📩 Message from ${msg.from}: ${msg.body}`);

    const text = msg.body.toLowerCase();

    // ✅ Send an Image
    if (text === 'image') {
        const media = MessageMedia.fromFilePath('./sri.jpeg');  // Change the filename as needed
        client.sendMessage(msg.from, media, { caption: 'Here is your image! 🖼️' });

    // ✅ Send a PDF File
    } else if (text === 'javapdf') {
        const media = MessageMedia.fromFilePath('./java.pdf');  // Change filename to your PDF
        client.sendMessage(msg.from, media, { caption: 'Here is your PDF 📄' });

    // ✅ Send a Reaction (Emoji)
    } else if (text === 'hello') {
        msg.react('👋');  // React with a wave emoji

    // ✅ Handle Multiple Queries (Replies)
    } else if (text.includes('joke')) {
        msg.reply('Why did the computer catch a cold? Because it left its Windows open! 🤣');
    } else if (text.includes('time')) {
        msg.reply(`🕒 Current time is: ${new Date().toLocaleTimeString()}`);
    } else if (text.includes('date')) {
        msg.reply(`📅 Today's date is: ${new Date().toLocaleDateString()}`);
    } else if (text === 'help') {
        msg.reply('Commands:\n- `!image` → Get an image\n- `!pdf` → Get a PDF\n- `hello` → React with 👋\n- `joke` → Get a random joke\n- `time` → Get current time\n- `date` → Get today’s date');
    }
});

client.initialize();
