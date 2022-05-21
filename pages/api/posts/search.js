import Post from "../../../model/postModel"
import connectDB from "../../../connectDB"
connectDB()

export default async (req, res) => {
  if (req.method === "POST") {
    const { search: searchQuery } = req.query

    const { page } = req.body

    console.log("search", searchQuery, page)

    if (searchQuery === "") {
      return res.json()
    }

    try {
      const title = RegExp(searchQuery, "i")
      const message = RegExp(searchQuery, "i")
      const tags = RegExp(searchQuery, "i")

      const LIMIT = 6
      const startIndex = (Number(page) - 1) * LIMIT
      // console.log(startIndex)

      const search = await Post.find({
        $or: [{ title }, { message }, { tags }],
      })

      const total = search.length

      const posts = await Post.find({ $or: [{ title }, { message }, { tags }] })
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
