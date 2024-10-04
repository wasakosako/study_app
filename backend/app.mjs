import express from "express";
import { body, validationResult } from "express-validator";
import env from "dotenv";
import { userLogin, userRegister } from "./contllorer/userContllorer.mjs";
import { Post } from "./user/post.mjs";
import { user } from "./user/user.mjs";
import cors from "cors"; // 修正した部分
import { StudySession } from "./user/studysession.mjs";
import { studySubject } from "./user/studysubject.mjs";

env.config();

const PORT = 8080;
const app = express();

// ミドルウェア設定
app.use(
  cors({
    origin: "http://localhost:3000", // フロントエンドのURLを指定
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// 登録用API
app.post(
  "/register",
  [
    body("email")
      .optional()
      .isEmail()
      .withMessage("有効なメールアドレスを入力してください"),
    body("password")
      .notEmpty()
      .isLength({ min: 8 })
      .withMessage("パスワードは8文字以上で入力してください"),
    body("username")
      .notEmpty()
      .isLength({ max: 15 })
      .withMessage("ユーザーネームを入力してください"),
    body("profile").optional(),
  ],
  userRegister
);

// ログイン用API
app.post(
  "/login",
  [
    body("username").notEmpty().withMessage("ユーザーネームを入力してください"),
    body("password").notEmpty().withMessage("パスワードを入力してください"),
  ],
  userLogin
);

// プロフィール取得API
app.get("/api/profile/:username", async (req, res) => {
  try {
    const _username = req.params.username;
    const post = await Post.find({ username: _username });
    res.status(200).json(post);
  } catch (err) {
    return res.status(404).json({ error: "エラーが発生しました" });
  }
});

// ヘッダー情報取得API
app.get("/api/header/:username", async (req, res) => {
  try {
    const _username = req.params.username;
    const userinfo = await user.findOne({ username: _username });
    if (userinfo == null) {
      return res.status(404).json({ error: "このユーザーは存在しません" });
    }
    res.status(200).json({
      username: userinfo.username,
      ImgURL: userinfo.ImgURL,
      profile: userinfo.profile,
    });
  } catch (err) {
    return res.status(500).json({ error: "処理中にエラーが発生しました" });
  }
});

app.get("/api/allpost", async (req, res) => {
  try {
    const post = await Post.find();
    res.status(200).json(post);
  } catch (err) {
    return res.status(404).json({ error: "エラーが発生しました" });
  }
});

app.post("/api/addstudy", async (req, res) => {
  try {
    console.log(req.body);
  } catch (err) {
    res.status(404).json({ error: "エラーが発生しました" });
  }
});

app.post("/api/regist/subject", async (req, res) => {
  try {
    console.log(req.body);
    const { username, name, status, priority } = req.body;
    // ユーザーIDを元にユーザー情報を取得
    console.log(username);
    const userInfo = await user.findOne({ username: username.toString() });
    if (!userInfo) {
      return res.status(404).json({ error: "ユーザーが見つかりません" });
    }

    // 新しい科目を作成
    const newSubject = new studySubject({
      username: username.toString(),
      name,
      status,
      priority,
    });

    await newSubject.save();

    return res.status(200).json({ msg: "登録に成功しました" });
  } catch (err) {
    console.log(err);
    res.status(404).json({ error: "エラーが発生しました" });
  }
});

app.get("/api/fetch/subject/:username", async (req, res) => {
  try {
    const username = req.params.username;
    const userInfo = await user.findOne({ username: username.toString() });
    console.log(userInfo);
    if (!userInfo) {
      return res.status(404).json({ error: "ユーザーが見つかりません" });
    }

    const subject = await studySubject.find({ username: username.toString() });
    return res.status(200).json(subject);
  } catch (err) {
    console.log(err);
    res.status(404).json({ error: "エラーが発生しました" });
  }
});

app.listen(PORT, () => {
  console.log(`Server start: http://localhost:${PORT}`);
});
