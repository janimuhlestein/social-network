const { json } = require('express');
const {Thought, User} = require('../models');

const thoughtController = {
    //get all thoughts
    getAllThoughts(req,res) {
        Thought.find({})
        .then(dbThoughtData=>{
            res.json(dbThoughtData);
        })
        .catch(err=>{
            console.log(err);
            res.status(500).json(err);
        });
},
    //get one thought
    getOneThought({params},res){
        Thought.findOne({_id: params.thoughtId})
        .then(dbThoughtData=>{
            if(!dbThoughtData) {
                res.status(404).json({message: 'No thought found with that id'});
            }
            res.json(dbThoughtData);
        })
        .catch(err=>{
            console.log(err);
            res.status(500).json(err);
        });
},
    //add thought
    addThought({params, body}, res){
        Thought.create(body)
        .then(({_id})=>{
            return User.findOneAndUpdate(
                {_id: params.userId},
                {$push: {thoughts: _id}},
                {new: true, runValidators: true}
            );
        })
        .then(dbUserData=>{
            if(!dbUserData) {
                res.status(404).json({message: 'No user found with this id'});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err=>{
            console.log(err);
            res.status(500).json(err);
        });
    },
    // add reaction
    addReaction({params, body}, res) {
        Thought.findOneAndUpdate(
            {_id: params.thoughtId},
            {$push: {reactions: body}},
            {new: true, runValidators: true}
        )
        .then(dbThoughtData=>{
            if(!dbThoughtData) {
                res.status(404).json({message: 'No thought found with this id'});
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err=>{
            console.log(err);
            res.status(500).json(err);
        });
    },
    removeReaction({params}, res) {
        Thought.findOneAndUpdate(
            {_id: params.thoughtId},
            {$pull: {reactions: {reactionId: params.reactionId}}},
            {new: true}
        )
        .then(dbThoughtData=>{
           res.json(dbThoughtData);
        })
        .catch(err=>{
            console.log(err);
            res.status(500).json(err);
        });
    },
    //remove thought
    removeThought({params}, res) {
        Thought.findOneAndDelete({_id: params.thoughtId})
        .then(deletedThought=>{
            if(!deletedThought) {
                return res.status(404).json({message: 'No thought with this id'});
            }
            return User.findOneAndUpdate(
                {_id: params.userId},
                {$pull: {thoughts: params.thoughtId}},
                {new: true}
            );
        })
        .then(dbUserId=>{
            if(!dbUserId) {
                res.status(404).json({message: 'No user found with this id'});
                return;
            }
            res.json(dbUserId);
        })
        .catch(err=>{
            console.log(err);
            res.status(500).json(err);
        });
    }
};

module.exports = thoughtController;