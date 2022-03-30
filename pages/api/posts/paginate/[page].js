import Post from "../../../../model/postModel"
import connectDB from "../../../../connectDB"
import mongoose from "mongoose"

connectDB()

export default async (req, res) => {
  // console.log(req.method)
  if (req.method === "GET") {
    const { page } = req.query

    // console.log(page)

    try {
      const LIMIT = 6
      const startIndex = (Number(page) - 1) * LIMIT
      // console.log(startIndex)

      const total = await Post.countDocuments({})

      // console.log(total)

      const posts = await Post.find()
        .sort({ _id: 1 })
        .limit(LIMIT)
        .skip(startIndex)

      //   console.log(posts)

      res.json({ data: posts, count: Math.ceil(total / LIMIT) })
    } catch (error) {
      console.log(error)
    }
  }
}
