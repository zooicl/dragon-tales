import { z } from 'zod';
export const species = {
  forest: { name: '숲 드래곤', nickname: '모모', color: '#8ad5e5', accent: '#a9d66e', description: '작은 잎사귀로 마음을 전하는 다정한 친구', icon: '🌿' },
  water: { name: '물방울 드래곤', nickname: '아쿠아', color: '#95ccf3', accent: '#ad9aef', description: '맑은 물방울처럼 호기심 가득한 친구', icon: '💧' },
  fire: { name: '불꽃 드래곤', nickname: '루비', color: '#ffa28b', accent: '#ffd66d', description: '따뜻한 불꽃으로 용기를 나누는 친구', icon: '🔥' },
};
export type Species = keyof typeof species;
export const statLabels = { fullness: '배부름', happiness: '행복', energy: '체력', cleanliness: '청결', bond: '친밀도' };
const stat = z.number().min(0).max(100);
export const saveSchema = z.object({
  schemaVersion: z.literal(1), name: z.string().trim().min(1).max(12), species: z.enum(['forest', 'water', 'fire']),
  level: z.number().int().min(1).max(30), xp: z.number().min(0).max(640), coins: z.number().int().nonnegative(),
  stats: z.object({ fullness: stat, happiness: stat, energy: stat, cleanliness: stat, bond: stat }),
  personality: z.object({ playful: z.number().nonnegative(), affectionate: z.number().nonnegative(), brave: z.number().nonnegative(), caring: z.number().nonnegative() }),
  missions: z.object({ feed: z.number().int().min(0).max(3), pet: z.number().int().min(0).max(3), play: z.number().int().min(0).max(3) }),
  claimedRewards: z.array(z.string()), album: z.array(z.object({ id: z.string(), name: z.string(), title: z.string(), at: z.number() })),
  reducedMotion: z.boolean(), lastInteraction: z.number(),
});
export type Save = z.infer<typeof saveSchema>;
export type Action = 'feed' | 'pet' | 'play' | 'bath' | 'rest';
export const actions: Record<Action, { label: string; icon: string; xp: number; delta: Partial<Save['stats']>; message: string }> = {
  feed: { label: '먹이 주기', icon: '🍎', xp: 5, delta: { fullness: 20 }, message: '아삭아삭! 정말 맛있어!' },
  pet: { label: '쓰다듬기', icon: '💛', xp: 2, delta: { happiness: 5, bond: 2 }, message: '네 손길은 햇살처럼 따뜻해.' },
  play: { label: '놀아주기', icon: '🎾', xp: 10, delta: { happiness: 15, energy: -10, bond: 3 }, message: '너랑 노는 시간이 제일 좋아!' },
  bath: { label: '목욕하기', icon: '🫧', xp: 5, delta: { cleanliness: 25, happiness: 3 }, message: '보글보글, 반짝반짝해졌어!' },
  rest: { label: '푹 쉬기', icon: '🌙', xp: 2, delta: { energy: 30, happiness: 2 }, message: '포근하게 쉬었더니 힘이 나!' },
};
export const xpToNext = (level: number) => 40 + level * 20;
export function memory(s: Save, title: string): void { s.album.unshift({ id: crypto.randomUUID(), name: s.name, title, at: Date.now() }); }
export function createSave(kind: Species, name: string): Save {
  const s: Save = { schemaVersion: 1, name: name.trim(), species: kind, level: 1, xp: 0, coins: 500, stats: { fullness: 75, happiness: 75, energy: 80, cleanliness: 80, bond: 10 }, personality: { playful: 0, affectionate: 0, brave: 0, caring: 0 }, missions: { feed: 0, pet: 0, play: 0 }, claimedRewards: ['onboarding:hatch'], album: [], reducedMotion: false, lastInteraction: Date.now() };
  memory(s, '알을 깨고 만난 우리'); memory(s, `${s.name}, 너의 이름을 불러 줄게`); return saveSchema.parse(s);
}
export function reward(source: Save, xp: number, coins: number, key?: string): Save {
  const s = structuredClone(source);
  if (key && s.claimedRewards.includes(key)) return s;
  if (key) s.claimedRewards.push(key);
  s.xp += xp; s.coins += coins;
  while (s.level < 30 && s.xp >= xpToNext(s.level)) { s.xp -= xpToNext(s.level); s.level++; s.coins += 100; memory(s, s.level === 5 ? '작은 날개가 훌쩍 자랐어요!' : `레벨 ${s.level}, 함께 자라는 마음`); }
  if (s.level === 30) s.xp = Math.min(s.xp, xpToNext(30));
  return s;
}
export function care(source: Save, action: Action): Save {
  const s = reward(source, actions[action].xp, 0); s.lastInteraction = Date.now();
  for (const [key, value] of Object.entries(actions[action].delta)) { const k = key as keyof Save['stats']; s.stats[k] = Math.min(100, Math.max(0, s.stats[k] + value)); }
  if (action === 'pet') s.personality.affectionate += 2;
  if (action === 'play') s.personality.playful += 2;
  if (action === 'feed' && !s.claimedRewards.includes('memory:first-feed')) { memory(s, '처음 함께 먹은 달콤한 사과'); s.claimedRewards.push('memory:first-feed'); }
  if (action === 'feed' || action === 'pet' || action === 'play') {
    s.missions[action] = Math.min(3, s.missions[action] + 1);
    const key = `mission:${action}3`;
    if (s.missions[action] === 3 && !s.claimedRewards.includes(key)) { s.coins += action === 'play' ? 50 : 30; s.claimedRewards.push(key); }
  }
  return s;
}
export function personality(s: Save): string {
  const keys = ['playful', 'affectionate', 'brave', 'caring'] as const;
  const winner = keys.reduce((a, b) => s.personality[b] > s.personality[a] ? b : a);
  return { playful: '장난꾸러기', affectionate: '애교쟁이', brave: '용감한 탐험가', caring: '다정한 수호자' }[winner];
}
export const isGoal = (value: number) => value >= 44 && value <= 58;
