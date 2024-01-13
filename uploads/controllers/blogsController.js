const blogModel = require("../models/blogModel")
const commentModel = require("../models/commentModel")

exports.createPost = async (req, res)=> {
    try {
        const {title, description}= req.body
        const newPost = await blogModel.create({
            title,
            description
        })
        res.status(201).json({
            message: `Post with title: "${newPost.title}" uploaded successfully`,
            newPost
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}


exports.getOne = async (req, res) => {
    try {
        const id = req.params.id
        const blog = await blogModel.findById(id).populate("comments")
        if (!blog) {
            return res.status(404).json({
                message: "unable to fine the user"
            })
        }
        return res.status(200).json({
            message: `Successfully found ${blog.title}`,
            blog
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

exports.getAll = async(req, res)=> {
    try {
        const blog = await blogModel.find().populate("comments")
        if (blog.length === 0) {
            return res.status(200).json({
                message: "No user found"
            })
        }
        return res.status(200).json({
            message: "successfully gotten all students",
            blog
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

exports.updateBlog = async (req, res) => {
    try {
        const id = req.params.id
        const data = {
            title: req.body.title,
            description: req.body.description,
        }
        const blog = await blogModel.findById(id, data, {new: true})
        if (!blog) {
            return res.status(402).json({
                message: " Unable to find blog"
            })
        }
        return res.status(200).json({
            message: "You have successfully updated your blog",
            blog
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

exports.deleteBlog = async (req, res)=> {
    try {
        const id = req.params.id
        const blog = await blogModel.findByIdAndDelete(id)
        if (!blog) {
            return res.status(404).json({
                message: "unable to delete user"
            })
        }
        await commentModel.deleteMany({post: id})
        return res.status(200).json({
            message: `This blog ${blog.title} has been deleted successfu
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}
