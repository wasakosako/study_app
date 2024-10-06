import express from "express";
import { body, validationResult } from "express-validator";
import env from "dotenv";
import {
  fetchprofile,
  userLogin,
  userRegister,
} from "./contllorer/userContllorer.mjs";
import {
  fectchAllPost,
  fetchInfo4Header,
} from "./contllorer/postContllorer.mjs";
import {
  addStudyTime,
  addSubject,
  directregisttime,
  fetchStudyData,
  fetchSubject,
} from "./contllorer/subjectContllorer.mjs";

env.config();

const PORT = 8080;
const app = express();

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
app.get("/api/profile/:username", fetchprofile);

// ヘッダー情報取得API
app.get("/api/header/:username", fetchInfo4Header);

//Top画面、TimeLine画面のためのすべての投稿を取得するAPI
app.get("/api/allpost", fectchAllPost);

//科目登録API
//ToDO:バリデーションの追加
app.post("/api/regist/subject", addSubject);

//ユーザーが登録した科目の取得API
app.get("/api/fetch/subject/:username", fetchSubject);

//ユーザーがこれまで登録した勉強の記録を取得するAPI
//Todo:未完成
app.get("/api/fetch/studydata/:username", fetchStudyData);

//勉強時間を追加するAPI
app.post("/api/regist/timer", addStudyTime);
//直接勉強時間を登録するAPI
app.get("/directregisttime/:subject", directregisttime);

app.listen(PORT, () => {
  console.log(`Server start: http://localhost:${PORT}`);
});
