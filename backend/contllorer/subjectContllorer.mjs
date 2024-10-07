import { timetable } from "../models/timetable.mjs";
import { studySubject } from "../models/studysubject.mjs";
import { user } from "../models/user.mjs";

export const addSubject = async (req, res) => {
  try {
    console.log(req.body);
    const { username, subjectname, status, priority } = req.body;
    // ユーザーIDを元にユーザー情報を取得
    console.log(username);
    const userInfo = await user.findOne({ username: username.toString() });
    if (!userInfo) {
      return res.status(404).json({ error: "ユーザーが見つかりません" });
    }

    // 新しい科目を作成
    const newSubject = new studySubject({
      username: username.toString(),
      subjectname: subjectname,
      status,
      priority,
    });

    await newSubject.save();

    return res.status(200).json({ msg: "登録に成功しました" });
  } catch (err) {
    console.log(err);
    res.status(404).json({ error: "エラーが発生しました" });
  }
};

//ユーザーが登録した科目の取得
export const fetchSubject = async (req, res) => {
  try {
    // ユーザーIDを元にユーザー情報を取得
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
};

//ユーザーの勉強記録を取得
export const fetchStudyData = async (req, res) => {
  try {
    const username = req.params.username;

    //const studies = await studySubject.find({ username: username.toString() });

    const result = await studySubject.aggregate([
      {
        $match: {
          /* findと同じ条件を指定 */
          username: username.toString(),
        },
      },
      {
        $lookup: {
          from: "timetables", // 結合するコレクション
          localField: "_id", // collection1 の結合に使うフィールド
          foreignField: "subject_id", // collection2 の結合に使うフィールド
          as: "studysession", // 結果のフィールド名
        },
      },
      {
        $unwind: "$studysession", // studysession の配列を展開する
      },
      {
        $group: {
          _id: "$subjectname", // username ごとにグループ化
          totalStudyTime: { $sum: "$studysession.duration" }, // 合計学習時間を計算
          sessions: { $push: "$studysession" }, // 各セッションを配列に追加
        },
      },
    ]);

    console.log(result);
    if (result.length === 0) {
      return res.status(404).json({ error: "ユーザーが見つかりません" });
    }
    return res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(404).json({ error: "エラーが発生しました" });
  }
};

//勉強時間を追加するAPI
export const addStudyTime = async (req, res) => {
  try {
    console.log(req.body);

    const subject = await studySubject.findOne({
      subjectname: req.body.name,
    });
    console.log(subject);
    const newtimetable = new timetable({
      subject_id: subject._id,
      subjectname: req.body.subjectname,
      sumtime: req.body.studyminutes,
    });

    await newtimetable.save();
  } catch (err) {
    console.log(err);
    res.status(404).json({ error: "エラーが発生しました" });
  }
};

//勉強時間を直接登録するAPI
export const directregisttime = async (req, res) => {
  try {
    const value = req.query.time;
    const subject = req.params.subject;
    console.log(subject);
    const subjectid = await studySubject.findOne({ subjectname: subject });
    const newtimetable = new timetable({
      subject_id: subjectid._id,
      subjectname: subject,
      sumtime: value,
    });
    console.log(newtimetable);
    newtimetable.save();
    res.status(200).json({ msg: "登録に成功しました" });
  } catch (err) {
    console.log(err);
    res.status(404).json({ error: "エラーが発生しました" });
  }
};
