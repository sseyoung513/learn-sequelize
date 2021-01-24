const express = require("express");
const User = require("../models/user");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    // 모든 사용자 찾아
    const users = await User.findAll();
    // sequelize.html을 렌더링할 때, 결괏값인 users 그대로 넣음
    res.render("sequelize", { users });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;
