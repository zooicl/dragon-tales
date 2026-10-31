import { useId } from 'react';

export type MascotKind = 'ssonya' | 'winya';

/** Game-ready vector interpretations of the Ssonya/Winya visual references. */
export function Mascot({ kind, className = '', cheering = false }: { kind: MascotKind; className?: string; cheering?: boolean }) {
  const id = useId().replaceAll(':', '');
  const mouse = kind === 'winya';
  return <svg className={`club-mascot ${mouse ? 'winya' : 'ssonya'} ${className} ${cheering ? 'cheering' : ''}`} viewBox="0 0 360 390" role="img" aria-label={mouse ? '위냐, 미니 골대를 든 흰색 생쥐 친구' : '쏘냐, 농구공을 든 하늘색 고양이 친구'}>
    <defs><linearGradient id={`${id}-fur`} x1="0" x2=".8" y2="1"><stop stopColor={mouse ? '#ffffff' : '#a8d9f2'}/><stop offset="1" stopColor={mouse ? '#e9f3fb' : '#70b6df'}/></linearGradient><linearGradient id={`${id}-jersey`} x2=".3" y2="1"><stop stopColor="#52b1df"/><stop offset="1" stopColor="#2684be"/></linearGradient></defs>
    <ellipse cx="178" cy="364" rx={mouse ? 103 : 117} ry="15" fill="#082b5b" opacity=".13"/>
    <g className="mascot-body" stroke="#153756" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round">
      {mouse ? <>
        <path d="M277 302q38 24 39-4m-10 10q25 14 31-5" fill="none"/>
        <ellipse cx="137" cy="349" rx="31" ry="11" fill="#fff"/><ellipse cx="226" cy="349" rx="31" ry="11" fill="#fff"/>
        <circle cx="123" cy="119" r="49" fill="#fff"/><circle cx="250" cy="120" r="49" fill="#fff"/>
        <circle cx="123" cy="119" r="31" fill="#9ccce8" stroke="none"/><circle cx="250" cy="120" r="31" fill="#9ccce8" stroke="none"/>
        <path d="M111 164Q66 204 78 280q10 70 104 69 104 2 109-73 7-66-38-110-63-45-142-2Z" fill={`url(#${id}-fur)`}/>
        <path d="M95 236q-40-6-49-39-3-17 11-21 19-4 30 23" fill="#fff"/>
        <path d="M258 256q-25 12-11 30 13 13 29-3" fill="#fff"/>
        <path d="M147 194l13 5m61-5-12 5" fill="none" strokeWidth="4"/>
        <ellipse cx="155" cy="216" rx="5" ry="6" fill="#153756" stroke="none"/><ellipse cx="218" cy="216" rx="5" ry="6" fill="#153756" stroke="none"/>
        <path d="M174 225q12 10 24 0m-12 7v4" fill="none" strokeWidth="4"/>
        <path d="M167 236q0 36 19 37 20-1 21-37l-11 4-10-5-9 6Z" fill="#f3b8a6" strokeWidth="4"/>
        <ellipse cx="130" cy="232" rx="13" ry="7" fill="#f3c7bc" stroke="none"/><ellipse cx="245" cy="232" rx="13" ry="7" fill="#f3c7bc" stroke="none"/>
        <g opacity=".65" stroke="#8fc3e5" strokeWidth="2.5" fill="none"><path d="m170 306 16-16 17 16-17 26Z"/><path d="M176 308h21m-11-18v42m-22-28 22 36 23-36"/></g>
        <g className="mascot-prop"><path d="M57 176v53" stroke="#a5c1d9" strokeWidth="7"/><circle cx="61" cy="161" r="37" fill="#b4d3f0" fillOpacity=".75" strokeWidth="4"/><path d="m37 153 45-2-3 14-43 2" fill="none" stroke="#ed8f8b" strokeWidth="7"/><path d="m42 171 6 21h23l7-24M48 176l23 16m-21 0 21-19" stroke="#fff" strokeWidth="2" fill="none"/></g>
      </> : <>
        <path d="M246 283q61 1 46-48-8-21 8-34 25 24 20 55-4 44-71 53" fill="#84c5e7"/>
        <path d="M116 278l-9 58q2 26 40 25 24-3 26-23l-3-57M194 286l3 51q1 24 38 20 25-4 24-24l-13-53" fill={`url(#${id}-fur)`}/>
        <path d="m107 337 65-2m25 0 60-4" fill="none" stroke="#fff" strokeWidth="13"/>
        <path d="M114 213q-14 35-6 104l69 10 80-16q2-58-20-101Z" fill={`url(#${id}-jersey)`}/>
        <path d="m115 218 16 13m105-17-15 16M112 305l65 11 78-15" stroke="#d4ecfa" strokeWidth="8" fill="none"/>
        <path d="M151 215q28 20 54-1" stroke="#173b60" strokeWidth="10" fill="none"/>
        <text x="180" y="264" stroke="none" fill="#153b61" fontFamily="Arial, sans-serif" fontWeight="900" fontSize="26" textAnchor="middle" letterSpacing="-2">SONO</text><text x="179" y="299" stroke="none" fill="#e5f4fe" fontFamily="Arial, sans-serif" fontWeight="900" fontSize="31" textAnchor="middle">23</text>
        <g className="mascot-prop"><circle cx="75" cy="268" r="41" fill="#e9a277" strokeWidth="5"/><path d="m40 247 72 40M48 299q4-35 50-58M73 228q-16 47 24 76M35 267q46 16 80-5" fill="none" strokeWidth="3.5"/></g>
        <path d="M111 236q-24-17-41-12-15 5-9 20 8 15 31 7" fill="#fff"/>
        <path d="M232 251q-12-24-29-11l-24 24q-11 13 1 25 10 10 23 1l30-22" fill="#fff"/>
        <path d="M75 151q-2-53 49-105 14-12 28 9l29 38 24-39q12-19 26-8 58 49 62 105 5 58-105 66-108-1-113-66Z" fill={`url(#${id}-fur)`}/>
        <path d="m104 91 23-27 24 34ZM205 97l23-33 27 29Z" fill="#ecc0aa" strokeWidth="4"/>
        <path d="m149 113 11 3m56-3-11 3" strokeWidth="4" fill="none"/>
        <ellipse cx="155" cy="134" rx="5.5" ry="7" fill="#153756" stroke="none"/><ellipse cx="211" cy="134" rx="5.5" ry="7" fill="#153756" stroke="none"/>
        <path d="M82 165q39-26 102-20 58-3 103 20-15 44-100 47-82-4-105-47" fill="#fff" stroke="none"/>
        <path d="m83 141 27 4m-23 20 22-4m153-15 28-3m-29 20 24 5" strokeWidth="4"/>
        <path d="m173 149 11 6 10-6" fill="#153756" strokeWidth="2"/>
        <path d="M162 158q2 35 24 35 21-1 24-35l-13 5-12-6-11 6Z" fill="#f3b8a6" strokeWidth="4"/>
        <path d="M129 185q-8-7-12-1m127 0q-6-6-12 1" fill="none" stroke="#dbb3ad" strokeWidth="3"/>
      </>}
    </g>
  </svg>;
}

export function ClubMark({ compact = false }: { compact?: boolean }) {
  return <span className={`club-mark ${compact ? 'compact' : ''}`}><svg viewBox="0 0 48 48" aria-hidden="true"><path d="m24 4 14 11-4 19-10 11L14 34 10 15Z" fill="none" stroke="currentColor" strokeWidth="2"/><path d="m24 9 9 9-9 18-9-18Zm0 0v27M8 16l-5-3 9 21m28-18 5-3-9 21M17 19h14M14 25h20" fill="none" stroke="currentColor" strokeWidth="2"/></svg>{!compact && <span><b>SONO</b><small>PLAY CLUB</small></span>}</span>;
}

export function MascotDuo({ small = false }: { small?: boolean }) {
  return <div className={`mascot-duo ${small ? 'small' : ''}`}><div className="mascot-spotlight"/><Mascot kind="ssonya"/><Mascot kind="winya"/><span className="duo-label label-ssonya">쏘냐 <small>SSONYA</small></span><span className="duo-label label-winya">위냐 <small>WINYA</small></span></div>;
}

export function CourtArt({ className = '' }: { className?: string }) {
  return <svg className={`court-art ${className}`} viewBox="0 0 760 560" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><defs><linearGradient id="court-haze" x2="0" y2="1"><stop stopColor="#0f2d53"/><stop offset="1" stopColor="#347bb0"/></linearGradient><linearGradient id="court-floor" x2="0" y2="1"><stop stopColor="#a7d3f0"/><stop offset="1" stopColor="#e6f2fb"/></linearGradient></defs><path fill="url(#court-haze)" d="M0 0h760v560H0z"/>
    <g opacity=".12" fill="#9ed7ff"><path d="M20 0h100l200 460H55Z"/><path d="M640 0h100L700 460H450Z"/></g><path d="M0 370h760v190H0Z" fill="url(#court-floor)"/>
    <g fill="none" stroke="#ddf1ff" opacity=".25"><path d="M-50 325Q380 170 810 325M-50 345Q380 190 810 345M-50 365Q380 210 810 365"/>{Array.from({length:27},(_,i)=><path key={i} d={`M${i*31-30} 290v78`}/>)}</g>
    <g stroke="#fff" strokeWidth="2" fill="none" opacity=".7"><path d="m230 370-150 190m450-190 150 190M0 505h760M295 370l-45 120h260l-45-120"/><ellipse cx="380" cy="490" rx="130" ry="32"/><path d="M0 390q380 215 760 0"/></g><g transform="translate(297 169)"><path d="M83 90v110" stroke="#0b2849" strokeWidth="13"/><rect width="166" height="104" rx="7" fill="#f0f8fd" fillOpacity=".7" stroke="#c1e7ff" strokeWidth="5"/><path d="M57 55h52v43H57Z" fill="none" stroke="#fff" strokeWidth="4"/><ellipse cx="83" cy="103" rx="33" ry="7" fill="none" stroke="#ef9b72" strokeWidth="6"/><path d="m54 109 9 44h41l9-44m-51 2 41 42m-38 0 40-44m-45 21h47" stroke="#fff" fill="none" strokeWidth="2"/></g>
    <g fill="#e5f4ff" opacity=".65">{[75,230,380,530,685].map(x=><g key={x}><circle cx={x} cy="49" r="4"/><path d={`m${x-18} 34 18-9 18 9`} fill="none" stroke="#94c5ed"/></g>)}</g><text x="380" y="120" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="12" fontWeight="bold" letterSpacing="9" fill="#c5e2f8" opacity=".4">GOYANG SONO ARENA</text>
  </svg>;
}

export function ClubIcon({ name, className = '' }: { name: string; className?: string }) {
  const paths: Record<string, React.ReactNode> = {
    home: <><path d="m3 11 9-8 9 8M5 10v11h14V10"/><path d="M9 21v-7h6v7"/></>,
    explore: <><circle cx="12" cy="12" r="9"/><path d="m16 8-2 6-6 2 2-6Z"/></>,
    play: <><circle cx="12" cy="12" r="9"/><path d="m6 5 12 14M4 15l16-6M9 3q-5 12 8 17M4 7q12-3 16 10"/></>,
    village: <><path d="M3 21h18M5 21V9l7-5 7 5v12M9 21v-7h6v7M3 9h18"/></>,
    album: <><rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 3v18M12 8h5M12 12h5M12 16h3"/></>,
    feed: <><path d="M12 7C5 2 1 9 5 17q7 9 14-2c3-8-3-11-7-8Z"/><path d="M12 7q-2-5 4-5"/></>,
    pet: <path d="M20 5c-4-4-8 1-8 1S8 1 4 5c-6 6 8 16 8 16S26 11 20 5Z"/>,
    bath: <><path d="M3 12h18l-2 7H5ZM6 19v2m12-2v2"/><circle cx="7" cy="7" r="2"/><circle cx="14" cy="4" r="2"/><circle cx="18" cy="9" r="1"/></>,
    rest: <path d="M20 15A9 9 0 0 1 9 3 9 9 0 1 0 20 15Z"/>,
    settings: <><circle cx="12" cy="12" r="3"/><path d="m10 3-1 3-3 1-3-1-1 4 2 2-1 3 3 3 3-1 3 3 3-2 3 1 2-4-2-3 1-3-3-3-3 1Z"/></>,
    arrow: <><path d="M5 12h14m-6-6 6 6-6 6"/></>,
    star: <path d="m12 2 3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1Z"/>,
  };
  return <svg className={`club-icon ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name] ?? paths.play}</svg>;
}
