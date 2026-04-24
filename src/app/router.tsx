import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { HomePage } from '../modules/home/HomePage';
import { VocabularyPage } from '../modules/vocabulary/VocabularyPage';
import { SentencePage } from '../modules/sentence/SentencePage';
import { DictationPage } from '../modules/dictation/DictationPage';
import { ShadowingPage } from '../modules/shadowing/ShadowingPage';
import { DialoguePage } from '../modules/dialogue/DialoguePage';
import { DiaryPage } from '../modules/diary/DiaryPage';

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/vocabulary" element={<VocabularyPage />} />
        <Route path="/sentence" element={<SentencePage />} />
        <Route path="/dictation" element={<DictationPage />} />
        <Route path="/shadowing" element={<ShadowingPage />} />
        <Route path="/dialogue" element={<DialoguePage />} />
        <Route path="/diary" element={<DiaryPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
