const {Client, Interaction, ApplicationCommandOptionType} = require('discord.js');
const yrdl = require('ytdl-core');
const {joinVoiceChannel, createAudioPlayer, createAudioResource} = require('@discordjs/voice');
const embed = require('../../utils/createEmbed');


module.exports = {
    /**
     * @param {Client} client
     * @param {Interaction} interaction
     */

    callback: async(client, interaction) => {
        const channel = interaction.member.voice.channelId;

        if(!channel) return interaction.reply('You should be in voice chat');

        try {
            const connect = joinVoiceChannel(
                {
                    channelId: channel,
                    guildId: interaction.guild,
                    adapterCreator: interaction.guild.voiceAdapterCreator
                }
            )

            const player = createAudioPlayer();

            const resource = createAudioResource(interaction.options.getString('url-link'));

            connect.subscribe(player);

            player.play(resource);

        } catch (error) {
            interaction.reply(`Error: ${error}`);
        }
    },

    name: 'play',
    description: 'Play your music',
    options: [
        {
            name: 'url-link',
            description: 'Add URL link',
            type:ApplicationCommandOptionType.String,
            //required: true,
        }
    ]
}