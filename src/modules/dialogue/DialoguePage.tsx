import { TrainingPagePlaceholder } from '../../shared/ui/TrainingPagePlaceholder';

export function DialoguePage() {
  return (
    <TrainingPagePlaceholder
      title="対話"
      intro="対話ページは跟読より複雑なので、今は route と shell だけを先に固定しています。AI 質問、録音応答、会話ログは次フェーズの対象です。"
      analysisSummary="ルーティングは完了していますが、multi-step dialogue flow とログ表示はまだ prototype に残っています。"
      pending={[
        'AI 質問再生と follow-up 切り替えの移植',
        '会話ログカードの実装',
        '録音応答の保存と再生',
        '対話レーダーと総括表示の移植',
      ]}
      phase3Focus={[
        'japanese_Conversation.html の question sequencing を切り出す',
        '録音フックを dialogue 用 UI に接続する',
        '長いログでも single-screen を維持できるか確認する',
      ]}
      rightTopBadge="音声予定"
    />
  );
}
