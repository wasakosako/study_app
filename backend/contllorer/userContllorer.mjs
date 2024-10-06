import express from "express";
import jsonwebtoken from "jsonwebtoken";
import { body, validationResult } from "express-validator";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { user as User } from "../models/user.mjs"; // Userモデルのインポート確認
import env from "dotenv";
import { Post } from "../models/post.mjs";

env.config();

const JWT = jsonwebtoken;

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

export const userRegister = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password, username, profile } = req.body;
  try {
    // パスワードの暗号化
    const hashedPassword = await bcrypt.hash(password, 10);

    // ユーザーをDBに保存
    const newUser = new User({
      email,
      password: hashedPassword,
      username,
      profile,
    });

    await newUser.save();

    // JWTの発行
    const token = JWT.sign(
      {
        username: newUser.username,
      },
      "SECRET_KEY", //env内に置き返します
      {
        expiresIn: "24h",
      }
    );

    return res.status(201).json({
      message: "ユーザーが正常に登録されました",
      token: token,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "ユーザー登録中にエラーが発生しました" });
  }
};

export const userLogin = async (req, res) => {
  const { username, password } = req.body;

  console.log(req.body);
  try {
    // ユーザーの存在を確認
    const user = await User.findOne({ username: username });
    if (!user) {
      return res.status(400).json({ error: "そのユーザーは存在しません" });
    }

    // パスワードを比較
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "パスワードが異なります" });
    }

    // JWTの発行
    const token = JWT.sign(
      {
        username: user.username,
      },
      "SECRET_KEY",
      {
        expiresIn: "24h",
      }
    );

    return res.status(200).json({
      message: "ログインに成功しました",
      userInfo: {
        username: user.username,
        ImgURL: user.ImgURL,
        profile: user.profile,
      },
      token: token,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ error: "ログイン処理中にエラーが発生しました" });
  }
};

export const fetchprofile = async (req, res) => {
  try {
    const _username = req.params.username;
    const post = await Post.find({ username: _username });
    res.status(200).json(post);
  } catch (err) {
    return res.status(404).json({ error: "エラーが発生しました" });
  }
};
