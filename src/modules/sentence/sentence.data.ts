export type SentenceItem = {
  id: string;
  grammarLabel: string;
  promptTitle: string;
  explanation: string;
  promptLabel: string;
  modelAnswer: string;
  aiComment: string;
  accuracy: string;
  questionIndex: string;
  grammarCheck: string;
  particleCheck: string;
  naturalness: string;
  completeness: string;
};

export const sentenceItems: SentenceItem[] = [
  {
    id: 'wake-dewa-nai',
    grammarLabel: 'N3 〜わけではない',
    promptTitle: '旅行が好きですが、毎回行けるわけではない',
    explanation:
      '全面的にそうだと断定するのではなく、「必ずしもそうではない」と一部否定する表現です。',
    promptLabel: '指定文法を使って、状況に合う1文を書いてください。',
    modelAnswer: 'お金があれば旅行したいですが、毎回行けるわけではありません。',
    aiComment: '文法の意味は合っています。条件をもう少し具体的にすると自然さが上がります。',
    accuracy: '2 / 3 (67%)',
    questionIndex: '3 / 8',
    grammarCheck: '部分否定の意味は保持できています。',
    particleCheck: '逆接の「が」は自然ですが、後半を少し整理できます。',
    naturalness: '条件節を先に置くとさらに滑らかです。',
    completeness: '一文として成立しています。',
  },
  {
    id: 'naikoto-wa-nai',
    grammarLabel: 'N2 〜ないことはない',
    promptTitle: 'この店のラーメンは辛いが、食べられないことはない',
    explanation:
      '完全な否定ではなく、「条件しだいで可能だ」という控えめな肯定を表します。',
    promptLabel: '意味のニュアンスが伝わるように1文で書いてください。',
    modelAnswer: 'このラーメンはかなり辛いですが、食べられないことはありません。',
    aiComment: 'ニュアンスは合っています。程度を表す副詞が入ると説得力が増します。',
    accuracy: '3 / 4 (75%)',
    questionIndex: '5 / 8',
    grammarCheck: '否定をやわらげる使い方は正しいです。',
    particleCheck: '主題と対比は安定しています。',
    naturalness: '「かなり」などの副詞を入れるとより自然です。',
    completeness: '意味の切れ目ははっきりしています。',
  },
  {
    id: 'kamoshirenai',
    grammarLabel: 'N3 〜かもしれない',
    promptTitle: '雨が降るかもしれないので、早く帰ったほうがいい',
    explanation:
      '十分な確信はないけれど可能性がある、と控えめに推量するときに使う表現です。',
    promptLabel: '推量の理由も含めて1文でまとめてください。',
    modelAnswer: '空が暗いので、雨が降るかもしれないから早く帰ったほうがいいです。',
    aiComment: '意味は自然です。理由を先に出せているので、論理の流れも見えやすいです。',
    accuracy: '4 / 5 (80%)',
    questionIndex: '6 / 8',
    grammarCheck: '推量の使い方は安定しています。',
    particleCheck: '接続も大きく崩れていません。',
    naturalness: '結論部分はかなり自然です。',
    completeness: '理由から助言まで一文で完結しています。',
  },
];
