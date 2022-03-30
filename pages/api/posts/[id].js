import Post from "../../../model/postModel"
import connectDB from "../../../connectDB"
import mongoose from "mongoose"
import Authenticated from "../../../lib/middleware/isAuth"
connectDB()

export default Authenticated(async (req, res) => {
  if (req.method === "PUT") {
    console.log(req.method)
    try {
      if (!req.user) {
        return res.status(404).json({ message: "Please login" })
      }

      req.body.memoryData.userId = req.user._id.toString()
      const { id } = req.query

      const { title, message, creater, tags, image, userId } =
        req.body.memoryData

      const post = await Post.find({ _id: id })

      // console.log(post)

      if (post[0].userId !== req.user._id.toString()) {
        return res.status(404).send(`invalid user`)
      }

      // console.log("post", id)

      if (!post) {
        return res.status(404).send(`no post with that ${id}`)
      }

      const updatedPost = await Post.findByIdAndUpdate(
        { _id: id },
        {
          title,
          message,
          tags,
          creater,
          image,
          userId,
        },
        {
          new: true,
        }
      )
      await updatedPost.save()
      // console.log("update", updatedPost)

      return res.status(200).json({ message: "post updated", updatedPost })
    } catch (error) {
      console.log(error)
    }
  }

  if (req.method === "DELETE") {
    // console.log(req.method)
    console.log(req.user._id.toString())

    const { id } = req.query

    const post1 = await Post.find({ _id: id })

    console.log(post1[0]?.userId)

    if (post1[0].userId !== req.user._id.toString()) {
      return res.status(404).send(`invalid user`)
    }

    // console.log(id)

    const post = await Post.findByIdAndDelete({ _id: id })

    res.status(200).json({ message: "deleted", post })
  }
})
