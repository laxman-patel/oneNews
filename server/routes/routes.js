import express from "express";
const router = express.Router();
import News from "../logic/db.js";

router.get("/news/:category/", async (req, res) => {
  const { category } = req.params;

  //taking page and limit out of query with defaults
  const { page = 1, limit = 10 } = req.query;

  const data = await News.find({ category })
    .sort({ date: -1 })
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .exec();

  const count = await News.countDocuments({ category });

  res.send({ data, totalPages: Math.ceil(count / limit), currentPage: page });
});

export default router;
