const {Client, Interaction, ApplicationCommandOptionType} = require('discord.js');
const {joinVoiceChannel, createAudioPlayer, createAudioResource} = require('@discordjs/voice');
const play = require('play-dl');
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
                    guildId: interaction.guildId,
                    adapterCreator: interaction.guild.voiceAdapterCreator
                }
            )

            const player = createAudioPlayer();
            const source = interaction.options.getString('url-link');
            const audio = await play.stream(source);

            const videoInfo = await play.video_info(source);

            const resource = createAudioResource(audio.stream, {inputType: audio.type});

            connect.subscribe(player);
            player.play(resource);          

            return interaction.reply(
                {
                 embeds: [embed('Now play', `${videoInfo.video_details.channel} - ${videoInfo.video_details.title}\n\nTime\n[0:00/${videoInfo.video_details.durationRaw}]`)
                    .setURL(source)
                    .setThumbnail(videoInfo.video_details.thumbnails[3].url)
                    .setColor('Red')
                    .setFooter({text: `Requested by: @${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true })})],
                 ephemeral: false
                }
            );

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
            required: true,
        }
    ]
}