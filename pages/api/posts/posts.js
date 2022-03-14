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

  if (req.method === "POST") {
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
}
