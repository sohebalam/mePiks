import Post from "../../../model/postModel"
import connectDB from "../../../connectDB"
import mongoose from "mongoose"
connectDB()

export default async (req, res) => {
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

      console.log("post", post[0].likeCount)

      if (!post) {
        return res.status(404).send(`no post with that ${id}`)
      }

      const updatedPost = await Post.findByIdAndUpdate(
        { _id: id },
        {
          likeCount: post[0]?.likeCount + 1,
        },
        {
          new: true,
        }
      )
      // await updatedPost.save()
      console.log("update", updatedPost)

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
}
