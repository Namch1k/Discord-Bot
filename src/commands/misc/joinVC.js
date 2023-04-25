const embed = require('../../utils/createEmbed');
const yrdl = require('ytdl-core');
const {Client, Interaction, ChannelType} = require('discord.js');
const {joinVoiceChannel, createAudioPlayer, createAudioResource} = require('@discordjs/voice');


module.exports = {
    /**
    * @param {Client} client
    * @param {Interaction} interaction
    */

    callback: async (client, interaction) => {
        const channel = interaction.member.voice.channelId;

        if(!channel) return interaction.reply('You should be in voice channel');

        try {
            const connect = joinVoiceChannel(
                {
                    channelId: channel,
                    guildId: interaction.guildId,
                    adapterCreator: interaction.guild.voiceAdapterCreator
                }
            )
            const player = createAudioPlayer();

            const resource = yrdl('https://www.youtube.com/watch?v=IvumMzOTUPY&ab_channel=Dr.FeelGood%7BMalusThantos%7D');

            connect.subscribe(player);

            player.play(resource);

            return
            
        } catch (error) {
            interaction.reply(`Error: ${error}`);
        }

    },

    name: 'join',
    description: 'Add Jarvis to voice channel',
    options: [
        {
            name: 'voicechannel',
            description: 'Enter chosen voice channel',
            type: 7,
            required: true,
            channelTypes: [ChannelType.GuildVoice]
        }
    ],

}
