const express = require("express")
const router = express.Router()
const { createPost, getOne, getAll, updateBlog, deleteBlog } = require("../controllers/blogsController")

router.post("/createpost",  createPost)
router.get("/getone/:id",  getOne)
router.get("/getall/:id",  getAll)
router.patch("/updateblog/:id",  updateBlog)
router.delete("/deleteblog/:id",  deleteBlog)


module.exports = router