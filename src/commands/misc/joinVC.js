const {Client, Interaction, ChannelType} = require('discord.js');
const {joinVoiceChannel, createAudioPlayer, createAudioResource} = require('@discordjs/voice');
const embed = require('../../utils/createEmbed');


module.exports = {
    /**
    * @param {Client} client
    * @param {Interaction} interaction
    */

    callback: async (client, interaction) => {
        const userChannel = interaction.member.voice.channelId;
        const enterChannel = interaction.options.getChannel('voice-channel').id;
        
        //if(!userChannel) return interaction.reply('You should be in voice channel');

        try {
            const connect = joinVoiceChannel(
                {
                    channelId: enterChannel,
                    guildId: interaction.guildId,
                    adapterCreator: interaction.guild.voiceAdapterCreator
                }
            )

            const player = createAudioPlayer();
            
            const resource = createAudioResource(`../content/audio/Enter.wav`);
            connect.subscribe(player);

            player.play(resource);


            return interaction.reply('Correct');
            
        } catch (error) {
            interaction.reply(`Error: ${error}`);
        }

    },

    name: 'join',
    description: 'Add Jarvis to voice channel',
    options: [
        {
            name: 'voice-channel',
            description: 'Enter chosen voice channel',
            type: 7,
            required: true,
            channelTypes: [ChannelType.GuildVoice]
        }
    ],

}
