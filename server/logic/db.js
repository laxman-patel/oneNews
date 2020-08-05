import mongoose from "mongoose";

mongoose.connect("mongodb://localhost/onenews", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  config: {
    autoIndex: false,
  },
});

const db = mongoose.connection;

db.on("open", () => {
  console.log("connected to db");
});

/*-------DB Schema-------*/
const NewsSchema = new mongoose.Schema({
  title: String,
  description: String,
  link: String,
  content: String,
  date: Date,
  source: String,
  imgLink: String,
  category: String,
});

export default mongoose.model("News", NewsSchema);
