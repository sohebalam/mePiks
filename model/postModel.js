import mongoose from "mongoose"

const postSchema = mongoose.Schema({
  titile: {
    type: String,
  },

  message: {
    type: String,
  },
  creator: {
    type: String,
    required: true,
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
