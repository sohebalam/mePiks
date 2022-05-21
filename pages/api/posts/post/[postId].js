import Post from "../../../../model/postModel"
import connectDB from "../../../../connectDB"
import mongoose from "mongoose"

connectDB()

export default async (req, res) => {
  if (req.method === "GET") {
    const post = await Post.findById(req.query.postId)

    return res.status(200).send(post)
  }
}
