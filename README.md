# Dragon Tales · 별빛섬의 비밀

어린이와 가족을 위한 한국어 드래곤 육성 웹게임입니다. React + TypeScript + Vite로 구현했습니다. 계정·결제·광고 없이 브라우저 IndexedDB에 저장합니다.

현재 UI는 **SONO PLAY CLUB · 쏘냐 & 위냐** 팬 콘셉트 에디션입니다. 쏘냐·위냐 SVG, 블루 클럽하우스, 새 자유투 아레나, 아이폰·아이패드 반응형 배치를 포함합니다. 디자인 방향·색상·화면 규칙·검증 기록은 [DESIGN.md](DESIGN.md)에 정리했습니다. 기존 드래곤 육성과 저장은 유지합니다.

플레이 주소: https://zooicl.github.io/dragon-tales/

## 실행

Node.js 22 이상을 설치한 뒤 이 폴더에서 실행합니다.

```sh
npm install
npm run dev
```

터미널에 출력된 주소를 여세요. 기본 주소는 http://localhost:5173 입니다.

```sh
npm run typecheck
npm test
npm run build
npm run preview
```

`dist/`가 배포할 정적 파일입니다. 게임에는 별도의 API 서버나 데이터베이스 서버가 필요하지 않습니다. 실제 서비스는 GitHub Pages로 제공할 수 있습니다.

## GitHub Pages 배포

**이 `dragon-tales` 폴더의 내용 전체를 저장소 루트에 올려 주세요.** `.github/` 숨김 폴더도 반드시 포함하세요. `node_modules/`와 `dist/`는 Git에 올리지 않습니다.

1. GitHub에서 새 저장소를 만듭니다. 무료 Pages를 이용한다면 공개 저장소로 만드세요.
2. Git이 설치된 터미널에서 이 폴더로 이동한 뒤 실행합니다. 아래 주소는 제공하신 `zooicl` 계정을 사용합니다. 먼저 GitHub에서 `dragon-tales` 저장소를 만드세요.

```sh
git init -b main
git add .
git commit -m "Create Dragon Tales game"
git remote add origin https://github.com/zooicl/dragon-tales.git
git push -u origin main
```

3. 저장소 **Settings → Pages → Build and deployment → Source → GitHub Actions**를 선택합니다.
4. **Actions → Test and deploy Dragon Tales → Run workflow**를 실행합니다. 이후에는 `main`에 push할 때마다 자동 배포됩니다.
5. 완료 후 배포 작업의 `github-pages` 링크로 접속합니다. 일반적인 주소는 `https://zooicl.github.io/dragon-tales/`입니다.

저장소 이름이 달라도 사용할 수 있도록 Vite 리소스 주소는 상대 경로로 설정했습니다. `.github/workflows/deploy.yml`은 타입 검사·테스트·빌드가 모두 성공한 뒤 배포합니다. PR에서는 검증만 실행합니다.

참고: [GitHub Pages 설정](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site), [Vite 정적 배포](https://vite.dev/guide/static-deploy).

## 이번 구현 범위

| 상태 | 내용 |
| --- | --- |
| 구현 | 숲·물방울·불꽃 알 선택, 1.8초 부화, 이름 짓기, 첫 이야기 |
| 구현 | SVG 드래곤 3종, 인사 대사, 호흡·날개·꼬리·교감 모션 |
| 구현 | 무제한 먹이·쓰다듬기·놀이·목욕·즉시 휴식, 5가지 상태 |
| 구현 | 명세 XP 계산, 레벨 30 상한, 레벨별 100코인, Lv.5 날개 성장 |
| 구현 | 돌봄 미션 3종과 중복 방지, 성격, 사건 당시 이름을 보존하는 앨범 |
| 구현 | 자유투 타이밍 44~58 판정, 공 비행, 결과와 재도전 |
| 구현 | 15초 과일 놀이, 점수별 XP·코인, 종료 시 일회 보상 |
| 구현 | 속삭이는 숲의 발자국 3개, 3초 힌트, 최초 보상과 재탐험 |
| 구현 | 이야기 3장면 재감상, 3번째 장면은 Lv.5부터 |
| 구현 | IndexedDB 저장, 직렬화된 쓰기, 실패 시 플레이 유지와 백업 경고 |
| 구현 | Zod 백업 검증, JSON 내보내기·가져오기, 2단계 초기화, 이름 변경 |
| 구현 | 모바일 하단 메뉴, 데스크톱 사이드 메뉴, 키보드, 모션 감소, 오류 경계 |
| 준비 중 | 하늘 날기, 숨바꼭질, 마법 정원, 동굴·호수·하늘 정원 |
| 준비 중 | NPC 친구, 마을 편집, 상점, 무지개·별빛 드래곤 |
| 준비 중 | 챕터 3~5 서사, 진화 선택, Lv.10 이상 전용 성장 연출, 엔딩 |
| 준비 중 | 감정별 30개 대사, 소라·윈디 별도 마스코트, 사운드, PWA |

첨부 명세의 '구현' 표기는 기존 제품의 설명으로 이해했으며, 이 폴더는 새로 작성한 구현입니다. 전체 로드맵을 완료한 버전은 아닙니다. 저장 객체도 문서의 복수 드래곤 모델을 단일 활성 드래곤에 맞춰 단순화했기 때문에 **다른 저장소에서 만든 기존 게임 저장 파일과 호환된다고 보장하지 않습니다.**

## 저장과 개인정보

- 저장 위치: IndexedDB `dragon-tales` → `saves` → `main-save`.
- 모든 변경을 순서대로 즉시 저장합니다. 명세의 debounce 대신 직렬 쓰기를 사용해 빠른 연속 행동의 덮어쓰기를 막습니다.
- 미접속 시 상태 감소가 없으며, 에너지 0에서도 놀 수 있습니다.
- 브라우저 데이터를 지우거나 다른 기기·다른 사이트 주소를 사용하면 저장이 이어지지 않습니다. 설정에서 JSON을 내려받아 가져오세요.
- 읽기 오류가 나면 원본 저장을 자동 삭제하지 않습니다. 새 모험을 만들거나 백업을 가져오면 현재 저장을 교체합니다.
- 쓰기 오류가 나면 이 창의 메모리로 계속 플레이하며 백업 경고를 유지합니다.
- 가져오기는 검증 성공 후 현재 게임을 교체합니다. 먼저 기존 추억을 내보내기를 권장합니다.
- 게임에는 분석 도구·외부 API·자동 오디오가 없습니다.

## 파일 구성

```text
src/
  App.tsx          화면, 온보딩, 돌보기, 설정
  Dragon.tsx       오리지널 SVG 드래곤
  Games.tsx        자유투, 과일, 숲 탐험
  game.ts          게임 규칙과 저장 스키마
  game.test.ts     성장·보상·검증 단위 테스트
  persistence.ts   IndexedDB 저장과 로드
  store.ts         Zustand 상태와 쓰기 직렬화
  main.tsx         오류 경계와 앱 진입
  styles.css       반응형 레이아웃과 모션
.github/workflows/deploy.yml
```

## 검증

2026-10-31 작업 기준: TypeScript 검사, Vitest 14개, Vite 프로덕션 빌드 통과. 브라우저에서 타이틀·알 선택·부화와 플레이 화면을 확인했습니다. 모바일 360×800·태블릿 768×1024·데스크톱 1440×900 전체 회귀 및 IndexedDB 차단 환경의 자동 E2E 검증은 아직 수행하지 않았습니다.

