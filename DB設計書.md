# データベース設計書（SNS 対応版）

## 1. **Users（ユーザー）テーブル**

| フィールド名 | 型       | 必須 | 説明                       |
| ------------ | -------- | ---- | -------------------------- |
| \_id         | ObjectId | Yes  | ユーザーのユニーク ID      |
| email        | String   | Yes  | ユーザーのメールアドレス   |
| password     | String   | Yes  | ユーザーのパスワード       |
| username     | String   | Yes  | ユーザー名                 |
| profile      | String   | No   | ユーザーのプロフィール     |
| ImgURL       | STring   | No   | ユーザーのプロフィール画像 |
| createdAt    | Date     | No   | ユーザーの登録日時         |

### **Users テーブル概要**

- **\_id**: MongoDB の自動生成されるユニークな ID。
- **email**: ユーザーのメールアドレス。認証時に利用する。
- **password**: ユーザーのハッシュ化されたパスワード。
- **username**: ユーザーの表示名（プロフィールや投稿に使用）。
- **profile**: ユーザーの自己紹介などのプロフィール。
- **createdAt**: ユーザーが登録された日時。

---

## 2. **Categories（大分類）テーブル**

| フィールド名  | 型       | 必須 | 説明                   |
| ------------- | -------- | ---- | ---------------------- |
| \_id          | ObjectId | Yes  | 大分類のユニーク ID    |
| category_name | String   | Yes  | 大分類名               |
| createdAt     | Date     | No   | 大分類が作成された日時 |

### **Categories テーブル概要**

- **\_id**: 大分類のユニーク ID。
- **category_name**: 大分類名（例えば、"プログラミング"、"数学"など）。
- **createdAt**: 大分類が作成された日時。

---

## 3. **StudySessions（勉強セッション）テーブル**

| フィールド名 | 型       | 必須 | 説明                        |
| ------------ | -------- | ---- | --------------------------- |
| \_id         | ObjectId | Yes  | 勉強セッションのユニーク ID |
| user_id      | ObjectId | Yes  | ユーザー ID (リレーション)  |
| category_id  | ObjectId | Yes  | 大分類 ID (リレーション)    |
| subject_name  | String | Yes  | 科目名   　　　　　　 |
| is_bool     | boolean     | No  | 勉強終了時間                |
| start_time   | Date     | Yes  | 勉強開始時間                |
| end_time     | Date     | Yes  | 勉強終了時間                |

### **StudySessions テーブル概要**

- **\_id**: 勉強セッションのユニーク ID。
- **user_id**: ユーザー ID。`Users`テーブルの`_id`とリレーション。
- **category_id**: 大分類 ID。`Categories` テーブルの`_id`とリレーション。
- **start_time**: 勉強の開始時間。
- **end_time**: 勉強の終了時間。

---

## 4. **Posts（投稿）テーブル**

| フィールド名 | 型       | 必須 | 説明                       |
| ------------ | -------- | ---- | -------------------------- |
| \_id         | ObjectId | Yes  | 投稿のユニーク ID          |
| user_id      | ObjectId | Yes  | ユーザー ID (リレーション) |
| content      | String   | Yes  | 投稿内容                   |
| createdAt    | Date     | Yes  | 投稿が作成された日時       |

### **Posts テーブル概要**

- **\_id**: 投稿のユニーク ID。
- **user_id**: 投稿者のユーザー ID。`Users` テーブルの `_id` とリレーション。
- **content**: 投稿のテキスト内容。
- **createdAt**: 投稿が作成された日時。

---

## 5. **Follows（フォロー）テーブル**

| フィールド名 | 型       | 必須 | 説明                          |
| ------------ | -------- | ---- | ----------------------------- |
| \_id         | ObjectId | Yes  | フォロー関係のユニーク ID     |
| follower_id  | ObjectId | Yes  | フォロワーのユーザー ID       |
| following_id | ObjectId | Yes  | フォローされているユーザー ID |

### **Follows テーブル概要**

- **\_id**: フォロー関係のユニーク ID。
- **follower_id**: フォローしているユーザーの ID。`Users` テーブルの `_id` とリレーション。
- **following_id**: フォローされているユーザーの ID。`Users` テーブルの `_id` とリレーション。

---

## 6. **Likes（いいね）テーブル**

| フィールド名 | 型       | 必須 | 説明                   |
| ------------ | -------- | ---- | ---------------------- |
| \_id         | ObjectId | Yes  | いいねのユニーク ID    |
| user_id      | ObjectId | Yes  | いいねしたユーザー ID  |
| post_id      | ObjectId | Yes  | いいねされた投稿の ID  |
| createdAt    | Date     | Yes  | いいねが作成された日時 |

### **Likes テーブル概要**

- **\_id**: いいねのユニーク ID。
- **user_id**: いいねをしたユーザーの ID。`Users` テーブルの `_id` とリレーション。
- **post_id**: いいねをされた投稿の ID。`Posts` テーブルの `_id` とリレーション。
- **createdAt**: いいねが作成された日時。

---

## 7. **テーブル間リレーション**

- **Users** ↔ **StudySessions**
  - 1 対多の関係（1 人のユーザーが複数の勉強セッションを持つ）。
- **Categories** ↔ **StudySessions**

  - 1 対多の関係（1 つの大分類に複数の勉強セッションが紐づく）。

- **Users** ↔ **Posts**

  - 1 対多の関係（1 人のユーザーが複数の投稿を持つ）。

- **Users** ↔ **Follows**

  - 多対多の関係（1 人のユーザーが他の複数のユーザーをフォローでき、フォローされる）。

- **Users** ↔ **Likes**

  - 1 対多の関係（1 人のユーザーが複数の投稿にいいねを押すことができる）。

- **Posts** ↔ **Likes**
  - 1 対多の関係（1 つの投稿に複数のいいねが紐づく）。

---

## 8. **想定されるクエリ**

- **ユーザーの全ての投稿を取得する**
  ```javascript
  db.posts.find({ user_id: <userId> });
  ```
