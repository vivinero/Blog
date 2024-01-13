const express = require("express")
const router = express.Router()

const { newComment, getComment, getAllPostComment, updateComment, deleteComment } = require("../controllers/commentController.js")

router.post("/newcomment", newComment)
router.get("/getcomment/:id", getComment)
router.get("/getallpostcomment/:id", getAllPostComment)
router.patch("/updatecomment/:id", updateComment)
router.delete("/deletecomment/:id/:commentID", deleteComment)


module.exports = router