import { describe, expect, it } from 'vitest';
import { care, createSave, isGoal, personality, reward, saveSchema, xpToNext } from './game';
describe('드래곤 성장', () => {
  it('남은 경험치를 보존하고 레벨마다 코인을 지급한다', () => { const n=reward(createSave('forest','초코'),65,0); expect(n.level).toBe(2);expect(n.xp).toBe(5);expect(n.coins).toBe(600); });
  it('한 번에 여러 레벨을 올리고 성장 추억을 남긴다', () => { const n=reward(createSave('forest','초코'),360,0);expect(n.level).toBe(5);expect(n.xp).toBe(0);expect(n.album.some(a=>a.title.includes('날개'))).toBe(true); });
  it('레벨 30에서 경험치를 제한한다', () => { const n=reward(createSave('water','별이'),100000,0);expect(n.level).toBe(30);expect(n.xp).toBe(xpToNext(30)); });
});
describe('부담 없는 돌봄과 일회 보상', () => {
  it('원본을 바꾸지 않으며 간식은 무제한이다', () => { const s=createSave('fire','루비'); let n=s;for(let i=0;i<20;i++)n=care(n,'feed');expect(s.stats.fullness).toBe(75);expect(n.stats.fullness).toBe(100);expect(n.missions.feed).toBe(3);expect(n.claimedRewards.filter(k=>k==='mission:feed3')).toHaveLength(1);expect(n.album.filter(a=>a.title.includes('사과'))).toHaveLength(1); });
  it('체력 0에서도 놀고 모든 수치를 0~100으로 유지한다',()=>{let s=createSave('forest','모모');for(let i=0;i<50;i++)s=care(s,'play');expect(s.stats.energy).toBe(0);expect(s.stats.happiness).toBe(100);expect(s.stats.bond).toBe(100);});
  it('탐험 보상은 한 번만 지급한다',()=>{const a=reward(createSave('forest','초코'),25,40,'forest');const b=reward(a,25,40,'forest');expect(b).toEqual(a);});
  it('성격 동점에서는 장난꾸러기를 우선한다',()=>{const s=care(care(createSave('forest','모모'),'pet'),'play');expect(personality(s)).toBe('장난꾸러기');});
  it('부화와 최초 식사 당시 이름을 보존한다',()=>{const s=care(createSave('forest','초코'),'feed');s.name='별이';expect(s.album.every(a=>a.name==='초코')).toBe(true);});
});
describe('저장 검증',()=>{
  it('올바른 저장을 JSON 왕복 복원한다',()=>{const s=createSave('water','아쿠아');expect(saveSchema.parse(JSON.parse(JSON.stringify(s)))).toEqual(s);});
  it.each(['','   ','가'.repeat(13)])('잘못된 이름 %s을 거부한다',name=>{expect(saveSchema.safeParse({...createSave('forest','초코'),name}).success).toBe(false);});
  it('오염된 수치와 알 수 없는 버전을 거부한다',()=>{const s=createSave('forest','모모');expect(saveSchema.safeParse({...s,coins:-1}).success).toBe(false);expect(saveSchema.safeParse({...s,schemaVersion:2}).success).toBe(false);expect(saveSchema.safeParse({...s,stats:{...s.stats,energy:Infinity}}).success).toBe(false);});
});
describe('자유투 판정',()=>{it('44~58 양 끝을 포함한다',()=>{expect(isGoal(44)).toBe(true);expect(isGoal(58)).toBe(true);expect(isGoal(43.9)).toBe(false);expect(isGoal(58.1)).toBe(false);});});
