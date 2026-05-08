export type AppRouteMeta = {
  id: 'home' | 'vocabulary' | 'sentence' | 'dictation' | 'shadowing' | 'dialogue' | 'diary';
  path: string;
  title: string;
  icon: string;
};

export const appRoutes: AppRouteMeta[] = [
  { id: 'home', path: '/', title: 'ホーム', icon: 'bi bi-grid-1x2-fill' },
  { id: 'vocabulary', path: '/vocabulary', title: '単語', icon: 'bi bi-type' },
  { id: 'sentence', path: '/sentence', title: '造句', icon: 'bi bi-pencil-square' },
  { id: 'diary', path: '/diary', title: '日誌', icon: 'bi bi-journal-text' },
  { id: 'dictation', path: '/dictation', title: '聴写', icon: 'bi bi-earbuds' },
  { id: 'shadowing', path: '/shadowing', title: '跟読', icon: 'bi bi-mic' },
  { id: 'dialogue', path: '/dialogue', title: '対話', icon: 'bi bi-chat-dots' },
  
];

export const trainingRoutes = appRoutes.filter((route) => route.id !== 'home');
