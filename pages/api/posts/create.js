import Post from "../../../model/postModel"
import connectDB from "../../../connectDB"
import Authenticated from "../../../lib/middleware/isAuth"
connectDB()

export default Authenticated(async (req, res) => {
  console.log(req.user)
  if (req.method === "POST") {
    if (!req.user) {
      return res.status(404).json({ message: "Please login" })
    }

    req.body.memoryData.userId = req.user._id.toString()
    const post = req.body.memoryData
    // console.log(req.method)
    const newPost = await new Post(post)
    try {
      await newPost.save()

      return res.status(201).json(newPost)
    } catch (err) {
      return res.status(409).json({ message: err.message })
    }
  }
})
