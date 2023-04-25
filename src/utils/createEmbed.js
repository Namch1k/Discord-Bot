const {EmbedBuilder} = require('discord.js');

module.exports = (title, description) => {
    const embed = new EmbedBuilder()
        .setTitle(`${title}`)
        .setDescription(`\`\`\`${description}\`\`\``)
        .setColor(0x5865f2);

    return embed;
}