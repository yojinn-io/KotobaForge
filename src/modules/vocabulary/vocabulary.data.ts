export type VocabularyItem = {
  id: string;
  modeLabel: string;
  displayText: string;
  promptLabel: string;
  meaning: string;
  answer: string;
  accuracy: string;
  questionIndex: string;
  appearanceCount: string;
  historyNote: string;
  nextFocus: string;
  learnedAt: string;
};

export const vocabularyItems: VocabularyItem[] = [
  {
    id: 'eikyo',
    modeLabel: '漢字 → 読み',
    displayText: '影響',
    promptLabel: '読みを書いてください',
    meaning: '何らかのものが他のものに作用し、変化や結果をもたらすこと。',
    answer: 'えいきょう',
    accuracy: '3 / 4 (75%)',
    questionIndex: '4 / 12',
    appearanceCount: '出現 6回',
    historyNote: '読みは安定していますが、類義語との区別で少し迷いが残っています。',
    nextFocus: '次回は「影響する」とセットで短文確認。',
    learnedAt: '今週 +84',
  },
  {
    id: 'tassei',
    modeLabel: '読み → 漢字',
    displayText: 'たっせい',
    promptLabel: '漢字を書いてください',
    meaning: '目標や計画していたことをやり終えて、目的に届くこと。',
    answer: '達成',
    accuracy: '4 / 5 (80%)',
    questionIndex: '7 / 12',
    appearanceCount: '出現 4回',
    historyNote: '意味理解は良好ですが、送り仮名なしの漢字再現で少し揺れています。',
    nextFocus: '次回は「目標を達成する」の定型文で固定。',
    learnedAt: '今週 +62',
  },
  {
    id: 'kaizen',
    modeLabel: '語義 → 単語',
    displayText: '改善',
    promptLabel: '説明に合う単語を書いてください',
    meaning: '悪いところや不十分なところを、前より良い状態にすること。',
    answer: 'かいぜん',
    accuracy: '2 / 3 (67%)',
    questionIndex: '9 / 12',
    appearanceCount: '出現 5回',
    historyNote: '意味は取れていますが、音読みの再生で一拍ずれることがあります。',
    nextFocus: '説明から読みを引く練習をもう1セット。',
    learnedAt: '今週 +41',
  },
];
