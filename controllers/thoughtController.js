// import the User and Thought models
const {User, Thought} = require('../models');

module.exports = {
    // get all the users for thoughts
    postThought(req, res) {
        Thought.create(req.body)
        .then((thought) => {
            return User.findOneAndUpdate(
                { _id: req.params.userId },
                { $push: { thoughts: thought._id } },
                { new: true }
            );
        })
        // if no user is found, send 404
        .then((user) => {
            if (!user) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            }
            res.json(user);
        })
        // using catch error to show any errors
        .catch((err) => res.json(err));
    },

    // get all thoughts for a user
    getAllThoughts(req, res) {
        Thought.find()
        .then((thoughts) => res.json(thoughts))
        .catch((err) => res.json(err));
    },
    // get one thought by id
    getOneThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
        // using .select to remove the __v
        .select('-__v')
        // using .then to populate the reactions
        .then((thought) => {
            if (!thought) {
                res.status(404).json({ message: 'No thought found with this id!' });
                return;
            }
            res.json(thought);
        })
        // using catch error to show any errors
        .catch((err) => res.json(err));
    },
    // update thought by id
    putThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
        // using .then to populate the reactions
        .then((thought) => {
            if (!thought) {
                res.status(404).json({ message: 'No thought found with this id!' });
                return;
            }
            res.json(thought);
        })
        // using catch error to show any errors
        .catch((err) => res.json(err));
    },
    // delete thought by id
    deleteThought(req, res) {
        Thought.findOneAndDelete({ _id: req.params.thoughtId })
        // using .then to populate the reactions
        .then((thought) => {
            if (!thought) {
                res.status(404).json({ message: 'No thought found with this id!' });
                return;
            }
            // returning the user from the thought
            return User.findOneAndUpdate(
                { _id: req.params.userId },
                { $pull: { thoughts: thought._id } },
                { new: true }
            );
        })
        // using .then to populate the reactions
        .then((user) => {
            if (!user) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            }   
            res.json(user);
        })
        // using catch error to show any errors
        .catch((err) => res.json(err));
    },
    // add reaction to thought
    postReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $push: { reactions: req.body } },
            { runValidators: true, new: true }
        )
        // using .then to populate the reactions
        .then((thought) => {
            if (!thought) {
                res.status(404).json({ message: 'No thought found with this id!' });
                return;
            }
            res.json(thought);
        })
        // using catch error to show any errors
        .catch((err) => res.json(err));
    },
    // delete reaction from thought
    deleteReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.params.reactionId } } },
            { new: true }
        )
        // using .then to populate the reactions
        .then((thought) => {
            // if no thought is found, send 404
            if (!thought) {
                res.status(404).json({ message: 'No thought found with this id!' });
                return;
            }
            res.json(thought);
        })
        // using catch error to show any errors
        .catch((err) => res.json(err));
    }
        };