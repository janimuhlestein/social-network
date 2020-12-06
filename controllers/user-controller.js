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
    updateUser({params}, res) {
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
        .then(dbUserId=>{
            if(!dbUserData){
                res.status(404).json({message: 'No user found with that id'});
                return;
            }
            res.json(dbUserId);
        })
        .catch(err=>{
            console.log(err);
            res.status(500).json(err);
        });
    },
    //add friend
    addFriend({params}, res) {
        User.findOneAndUpdate({_id: params.friendId})
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
    }
};

module.exports = userController;