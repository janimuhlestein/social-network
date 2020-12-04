const {Schema, model, Types} = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const ReactionSchema = new Schema({
    reactionBody: {
        type: String,
        required: 'Reaction body required',
        minLength: 1,
        maxLength: 280,
        trim: true
    },
    username: {
        type: String,
        required: 'Username is required',
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAtVal)=>dateFormat(createdAtVal)
    }
});

const ThoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: 'Thought text required',
        minLength: 1,
        maxLength: 280,
        trim: true
    },
    username: {
        type: String,
        required: 'Contributor name required',
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => dateFormat(createdAtVal)
    },
    reactions: [ReactionSchema]
},
{
    toJSON: {
        virtuals: true,
        getters: true
    },
    id: false
});

ThoughtSchema.virtual('reactionCount').get(function(){
    return this.reactions.length;
});

const Thought = model('Thought', ThoughtSchema);
module.exports = Thought;