const mongoose  = require('mongoose');
const { Schema } = mongoose;

const BlogSchema = new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        // ref: 'user'
    },
    title: {
        type: String,
        required: true
    },
    description : {
        type: String,
        required: true,
    },
    img : {
        type: String,
    },
    avatar : {
        type: String,
        required: true,
    },
    author : {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now
    },
    category : {
        type: String,
        required: true,
    }
});

const Blog = mongoose.model('blog', BlogSchema);


module.exports = Blog;