const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PollSchema = new Schema({
    pollID: {
        type: String,
        required: [true, "Poll must have an ID"]
    },
    password: {
        type: String,
    },
    questions: {
        type: Array,
        required: [true, "Poll must contain questions"]
    }
});

const Poll = mongoose.model('poll', PollSchema);

module.exports = Poll;