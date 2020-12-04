const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));

app.use(require('./routes'));
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/social-network', {
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.set('debut', true);

app.listen(PORT, ()=> console.log(`Connected on localhost: ${PORT}`));