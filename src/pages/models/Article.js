import mongoose from "mongoose";

const ArticleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    paragraphs: {
        type: [String],
        required: true
    }
  }, { timestamps: true });
  
 const Article = mongoose.model('Article', ArticleSchema);
 export default Article;
  