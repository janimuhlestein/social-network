const {Schema, model, Types} = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const UserSchema = new Schema({
    username: {
        type: String,
        trim: true,
        required: 'User name required',
        unique: true
    },
    email: {
        type: String,
        required: 'Email is required',
        unique: true,
        match: [/.+@.+\..+/, 'Please enter a valid email address.']
    },
    thoughts: [
        {
            type: Schema.Types.ObjectId,
        ref: 'Thought'
        }
    ],
    friends: [
    {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
    ]
},
{
    toJSON: {
        virtuals: true,
        getters: true
    },
    id: false
});

UserSchema.virtual('friendCount').get(function(){
    return this.friends.length;
});;

const User = model('User', UserSchema);
module.exports = User;

