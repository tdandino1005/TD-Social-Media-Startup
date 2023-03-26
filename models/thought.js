// Create a Thought model using the thoughtSchema.
const { Schema}, model, Types = require('mongoose');
const dateFormat = require('../utils/dateFormat');

// Create a reaction schema
const ReactionSchema = new Schema(
    {
        reactionID: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280
        },
        username: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (timestamp) => dateFormat(timestamp)
        }
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false,
    }
);

// Create a thought schema
const ThoughtSchema = new Schema(
    {
        // used to connect thought to user
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280
        },
        // use Mongoose's ObjectId data type
        createdAt: {
            type: Date,
            default: Date.now,
            // use a getter method to format the timestamp on query
            get: (timestamp) => dateFormat(timestamp)
        },
        // use Mongoose's ObjectId data type
        username: {
            type: String,
            required: true
        },
        // use reactionSchema to validate data for a reply
        reactions: [ReactionSchema]
    },
    {   
        // tell schema it can use virtuals
        toJSON: {
            virtuals: true,
            getters: true
        },
        // prevent virtuals from creating duplicate of _id as `id`
        id: false
    }
);

// getting the length of the thought's reactions array field on query
ThoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

// create the Thought model using the ThoughtSchema
const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;