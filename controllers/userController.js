const {User, Thought} = require('../models');


module.exports = {
    postUser(request, response) {
      User.create(request.body)
        .then((user) => response.json(user))
        .catch((error) => response.status(500).json(error));
    },
    // get all users
    getAllUsers(req, res) {
        User.find()
          .then((users) => response.json(users))
          .catch((error) => response.status(500).json(error));
      },

    // get single user by id
    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId })
        .populate("thoughts")
        .populate("friends")
        .select("-__v")
        .then((user) =>
        !user
        ? res.status(404).json({ message: "No user found with this id!" })
        : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
    },

    // create a user
    createUser(req, res) {
        User.create(req.body)
        .then((user) => res.json(user))
        .catch((err) => res.status(500).json(err));
    },

    // update a user by id
    updateUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
        .then((user) =>
        !user
        ? res.status(404).json({ message: "No user found with this id!" })
        : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
    },

    // delete a user
    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.userId })
          .then((user) =>
            !user
              ? res.status(404).json({ message: "No User found with this ID!" })
              : Thought.deleteMany({ _id: { $in: user.thoughts } })
          )
          .then(() => res.json({ message: "User and User's Thoughts deleted!" }))
          .catch((err) => res.status(500).json(err));
      },

    // add a friend
    addFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: req.params.friendId } },
            { runValidators: true, new: true }
        )
        .then((user) =>
        !user
        ? res.status(404).json({ message: "No user found with this id!" })
        : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
    },

    // delete a friend
    deleteFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: req.params.friendId } },
            { runValidators: true, new: true }
        )
        .then((user) =>
        !user
        ? res.status(404).json({ message: "No user found with this id!" })
        : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
    },


        };

