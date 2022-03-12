import mongoose from "mongoose"

const postSchema = mongoose.Schema({
  title: {
    type: String,
  },

  message: {
    type: String,
  },
  creater: {
    type: String,
  },
  tags: [String],
  image: { type: String },
  likeCount: { type: Number, default: 0 },
  createdAt: {
    type: Date,
    default: new Date(),
  },
})

export default mongoose.models.Post || mongoose.model("Post", postSchema)
