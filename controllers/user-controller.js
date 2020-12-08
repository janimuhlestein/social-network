const {User} = require('../models');

const userController = {
    //find all users
    getAllUsers(req,res) {
        User.find({})
        .populate({
            path: 'thoughts',
            select: '-__v'
        })
        .select('-__v')
        .sort('_id: -1')
        .then(dbUserData => res.json(dbUserData))
        .catch(err=>{
            console.log(err);
            res.status(500).json(err);
        });
    },
    //get one use by id
    getUserById({params}, res) {
        User.findOne({_id: params.id})
        .populate({
            path: 'thoughts',
            select: '-__v'
        })
        .select('-__v')
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
    //create user with POST
    createUser({body}, res) {
        User.create(body)
        .then(dbUserData=>{
            res.json(dbUserData)
        })
        .catch(err=>{
            console.log(err);
            res.status(500).json(err);
        });
    },
    //update user by id
    updateUser({params, body}, res) {
        User.findOneAndUpdate({_id: params.id}, body, {new: true, runValiudators: true})
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
    //delete user by id
    deleteUser({params}, res) {
        User.findOneAndDelete({_id: params.id})
        .then(dbUserData=>{
            if(!dbUserData){
                res.status(404).json({message: 'No user found with that id'});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err=>{
            console.log(err);
            res.status(500).json(err);
        });
    },
    //add friend

   /*  Thought.create(body)
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
    }); */

    addFriend({params,}, res) {
       return User.findOneAndUpdate(
            {_id: params.userId},
            {$push: {friends: params.friendId}},
            {new: true}
            )
        .then(dbFriendData=>{
            if(!dbFriendData) {
                res.status(404).json({message: 'No user found with that id'});
                return;
            }
            res.json(dbFriendData);
        })
        .catch(err=>{
            console.log(err);
            res.status(500).json(err);
        });
    },

    //remove friend
    removeFriend({params}, res) {
        User.findOneAndUpdate(
            {_id: params.userId},
            {$pull: {friends: params.friendId}},
            {new: true}
            )
        .then(dbFriendData=>{
            if(!dbFriendData) {
                res.status(404).json({message: 'No friend found with that id'});
                return;
            }
            res.json(dbFriendData);
        })
        .catch(err=>{
            console.log(err);
            res.status(500).json(err);
        });
    }
};

module.exports = userController;