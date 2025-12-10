const { Client, GatewayIntentBits, Events } = require("discord.js");
require("dotenv").config();

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers
    ]
});

client.once(Events.ClientReady, () => {
    console.log(`✔ Logged in as ${client.user.tag}`);
});

// Welcome message when someone joins
client.on(Events.GuildMemberAdd, member => {
    const channel = member.guild.channels.cache.get("1417666556892151940");

    if (!channel) {
        console.log("❌ Welcome channel not found!");
        return;
    }

    channel.send(`# 🎉 Welcome! # \rWelcome to Picklet, ${member}! Make sure to get notifications in the Rank Roles channel! Currently the site isn't released yet, but stick around and we'll be done soon!`).catch(err => {
        console.error(`❌ Failed to send welcome message to ${channel.name} (${channel.id}):`, err.message);
    });
});

client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isChatInputCommand()) return;

    // /hello
    if (interaction.commandName === "hello") {
        return interaction.reply("Hello!");
    }

     if (interaction.commandName === "commands") {
        return interaction.reply("hello - Replies with Hello\n joke - Tells a random joke\n love - Finds the love percentage between two users\n pack - Shows information about different packs");
    }

    // /joke
    if (interaction.commandName === "joke") {
        const jokes = [
            "Why don't skeletons fight each other? They don't have the guts!",
            "I tried to take a picture of some fog… I mist!",
            "Why did the bicycle fall over? Because it was two tired!",
            "What do you call fake spaghetti? An impasta!",
            "Why can't a nose be 12 inches long? Because then it would be a foot!"
        ];

        const joke = jokes[Math.floor(Math.random() * jokes.length)];
        return interaction.reply(joke);
    }

    // /love
    if (interaction.commandName === "love") {
        const user1 = interaction.options.getUser("user1");
        const user2 = interaction.options.getUser("user2");

        const lovePercent = Math.floor(Math.random() * 101);

        return interaction.reply(
            `❤️ **Love Match!** ❤️\n\n${user1} + ${user2} = **${lovePercent}%** love!`
        );
    }

    // /pack
    if (interaction.commandName === "pack") {
        const selection = interaction.options.getString("type");

        // You fill in what each pack type replies with
        if (selection === "legends") {
            return interaction.reply("# Legends Pack #\n**Icon:** SRN  **Rarity:** 20% Common\n **Icon:** GhostRider **Rarity:** 20% Common\n **Icon:** BlooketWarriorYT **Rarity:** 20% Common");
        }
        if (selection === "color") {
            return interaction.reply("# Color Pack #\n**Icon: Red Color**  **Rarity:** % Undefined");
        }
        if (selection === "emoji") {
            return interaction.reply("# Emoji Pack #\n**Icon:** I forgot the emoji icons! Rarity: % Undefined");
        }

        return interaction.reply("Pack selected, but no text was set!");
    }
});

client.login(process.env.TOKEN);
