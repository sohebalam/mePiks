import Post from "../../../model/postModel"
import connectDB from "../../../connectDB"
import mongoose from "mongoose"
import Authenticated from "../../../lib/middleware/isAuth"

connectDB()

export default Authenticated(async (req, res) => {
  if (req.method === "PUT") {
    try {
      const { id } = req.query

      const { title, message, creater, tags, image } = req.body.memoryData

      const post = await Post.find({ _id: id })

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
        },
        {
          new: true,
        }
      )
      await updatedPost.save()
      // console.log("update", updatedPost)

      res.status(200).json({ message: "post updated", updatedPost })
    } catch (error) {
      console.log(error)
    }
  }
  if (req.method === "PATCH") {
    try {
      const { id } = req.query

      const post = await Post.find({ _id: id })

      // console.log("post", req.user)

      if (!post) {
        return res.status(404).send(`no post with that ${id}`)
      }

      if (!req.user) {
        return res.status(404).send(`unathenticated`)
      }

      console.log(req.user._id.toString())
      console.log("post", post[0]?.likes)

      const index = post[0]?.likes.findIndex(
        (id) => id === req.user._id.toString()
      )

      console.log(index)

      if (index === -1) {
        post[0].likes.push(req.user._id.toString())
      } else {
        post[0].likes = post[0].likes.filter(
          (id) => id !== req.user._id.toString()
        )
      }

      const updatedPost = await Post.findByIdAndUpdate(
        { _id: id },
        {
          likes: post[0]?.likes,
        },
        {
          new: true,
        }
      )
      // await updatedPost.save()
      // console.log("update", updatedPost)

      res.status(200).json({ message: "post updated", updatedPost })
    } catch (error) {
      console.log(error)
    }
  }

  if (req.method === "DELETE") {
    // console.log(req.query)

    const { id } = req.query

    // console.log(id)

    const post = await Post.findByIdAndDelete({ _id: id })

    res.status(200).json({ message: "deleted", post })
  }
})
