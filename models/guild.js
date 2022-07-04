const mongoose = require('mongoose');

const guildSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    guildID: String,
    guildName: String,
    logChannelID: String,
    mutedRole: String,
    memberRole: String,
    welcomeLogs: String
});

module.exports = mongoose.model('Guild', guildSchema, 'guilds');