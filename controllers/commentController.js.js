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
            message: `${comment.name}Successfully posted a comment`,
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
            message: `This comment is viewed by ${comment.name} `,
            comment
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}


exports.getAllPostComment = async (req, res)=> {
    try {
        const id = req.params.id
        const post = await blogModel.findById(id).populate("comments")
        if (!post)  {
            return res.status(400).json({
                message: "Opps! could not find any post"
            })
        }
        const comments = post.comments
        if (comments.length === 0) {
            return res.status(400).json({
                message: "Opps! ould not find any comment "
            })
        }

        return res.status(200).json({
            message: `There are ${comments.length} comment in this post`,
            comments
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
            name: req.body.name,
            comment: req.body.comment,
        }
        const newComment = await commentModel.findByIdAndUpdate(id, data, {new: true})
        if (!newComment) {
            return res.status(401).json({
                message: `unable to update comment`
            })
        }
        return res.status(200).json({
            message: `Successfully updated ${newComment.name}in the post`,
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
        const commentID = req.params.commentID

        const post = await blogModel.findById(id)
        const comment = await commentModel.findByIdAndDelete(commentID)
        if (!post) {
            return res.status(403).json({
                message: "Unable to delete post, post not found"
            })
        }
        if (!comment) {
            return res.status(403).json({
                message: "comment not found"
            })
        }
        res.status(200).json({
            message: "Successfully deleted the comment",
            
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}