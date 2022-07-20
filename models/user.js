const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    guildID: String,
    userID: String,
    muteCount: Number,
    warnCount: Number,
    kickCount: Number,
    banCount: Number,
    tempBanCount: Number,
    tempMuteCount: Number,
    quarantinecount: Number,
});

module.exports = mongoose.model('user', userSchema, 'users');