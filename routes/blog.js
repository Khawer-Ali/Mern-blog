const express = require('express');
const fetchUser = require('../middleware/fetchuser');
const router = express.Router();
const Blog = require('../modal/Blog')
const { body, validationResult } = require('express-validator');

// ROUTE 1 : Create Blog
router.post('/createblog', fetchUser, [
    body('title', 'Enter a valid title').isLength({ min: 5 }),
    body('description', 'Description must be atleast 20 characters').isLength({ min: 20 }),
], async (req, res) => {
    // If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { title, description, img, category, avatar, author } = req.body;
        let userId = req.user.id;

        const blog = new Blog(
            { title, description, img, category, avatar, author, user: userId }
        );

        const savedBlog = await blog.save();
        res.json(savedBlog)
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error")
    }
})

// ROUTE 2 : Fetch Blog
router.get("/getBlog", async (req, res) => {
    const blogs = await Blog.find()
    res.json(blogs)
})

// ROUTE 3 : Fetch My Blog
router.get("/myBlog", fetchUser, async (req, res) => {
    const blogs = await Blog.find({ user: req.user.id });
    res.json(blogs);
})


// ROUTE 4 : Delete Blog
router.delete('/deleteblog/:id', fetchUser, async (req, res) => {
    try {
        // Find the note to be deleted and delete it
        let blog = await Blog.findById(req.params.id);

        if (!blog) {
            return res.status(404).send("Not found")
        }

        // Allow deletion only if user owns this BLog
        if (blog.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        blog = await Blog.findByIdAndDelete(req.params.id);
        res.json({ "success": "Blog has been deleted successfully", blog: blog })
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server Error")
    }
})

// ROUTE 5 : Edit Blog
router.put('/editblog/:id', fetchUser, async (req, res) => {
    const { title, description, category, img } = req.body;

    try {
        let newNote = {};

        if (title) {
            newNote.title = title;
        }

        if (description) {
            newNote.description = description;
        }

        if (category) {
            newNote.category = category;
        }

        if (img) {
            newNote.img = img;
        }

        //  Find the blog to be updated and update it
        let blog = await Blog.findById(req.params.id);

        if (!blog) {
            return res.status(404).send("Not found")
        }

        if (blog.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed")
        }

        blog = await Blog.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });

        res.json({ blog })
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error")
    }

})

module.exports = router;
