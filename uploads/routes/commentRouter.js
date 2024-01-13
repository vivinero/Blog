const express = require("express")
const router = express.Router()

const { newComment, getComment, getAllComment, updateComment, deleteComment } = require("../controllers/commentController.js")

router.post("/newcomment", newComment)
router.get("/getcomment/:id", getComment)
router.get("/getall/", getAllComment)
router.patch("/updatecomment/:id", updateComment)
router.delete("/deletecomment/:id", deleteComment)


module.exports = router