import { useId } from 'react';
import { species, type Species } from './game';
import { useGame } from './store';
export function Dragon({ kind, name, level = 1, happy = true }: { kind: Species; name: string; level?: number; happy?: boolean }) {
  const id = useId().replace(/:/g, ''); const p = species[kind];
  const evolution=useGame(s=>s.save?.evolution??'star');
  const age=level===30?'guardian':level>=20?'adult':level>=10?'teen':level>=5?'child':'baby';
  return <svg className={`dragon dragon-${age} style-${evolution}`} viewBox="0 0 400 350" role="img" aria-label={`${name}, ${happy ? '행복한' : '편안한'} ${p.name}, ${age} 단계`}>
    <defs><linearGradient id={id} x2="0.7" y2="1"><stop stopColor="#d9f5f7"/><stop offset="1" stopColor={p.color}/></linearGradient></defs>
    <ellipse cx="205" cy="318" rx="109" ry="15" fill="#3b7b6720"/>
    <g className="dragon-body" stroke="#294d64" strokeWidth="5" strokeLinejoin="round">
      <path className="tail" d="M256 264 Q347 292 346 224 Q365 273 329 294 Q293 319 254 289" fill={p.color}/>
      <path className="wing" d={level>=10?'M265 217 Q322 95 365 118 L351 187 L323 178 L301 225 L280 252Z':level >= 5 ? 'M269 208 Q325 122 348 153 L336 207 L304 199 L289 237Z' : 'M266 213 Q309 158 326 180 L320 222 L295 211 L288 241Z'} fill={p.accent}/>
      <path d="M134 201 Q103 250 126 297 Q182 325 258 298 Q286 264 258 207Z" fill={`url(#${id})`}/>
      <ellipse cx="197" cy="270" rx="49" ry="43" fill="#fff5d7" stroke="none"/>
      <path d="M141 285 Q113 281 112 306 Q130 326 159 307 M239 287 Q268 280 275 304 Q258 325 234 309" fill={p.color}/>
      <path d="M133 217 Q99 222 111 246 Q130 256 147 238 M258 216 Q291 220 279 245 Q260 256 245 237" fill={p.color}/>
      <path d="M133 117 Q105 62 135 49 Q158 71 160 104 M242 107 Q252 53 276 59 Q285 93 269 127" fill={p.accent}/>
      <path d="M115 139 Q111 89 183 91 Q263 81 284 144 L291 186 Q283 232 202 235 Q124 237 108 198Z" fill={`url(#${id})`}/>
      <path d="M180 93 Q168 53 189 45 Q205 65 202 91 M202 91 Q217 59 234 70 L224 96" fill={p.accent}/>
      <ellipse cx="155" cy="163" rx="15" ry="23" fill="#173f65" stroke="none"/><ellipse cx="245" cy="163" rx="15" ry="23" fill="#173f65" stroke="none"/>
      <ellipse cx="159" cy="155" rx="5" ry="8" fill="white" stroke="none"/><ellipse cx="249" cy="155" rx="5" ry="8" fill="white" stroke="none"/>
      <ellipse cx="134" cy="190" rx="17" ry="9" fill="#ffb7af" stroke="none"/><ellipse cx="266" cy="190" rx="17" ry="9" fill="#ffb7af" stroke="none"/>
      <path d={happy ? 'M181 192 Q201 216 222 191' : 'M186 200 Q200 204 215 200'} fill={happy ? '#ed8e94' : 'none'} strokeWidth="4" strokeLinecap="round"/>
      <circle cx="184" cy="181" r="2" fill="#294d64" stroke="none"/><circle cx="216" cy="181" r="2" fill="#294d64" stroke="none"/>
      {level >= 10 && <path d="M185 110 L199 97 L213 110 L199 123Z" fill="#ffd66d" strokeWidth="2"/>}
      {kind === 'water' && <path d="M330 238 Q311 215 333 195 Q357 221 330 238Z" fill="#94d9ed"/>}
      {kind === 'fire' && <path d="M335 245 Q312 225 335 204 Q332 221 349 215 Q366 239 335 245Z" fill="#ffd66d"/>}
      {evolution==='flower'&&<g strokeWidth="2" fill="#f4b4d1">{[0,1,2,3,4].map(i=><circle key={i} cx={200+Math.cos(i*Math.PI*2/5)*12} cy={105+Math.sin(i*Math.PI*2/5)*12} r="9"/>)}<circle cx="200" cy="105" r="7" fill="#ffe092"/></g>}
      {evolution==='rainbow'&&<g fill="none" strokeWidth="6" strokeLinecap="round"><path d="M166 119q34-39 68 0" stroke="#eaa6bd"/><path d="M171 124q29-33 58 0" stroke="#e4cd7f"/><path d="M176 129q24-27 48 0" stroke="#94cab7"/></g>}
      {level>=20&&<path d="m166 64 4-25 17 15 15-24 14 24 16-15 4 25Z" fill="#ffda7e" strokeWidth="3"/>}
      {level===30&&<g stroke="#ffe4a0" fill="none" strokeWidth="4"><ellipse cx="201" cy="24" rx="65" ry="14"/><path d="m72 73 6 10 11 3-11 4-6 10-3-10-12-4 12-3Z" fill="#ffe4a0"/><path d="m325 57 5 9 12 4-12 3-5 10-4-10-11-3 11-4Z" fill="#ffe4a0"/></g>}
    </g><g fill="#ffd66d"><path d="M75 127l5 12 13 4-13 5-5 12-4-12-13-5 13-4Z"/><path d="M316 85l4 9 10 4-10 3-4 10-3-10-10-3 10-4Z"/></g>
  </svg>;
}
