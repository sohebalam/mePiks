import Post from "../../../../model/postModel"
import connectDB from "../../../../connectDB"
import mongoose from "mongoose"
import Authenticated from "../../../../lib/middleware/isAuth"
connectDB()

export default async (req, res) => {
  console.log(req.method)

  if (req.method === "GET") {
    const { page } = req.query

    console.log(page)

    try {
      const LIMIT = 6
      const startIndex = (Number(page) - 1) * LIMIT // get the starting index of every page

      const total = await Post.countDocuments({})
      const posts = await Post.find()
        .sort({ _id: 1 })
        .limit(LIMIT)
        .skip(startIndex)

      res.json({
        data: posts,
        currentPage: Number(page),
        numberOfPages: Math.ceil(total / LIMIT),
      })
    } catch (error) {
      res.status(404).json({ message: error.message })
    }
  }
}
