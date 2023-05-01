const {Configuration, OpenAIApi} = require ('openai');
const {Client, Interaction, ApplicationCommandOptionType, PermissionFlagsBits,} = require('discord.js');
const embed = require('../../utils/createEmbed');

const config = new Configuration(
    {
        apiKey: process.env.OPENAI_API_KEY
    }
);

const openai = new OpenAIApi(config);

 module.exports = {
    /**
     * @param {Client} client 
     * @param {Interaction} interaction
     */

    callback: async (client, interaction) => { // проверяет , в нужном ли канале отправили сообщение

        if(interaction.channel.id !== process.env.CHANNEL_ID) {
            return interaction.reply(
                {
                embeds: [embed('😢 I`m sorry', 'You enter wront chat')],
                ephemeral: true
                }
            );
        }
            
            await interaction.deferReply({ephemeral: true});

            const question = interaction.options.getString('prompt');

            try {
                const result = await openai.createCompletion(
                    {
                        model: 'text-davinci-003',
                        max_tokens: 2048,
                        temperature: 0.5,
                        prompt: question
                    }
                );

                await interaction.editReply(
                    {
                        embeds: [embed(`❔ ${question}`, `${result.data.choices[0].text}`)], 
                        ephemeral: true
                    }
                );

            } catch (error) {
                return await interaction.editReply(`❗Ooops... Something came wrong. ${error}`);
            }
    },

    name: 'ask-jarvis',
    description: 'Jarvis can help you to create content or designing solutions',
    options: [
        {
            name: 'prompt',
            description: 'Enter prompt',
            type: ApplicationCommandOptionType.String,
            required: true
           }
    ],

    botPermissions: [PermissionFlagsBits.Administrator]
}