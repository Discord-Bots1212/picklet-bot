require("dotenv").config();
const { REST, Routes } = require("discord.js");

// Check for required environment variables
const requiredEnv = ["CLIENT_ID", "GUILD_ID", "TOKEN"];
const missingEnv = requiredEnv.filter((key) => !process.env[key]);
if (missingEnv.length > 0) {
    console.error(`✖ Missing required environment variables: ${missingEnv.join(", ")}`);
    process.exit(1);
}

const commands = [
    {
        name: "hello",
        description: "Replies with Hello!"
    },
 {
        name: "commands",
        description: "Lists all available commands"
    },

    
    {
        name: "love",
        description: "Calculate love % between two users",
        options: [
            {
                name: "user1",
                description: "First user",
                type: 6,
                required: true
            },
            {
                name: "user2",
                description: "Second user",
                type: 6,
                required: true
            }
        ]
    },
    {
        name: "joke",
        description: "Tells you a funny joke!"
    },
    {
        name: "pack",
        description: "Choose a pack type",
        options: [
            {
                name: "type",
                description: "Select a pack",
                type: 3, // STRING
                required: true,
                choices: [
                    { name: "Legends Pack", value: "legends" }
                ]
            }
        ]
    }
];

console.log(`Registering slash commands for CLIENT_ID: ${process.env.CLIENT_ID}, GUILD_ID: ${process.env.GUILD_ID}...`);

const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

rest.put(
    Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
    { body: commands }
)
.then(() => console.log("✔ Commands registered."))
.catch((error) => console.error("✖ Error registering commands:", error));
