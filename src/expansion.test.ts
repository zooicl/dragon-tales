import { describe,it,expect } from 'vitest';
import { createSave, saveSchema } from './game';
import { completeRegion, harvest, placeBuilding, purchase, removeBuilding, restoreTree, visitFriend, friendshipLevel } from './expansion';
describe('v1 저장 자동 변환',()=>{
 it('이름과 성장, 코인, 추억을 보존하면서 v2 기본값을 추가한다',()=>{const old=createSave('fire','루비');const {friends,buildings,items,evolution,soundEnabled,fragments,treeRestored,lastHarvest,...base}=old;const migrated=saveSchema.parse({...base,schemaVersion:1});expect(migrated.schemaVersion).toBe(2);expect(migrated.name).toBe('루비');expect(migrated.coins).toBe(500);expect(migrated.album).toEqual(old.album);expect(migrated.buildings).toHaveLength(1);expect(migrated.friends).toHaveLength(3);});
 it('겹친 건물과 알 수 없는 버전을 거부한다',()=>{const s=createSave('forest','모모');expect(saveSchema.safeParse({...s,buildings:[s.buildings[0],s.buildings[0]]}).success).toBe(false);expect(saveSchema.safeParse({...s,schemaVersion:99}).success).toBe(false);});
 it('새 종족과 효과음, 스타일을 JSON 왕복 보존한다',()=>{const s=createSave('rainbow','레인');s.evolution='flower';s.soundEnabled=true;expect(saveSchema.parse(JSON.parse(JSON.stringify(s)))).toEqual(s);});
});
describe('마을 편집과 안전한 거래',()=>{
 it('배치 때만 코인을 차감하고 이동에는 차감하지 않는다',()=>{const s=createSave('forest','모모');const n=placeBuilding(s,'flowers',1,2);expect(n.coins).toBe(400);expect(s.buildings).toHaveLength(1);const b=n.buildings[1]!;const m=placeBuilding(n,'flowers',2,2,b.id);expect(m.coins).toBe(400);expect(m.buildings.find(x=>x.id===b.id)?.x).toBe(2);});
 it('점유 충돌과 격자 밖, 잔액 부족을 차단한다',()=>{const s=createSave('forest','모모');expect(()=>placeBuilding(s,'house',5,5)).toThrow();expect(()=>placeBuilding(s,'house',12,0)).toThrow();expect(()=>placeBuilding(s,'fountain',0,0)).toThrow();expect(s.coins).toBe(500);});
 it('회수 때 가격의 절반만 환불하며 재회수는 거부한다',()=>{const n=placeBuilding(createSave('forest','모모'),'tree',1,1);const b=n.buildings[1]!;const m=removeBuilding(n,b.id);expect(m.coins).toBe(400);expect(()=>removeBuilding(m,b.id)).toThrow();});
 it('열매를 최대 여섯 주기만 생산하며 같은 시각에 재수확하지 못한다',()=>{const n=placeBuilding(createSave('forest','모모'),'tree',1,1);const now=n.lastHarvest+300000*100;const h=harvest(n,now);expect(h.items.fruit).toBe(6);expect(()=>harvest(h,now)).toThrow();});
 it('상점 구매는 재화와 아이템을 한 번에 처리한다',()=>{const s=createSave('forest','모모');const n=purchase(s,'ball');expect(n.coins).toBe(400);expect(n.items.ball).toBe(1);expect(s.items.ball).toBeUndefined();expect(()=>purchase({...s,coins:5},'snack')).toThrow();});
});
describe('모든 탐험과 엔딩',()=>{
 it('레벨 1에서 모든 지역을 완주하고 다섯 조각을 모을 수 있다',()=>{let s=createSave('forest','모모');for(const r of ['forest','cave','lake','sky'] as const)s=completeRegion(s,r);expect(s.fragments).toHaveLength(5);expect(new Set(s.fragments).size).toBe(5);});
 it('같은 지역은 보상과 추억을 중복 지급하지 않는다',()=>{const n=completeRegion(createSave('forest','모모'),'cave');expect(completeRegion(n,'cave')).toEqual(n);});
 it('기존 숲 보상을 받은 사용자에게 조각만 보충한다',()=>{const s=createSave('forest','모모');s.claimedRewards.push('explore:whispering-footprints');const n=completeRegion(s,'forest');expect(n.coins).toBe(s.coins);expect(n.xp).toBe(s.xp);expect(n.fragments).toEqual(['forest:1']);});
 it('엔딩은 레벨 제한 없이 한 번만 보상한다',()=>{const s=restoreTree(createSave('forest','모모'));expect(s.treeRestored).toBe(true);expect(restoreTree(s)).toEqual(s);});
});
describe('친구 우정',()=>{it('우정 단계와 추억을 보존하고 상한을 지킨다',()=>{let s=createSave('forest','모모');for(let i=0;i<30;i++)s=visitFriend(s,'sora','play');expect(s.friends.find(f=>f.id==='sora')?.xp).toBe(140);expect(friendshipLevel(140)).toBe(5);expect(s.album.filter(m=>m.title.includes('소라와 우정 Lv.3'))).toHaveLength(1);});});
