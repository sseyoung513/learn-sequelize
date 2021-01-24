const express = require("express");
const User = require("../models/user");
const Comment = require("../models/comment");

const router = express.Router();

router
  .route("/")
  .get(async (req, res, next) => {
    try {
      const users = await User.findAll();
      res.json(users); //
    } catch (err) {
      console.error(err);
      next(err);
    }
  })
  .post(async (req, res, next) => {
    try {
      const user = await User.create({
        name: req.body.name,
        age: req.body.age,
        married: req.body.married,
      });
      console.log(user);
      res.status(201).json(user);
    } catch (err) {
      console.error(err);
      next(err);
    }
  });
// GET /users/1/comments => 사용자 id가 1인 댓글 불러옴
// 조회된 댓글 객체에는 include로 넣어준 사용자 정보도 들어 있음 -> 작성자의 이름, 나이 등 조회 가능
router.get("/:id/comments", async (req, res, next) => {
  try {
    const comments = await Comment.findAll({
      include: {
        model: User,
        where: { id: req.params.id },
      },
    });
    console.log(comments);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;
