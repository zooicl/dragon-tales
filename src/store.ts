import { create } from 'zustand';
import type { Save } from './game';
import { persist } from './persistence';
type Store = { save: Save | null; warning: string; setSave: (save: Save | null) => void; warn: (text: string) => void };
// Writes are serialized: rapid actions can never overwrite a newer save with an older one.
let writes = Promise.resolve();
export const useGame = create<Store>((set) => ({ save: null, warning: '', warn: warning => set({ warning }), setSave: save => {
  set({ save });
  writes = writes.then(() => persist(save)).catch(() => set({ warning: '지금은 이 창에서만 기억해요. 설정에서 추억을 백업해 주세요.' }));
} }));
