import { memory, reward, type Save } from './game';
export const buildings = {
  house: {name:'드래곤 집',icon:'🏡',price:300}, flowers:{name:'꽃밭',icon:'🌷',price:100}, tree:{name:'과일나무',icon:'🌳',price:200},
  playground:{name:'놀이터',icon:'🛝',price:400},pond:{name:'연못',icon:'🪷',price:250},fountain:{name:'별빛 분수',icon:'⛲',price:800},
};
export type BuildingKind = keyof typeof buildings;
export function placeBuilding(s:Save,kind:BuildingKind,x:number,y:number,moveId?:string):Save {
  if(!Number.isInteger(x)||!Number.isInteger(y)||x<0||y<0||x>11||y>11)throw new Error('마을 안의 칸을 골라 주세요.');
  if(s.buildings.some(b=>b.x===x&&b.y===y))throw new Error('이미 친구의 공간이 있어요. 빈 칸을 골라 주세요.');
  const n=structuredClone(s);
  if(moveId){const b=n.buildings.find(b=>b.id===moveId);if(!b)throw new Error('옮길 건물을 다시 골라 주세요.');b.x=x;b.y=y;}
  else {if(n.coins<buildings[kind].price)throw new Error('코인이 조금 더 필요해요. 놀이로 모아 볼까요?');n.coins-=buildings[kind].price;const now=Date.now();n.buildings.push({id:crypto.randomUUID(),kind,x,y,...kind==='tree'?{harvestAt:now}:{}});if(kind==='tree')n.lastHarvest=now;}
  return n;
}
export function removeBuilding(s:Save,id:string):Save {const b=s.buildings.find(b=>b.id===id);if(!b)throw new Error('회수할 건물을 골라 주세요.');const n=structuredClone(s);n.buildings=n.buildings.filter(b=>b.id!==id);n.coins+=Math.floor(buildings[b.kind].price/2);return n;}
export function harvest(s:Save,now=Date.now()):Save {const n=structuredClone(s);let amount=0;for(const b of n.buildings){if(b.kind!=='tree')continue;const at=b.harvestAt??s.lastHarvest;if(!at)continue;const elapsed=Math.max(0,now-at);const periods=Math.min(6,Math.floor(elapsed/300000));if(periods){amount+=periods;b.harvestAt=now-elapsed%300000;}}if(!amount)throw new Error('나무가 자라고 있어요. 5분마다 열매가 열려요.');n.items.fruit=(n.items.fruit??0)+amount;n.lastHarvest=now;return n;}
export const regions = {
  forest:{name:'속삭이는 숲',icon:'🌳',task:'발자국 세 개를 찾아요.',fragments:['forest:1'],key:'explore:whispering-footprints'},
  cave:{name:'반짝이는 동굴',icon:'💎',task:'수정을 순서대로 밝혀요.',fragments:['cave:1','cave:2'],key:'explore:cave'},
  lake:{name:'별빛 호수',icon:'🌌',task:'다섯 별을 이어 별자리를 만들어요.',fragments:['lake:1'],key:'explore:lake'},
  sky:{name:'하늘 정원',icon:'☁️',task:'친구들과 구름 길을 건너요.',fragments:['sky:1'],key:'explore:sky'},
};
export type Region=keyof typeof regions;
export function completeRegion(s:Save,region:Region):Save {const r=regions[region];const claimed=s.claimedRewards.includes(r.key);const n=reward(s,region==='forest'?25:40,region==='forest'?40:50,r.key);n.fragments=[...new Set([...n.fragments,...r.fragments])] as Save['fragments'];if(!claimed){n.personality.brave+=2;memory(n,`${r.name}에서 별빛을 찾았어요`);}return n;}
export function restoreTree(s:Save):Save {if(s.treeRestored)return structuredClone(s);const n=reward(s,100,100,'ending:tree');n.treeRestored=true;memory(n,'우리가 함께 되살린 별빛 나무');return n;}
export const friendInfo={sora:{name:'소라',kind:'water',icon:'💧'},windy:{name:'윈디',kind:'forest',icon:'🌿'},lumi:{name:'루미',kind:'starlight',icon:'⭐'}} as const;
export const friendshipLevel=(xp:number)=>[0,20,50,90,140].filter(n=>xp>=n).length;
export function visitFriend(s:Save,id:keyof typeof friendInfo,action:'play'|'gift'|'visit'):Save {const n=reward(s,action==='play'?8:5,0);let f=n.friends.find(f=>f.id===id);if(!f){f={id,xp:0};n.friends.push(f);}const before=friendshipLevel(f.xp);f.xp=Math.min(140,f.xp+(action==='gift'?15:10));n.personality.caring+=2;if(before<3&&friendshipLevel(f.xp)>=3)memory(n,`${friendInfo[id].name}와 우정 Lv.3!`);return n;}
export function purchase(s:Save,id:'ball'|'ribbon'|'snack'):Save {const price={ball:100,ribbon:150,snack:10}[id];if(s.coins<price)throw new Error('코인을 조금 더 모아 주세요.');const n=structuredClone(s);n.coins-=price;n.items[id]=(n.items[id]??0)+1;return n;}
