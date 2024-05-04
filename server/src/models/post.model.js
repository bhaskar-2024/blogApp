import mongoose from 'mongoose';

const postSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
      unique: true,
    },
    image: {
      type: String,
      default:
        'https://img.freepik.com/free-vector/images-concept-illustration_114360-298.jpg?w=740&t=st=1714831450~exp=1714832050~hmac=7b58bab3edec7e2ad5e4933b7e5bc3237b156437f29d370138d846d492895c33',
    },
    category: {
      type: String,
      default: 'uncategorized',
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

const Post = mongoose.model('Post', postSchema);

export default Post;
