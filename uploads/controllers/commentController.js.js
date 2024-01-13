const commentModel = require("../models/commentModel")
const blogModel = require("../models/blogModel")

exports.newComment = async (req, res)=> {
    try {
        const id = req.body.id
        const blog = await blogModel.findById(id);
        if (!blog) {
            return res.status(404).json({
                message: "Blog not found"
            })
        }
        const comment = await commentModel.create(req.body);
        //post the comment into the comment fields in the blog model
        blog.comments.push(comment._id);
        comment.post = blog._id

        //save the changes into the database
        await blog.save();
        await comment.save();

        return res.status(201).json({
            message: "Successfully posted a comment",
            comment

        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

exports.getComment = async (req, res) => {
    try {
        const id = req.params.id
        const comment = await commentModel.findById(id)
        if (!comment) {
            return res.status(404).json({
                message: "Comment not found"
            })
        }
        return res.status(200).json({
            message: "Veiwing my comment",
            comment
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}
exports.getAllComment = async (req, res) => {
    try {
        const comment = await commentModel.find()
        if (comment.length === 0) {
            return res.status(200).json({
                message: "No Comment found"
            })
        }
        return res.status(200).json({
            message: "These are the comments in the blog",
            comment
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

exports.updateComment = async (req, res)=> {
    try {
        const id = req.params.id
        const data = {
            comment: req.body.comment,
            post: req.body.post
        }
        const newComment = await commentModel.findByIdAndUpdate(id, data, {new: true})
        if (!newComment) {
            return res.status(401).json({
                message: `unable to update comment`
            })
        }
        return res.status(200).json({
            message: `Successfully updated ${newComment.comment}in the post`,
            data: newComment
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

exports.deleteComment = async (req, res)=> {
    try {
        const id = req.params.id
        const comment = await commentModel.findByIdAndDelete(id)
        if (!comment) {
            return res.status(403).json({
                message: "Unable to delete comment, Comment not found"
            })
        }
        res.status(200).json({
            message: "Successfully deleted the comment",
            blogs
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}