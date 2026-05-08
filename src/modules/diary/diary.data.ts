export type DiaryScore = {
  label: string;
  value: number;
};

export type DiaryItem = {
  id: string;
  topicBadge: string;
  streakLabel: string;
  promptTitle: string;
  hint: string;
  promptLabel: string;
  modelText: string;
  aiComment: string;
  opinionSummary: string;
  opinionGood: string;
  opinionImprove: string;
  totalScore: number;
  scores: DiaryScore[];
};

export const diaryItems: DiaryItem[] = [
  {
    id: 'today-memory',
    topicBadge: '今日のテーマ',
    streakLabel: '連続 12日',
    promptTitle: '今日いちばん印象に残ったことを書いてください',
    hint: '「〜と思いました」「〜と感じました」「その理由は〜です」などを使うと書きやすいです。',
    promptLabel: 'テーマに沿って、2〜4文くらいで手書きしてください。',
    modelText:
      '今日は授業のあとで友だちと話しました。最初は少し疲れていましたが、話しているうちに気分が楽になりました。やはり人と話すことは大切だと思いました。',
    aiComment:
      '内容は伝わっています。理由や感想をもう少しはっきり書くと、展開がより自然になります。',
    opinionSummary: '内容は十分伝わっています。文の流れも大きくは崩れていません。',
    opinionGood: '自分の感想が入っていて、日誌として自然な方向になっています。',
    opinionImprove: '事実だけでなく、その理由や気持ちを1文足すと、展開と自然さが上がります。',
    totalScore: 78,
    scores: [
      { label: '文法', value: 80 },
      { label: '語彙', value: 74 },
      { label: '展開', value: 77 },
      { label: '自然さ', value: 81 },
    ],
  },
  {
    id: 'school-life',
    topicBadge: '学校生活',
    streakLabel: '連続 12日',
    promptTitle: '学校生活について、今日感じたことを書いてください',
    hint: '「授業では〜」「特に〜が印象に残りました」「これからは〜したいです」などが使えます。',
    promptLabel: '学校の出来事と感想を2〜4文でまとめてください。',
    modelText:
      '今日は授業で発表をしました。少し緊張しましたが、終わったあとで安心しました。次はもっと落ち着いて話したいと思います。',
    aiComment:
      '文法は安定しています。最後に自分の意志を書くと、文章全体のまとまりが良くなります。',
    opinionSummary: '出来事と感想がきちんと分かれていて、読みやすい日誌になっています。',
    opinionGood: '緊張と安心の変化が見えて、内容に動きがあります。',
    opinionImprove: '最後の抱負をもう少し具体化すると、構成がさらに締まります。',
    totalScore: 81,
    scores: [
      { label: '文法', value: 82 },
      { label: '語彙', value: 79 },
      { label: '展開', value: 83 },
      { label: '自然さ', value: 80 },
    ],
  },
  {
    id: 'mood',
    topicBadge: '気分',
    streakLabel: '連続 12日',
    promptTitle: '今日の気分とその理由を書いてください',
    hint: '「今日は〜な気分でした」「なぜなら〜からです」「そのあと〜と思いました」などを使えます。',
    promptLabel: '感情と理由の関係が伝わるように、2〜4文で書いてください。',
    modelText:
      '今日は少し疲れていましたが、散歩をしたので気分がよくなりました。外の空気を吸うと、頭もすっきりすると思いました。',
    aiComment:
      '理由が入っていて良いです。最後のまとめの文もあるので、文章として自然です。',
    opinionSummary: '感情と理由の関係がはっきりしていて、読みやすい日誌になっています。',
    opinionGood: '最後に自分の気づきが入っていて、日誌らしさがあります。',
    opinionImprove: '時間の流れを表す接続語を1つ入れると、展開がさらに見やすくなります。',
    totalScore: 84,
    scores: [
      { label: '文法', value: 83 },
      { label: '語彙', value: 82 },
      { label: '展開', value: 85 },
      { label: '自然さ', value: 84 },
    ],
  },
];
