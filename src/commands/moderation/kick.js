const {Client, Interaction, ApplicationCommandOptionType, PermissionFlagsBits} = require('discord.js');
const embed = require('../../utils/createEmbed');

module.exports = {
    /**
     * @param {Client} client
     * @param {Interaction} interaction
     */

    callback: async (client, interaction) => {
        const targetID = interaction.options.get('target-user').value;
        const reason = interaction.options.get('reason')?.value || 'No reason';

        await interaction.deferReply({ephemeral: true});

        const targetUser = await interaction.guild.members.fetch(targetID);

        const targetUserRole = targetUser.roles.highest.position;
        const requestUserRole = interaction.member.roles.highest.position;
        const botRole = interaction.guild.members.me.roles.highest.position;
    
        if(!targetUser) {
            interaction.editReply({embeds: [embed('Kick error', '🤔 This user doesn`t exist on this server')]});
            return;
        }

        if(targetUser.id === interaction.guild.ownerId) {
            await interaction.editReply({embeds: [embed('Kick error', '😕 I can not kick owner user')]});
            return;
        }

        if (targetUserRole >= requestUserRole || targetUserRole >= botRole ) {
            await interaction.editReply({embeds: [embed('Kick error', '😕 I can not kick user')]});
            return;
        }

        const targetUserName = targetUser.nickname || targetUser.user.username; 

        try {
            await targetUser.kick({reason});
            await interaction.editReply ({embeds: [embed(`I kicked ${targetUserName}`, `Reason: "${reason}"`)]});
        } catch (error){
            console.log(`Kicking error: ${error}`);
        };

    },

    name: 'kick',
    description: 'Kick member from server',
    options: [
        {
            name: 'target-user',
            description: 'yhe user to kick',
            required: true,
            type: ApplicationCommandOptionType.Mentionable
        },

        {
            name: 'reason',
            description: 'The reason of kicking',
            type: ApplicationCommandOptionType.String
        }
    ], 

    permissionsRequired: [PermissionFlagsBits.KickMembers],
    botPermissions: [PermissionFlagsBits.KickMembers]
}