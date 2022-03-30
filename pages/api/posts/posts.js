import Post from "../../../model/postModel"
import connectDB from "../../../connectDB"
connectDB()

export default async (req, res) => {
  if (req.method === "GET") {
    try {
      const post = await Post.find({})

      return res.status(200).json(post)
    } catch (err) {
      return res.status(404).json({ message: err.message })
    }
  }
}
