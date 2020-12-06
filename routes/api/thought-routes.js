const router = require('express').Router();
const {getAllThoughts, getOneThought, addThought, removeThought, addReaction, removeReaction} = require('../../controllers/thought-controller');

router
.route('/')
.get(getAllThoughts);

router
.route('/:userId')
.post(addThought);

router
.route('/:userId/:thoughtId/:reactionId')
.delete(removeReaction);

router
.route('/:userId/:thoughtId')
.put(addReaction)
.get(getOneThought)
.delete(removeThought);

module.exports = router;
