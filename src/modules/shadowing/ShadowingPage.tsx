import { TrainingPagePlaceholder } from '../../shared/ui/TrainingPagePlaceholder';

export function ShadowingPage() {
  return (
    <TrainingPagePlaceholder
      title="跟読"
      intro="跟読ページは音声比較のベースとして共通 shell に載りました。録音、波形表示、比較レーダーは次フェーズで prototype から段階的に移植します。"
      analysisSummary="MediaRecorder と waveform 比較は helper の初期版だけ作成済みで、UI 本体への統合はまだです。"
      pending={[
        '模範音声再生とゆっくり再生の移植',
        '録音開始 / 停止 / 再生 / 削除の接続',
        'モデル波形と自分の波形の表示',
        '現在セッション比較レーダーの移植',
      ]}
      phase3Focus={[
        'japanese_Shadowing.html の audio flow を component 化する',
        '録音権限と AudioContext の iPad 実機確認',
        '波形キャンバスのリサイズと非表示時 resize を確認する',
      ]}
      rightTopBadge="音声予定"
    />
  );
}
