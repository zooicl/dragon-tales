import { ClubIcon, ClubMark, CourtArt, Mascot, MascotDuo } from './ClubArt';

export function ClubLanding({ savedName, onStart, onImport, onPlay }: { savedName?: string; onStart: () => void; onImport: () => void; onPlay: () => void }) {
  return <main className="club-landing">
    <section className="landing-hero">
      <div className="landing-hero-copy"><div className="season-label"><span/> GOYANG SONO · LITTLE FANS, BIG DREAMS</div><h1>우리의 즐거움은<br/><span>하늘을</span> 닮았어.</h1><p>쏘냐, 위냐와 함께라면 매일이 플레이 데이.<br/>친구를 돌보고, 멋진 슛을 쏘고, 새로운 세상을 만나요.</p><div className="landing-actions"><button className="primary" onClick={onStart}>{savedName ? '우리의 모험 이어하기' : '플레이 클럽 입장하기'}<ClubIcon name="arrow"/></button><button className="landing-import" onClick={onImport}>저장한 모험 가져오기 <span>↗</span></button></div><div className="landing-saved">{savedName ? <><span className="live-dot"/>{savedName}이 기다리고 있어요.</> : <><span className="live-dot"/>계정 없이, 누구나 함께할 수 있어요.</>}</div><div className="hero-edition"><span>01 / WELCOME TO OUR CLUB</span><i/><b>LET’S PLAY TOGETHER</b></div></div>
      <div className="landing-stage"><CourtArt/><span className="stage-watermark">SONO</span><div className="stage-badge"><ClubMark compact/><span>SKY IS<br/><b>THE LIMIT.</b></span></div><div className="hero-cheer">좋아하는 마음만 있으면, 준비 완료! <span>✦</span></div><MascotDuo/><div className="stage-score"><span>HOME</span><b>SSONYA <i>×</i> WINYA</b><span>ALWAYS ON YOUR SIDE</span></div><span className="stage-corner corner-tl"/><span className="stage-corner corner-br"/></div>
    </section>
    <div className="club-ticker" aria-hidden="true"><span>GO HIGH</span><i>✦</i><span>PLAY TOGETHER</span><i>✦</i><span>DREAM BIG</span><i>✦</i><span>GOYANG SONO</span><i>✦</i><span>GO HIGH</span></div>
    <section className="landing-discover"><div className="discover-heading"><div><span className="eyebrow">YOUR NEXT FAVORITE MOMENT</span><h2>좋아하는 마음으로, 함께 놀자.</h2></div><span>나만의 속도로 즐기는 플레이 클럽</span></div><div className="landing-feature-grid">
      <button className="landing-feature feature-friends" onClick={onStart}><div><span className="feature-number">01 · MAKE A FRIEND</span><h3>오늘부터, 우리 친구.</h3><p>작은 돌봄으로 마음을 키워요.</p><span className="feature-action">친구 만나기 <ClubIcon name="arrow"/></span></div><Mascot kind="winya"/></button>
      <button className="landing-feature feature-shoot" onClick={onPlay}><div><span className="feature-number">02 · TAKE YOUR SHOT</span><h3>너의 첫 번째 버저비터.</h3><p>쏘냐와 함께 별빛 슛에 도전!</p><span className="feature-action">코트로 가기 <ClubIcon name="arrow"/></span></div><span className="feature-basket"><ClubIcon name="play"/></span></button>
      <button className="landing-feature feature-explore" onClick={onStart}><div><span className="feature-number">03 · FIND YOUR WORLD</span><h3>코트 밖에도, 모험은 계속.</h3><p>발자국을 따라 새로운 세상으로.</p><span className="feature-action">모험 시작하기 <ClubIcon name="arrow"/></span></div><div className="feature-compass"><ClubIcon name="explore"/></div></button>
    </div></section>
    <footer className="club-landing-footer"><ClubMark/><span>DRAGON TALES · SONO CONCEPT EDITION</span><small>FAN-MADE PLAYGROUND / 2026</small></footer>
  </main>;
}

export function ClubHero({ onPlay }: { onPlay: () => void }) {
  return <section className="club-home-hero"><div className="home-hero-grid"/><div className="home-hero-copy"><span className="eyebrow">THE SKY IS OUR PLAYGROUND</span><h2>오늘도 같이,<br/><span>하늘 높이.</span></h2><p>쏘냐, 위냐와 함께하는 우리만의 플레이 데이.</p><button onClick={onPlay}>오늘의 슛 던지러 가기 <ClubIcon name="arrow"/></button></div><span className="home-hero-word">PLAY!</span><MascotDuo small/><div className="home-hero-stamp"><span>GOYANG</span><b>SONO</b><span>PLAY CLUB</span></div></section>;
}
