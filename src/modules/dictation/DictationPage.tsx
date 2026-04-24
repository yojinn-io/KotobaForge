import { TrainingPagePlaceholder } from '../../shared/ui/TrainingPagePlaceholder';

export function DictationPage() {
  return (
    <TrainingPagePlaceholder
      title="聴写"
      intro="聴写ページは手書き基盤に加えて TTS 再生コントロールが必要です。Phase 2 ではその受け皿になる shell と音声 helper を先に配置しました。"
      analysisSummary="音声再生、リプレイ回数、ヒント表示、正答確認はまだ prototype 側に残っています。"
      pending={[
        '再生 / もう一回 / ゆっくり の UI と動作移植',
        'リプレイ回数表示の接続',
        '聴写用手書き入力と自己判定フロー',
        '音声ベースの分析パネル移植',
      ]}
      phase3Focus={[
        'useSpeechPlayback を dictation 専用 UI に接続',
        'japanese_dictation.html の replay 状態管理を切り出す',
        'iPad Chrome で speechSynthesis の挙動を確認する',
      ]}
      rightTopBadge="音声 + 手書き"
    />
  );
}
