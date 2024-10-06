import { user } from "../models/user.mjs";
import { Post } from "../models/post.mjs";

export const fetchInfo4Header = async (req, res) => {
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
};

export const fectchAllPost = async (req, res) => {
  try {
    const post = await Post.find();
    res.status(200).json(post);
  } catch (err) {
    return res.status(404).json({ error: "エラーが発生しました" });
  }
};
