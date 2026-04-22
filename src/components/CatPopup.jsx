const CAT_MSGS_HAPPY_EN = ['yasss! \ud83d\udcaa', 'go girl! \u2728', 'crushing it! \ud83c\udf38', 'more more more! \ud83d\udc95', "that's my girl! \ud83c\udf80"];
const CAT_MSGS_SAD_EN   = ['aww nooo... \ud83d\ude3f', 'you got this! \ud83d\udc97', 'next time! \ud83c\udf37', 'still proud \ud83d\udc9d', 'rest is ok! \ud83c\udf38'];
const CAT_MSGS_HAPPY_ES = ['\u00a1vamos! \ud83d\udcaa', '\u00a1eso es! \u2728', '\u00a1crack! \ud83c\udf38', '\u00a1m\u00e1s m\u00e1s m\u00e1s! \ud83d\udc95', '\u00a1as\u00ed se hace! \ud83c\udf80'];
const CAT_MSGS_SAD_ES   = ['ay no... \ud83d\ude3f', '\u00a1t\u00fa puedes! \ud83d\udc97', '\u00a1la pr\u00f3xima! \ud83c\udf37', '\u00a1igual orgullosa! \ud83d\udc9d', '\u00a1descanso ok! \ud83c\udf38'];

function HappyCat() {
  return (
    <svg width="72" height="72" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg" style={{animation:'catBounce 0.6s ease infinite', overflow:'visible'}}>
      <g style={{animation:'sparkle 0.8s ease 0.1s both'}}>
        <path d="M62 14 L63.5 10 L65 14 L69 15.5 L65 17 L63.5 21 L62 17 L58 15.5Z" fill="#ffb3d9"/>
      </g>
      <g style={{animation:'sparkle 0.8s ease 0.3s both'}}>
        <path d="M8 20 L9 17 L10 20 L13 21 L10 22 L9 25 L8 22 L5 21Z" fill="#ff80c0"/>
      </g>
      <g style={{animation:'sparkle 0.7s ease 0.2s both'}}>
        <path d="M58 48 L59 46 L60 48 L62 49 L60 50 L59 52 L58 50 L56 49Z" fill="#ff99cc"/>
      </g>
      <g style={{animation:'heartPop 0.9s ease 0.1s both'}}>
        <path d="M52 8 C52 6 54 4 56 6 C58 4 60 6 60 8 C60 11 56 14 56 14 C56 14 52 11 52 8Z" fill="#ff69b4"/>
      </g>
      <g style={{animation:'heartPop 0.9s ease 0.35s both'}}>
        <path d="M11 44 C11 42.5 12.5 41 14 42.5 C15.5 41 17 42.5 17 44 C17 46 14 48 14 48 C14 48 11 46 11 44Z" fill="#ffb3d9"/>
      </g>
      <path d="M22 54 C14 56 10 62 14 66 C18 70 24 66 26 60" stroke="#f48cb0" strokeWidth="3.5" strokeLinecap="round" fill="none" style={{transformOrigin:'26px 54px', animation:'tailWag 0.4s ease infinite'}}/>
      <ellipse cx="36" cy="50" rx="18" ry="14" fill="#ffb3d9"/>
      <circle cx="36" cy="30" r="18" fill="#ffb3d9"/>
      <polygon points="18,16 14,4 26,12" fill="#ffb3d9"/>
      <polygon points="20,15 17,7 25,12" fill="#ff80c0"/>
      <polygon points="54,16 58,4 46,12" fill="#ffb3d9"/>
      <polygon points="52,15 55,7 47,12" fill="#ff80c0"/>
      <ellipse cx="24" cy="34" rx="5" ry="3.5" fill="#ff80c0" opacity="0.5"/>
      <ellipse cx="48" cy="34" rx="5" ry="3.5" fill="#ff80c0" opacity="0.5"/>
      <path d="M26 27 Q29 23 32 27" stroke="#c0407a" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
      <path d="M40 27 Q43 23 46 27" stroke="#c0407a" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
      <ellipse cx="36" cy="31" rx="2" ry="1.5" fill="#e05090"/>
      <path d="M30 34 Q36 40 42 34" stroke="#c0407a" strokeWidth="2" strokeLinecap="round" fill="none"/>
      <line x1="18" y1="31" x2="28" y2="32" stroke="#e080b0" strokeWidth="1.2" strokeLinecap="round" opacity="0.8"/>
      <line x1="18" y1="34" x2="28" y2="33.5" stroke="#e080b0" strokeWidth="1.2" strokeLinecap="round" opacity="0.8"/>
      <line x1="44" y1="32" x2="54" y2="31" stroke="#e080b0" strokeWidth="1.2" strokeLinecap="round" opacity="0.8"/>
      <line x1="44" y1="33.5" x2="54" y2="34" stroke="#e080b0" strokeWidth="1.2" strokeLinecap="round" opacity="0.8"/>
      <ellipse cx="22" cy="62" rx="7" ry="5" fill="#ffb3d9"/>
      <ellipse cx="50" cy="62" rx="7" ry="5" fill="#ffb3d9"/>
    </svg>
  );
}

function SadCat() {
  return (
    <svg width="72" height="72" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg" style={{animation:'catShake 0.5s ease', overflow:'visible'}}>
      <g style={{animation:'teardrop 0.7s ease 0.1s infinite'}}>
        <ellipse cx="60" cy="22" rx="2" ry="3" fill="#a0c8ff" opacity="0.8"/>
      </g>
      <g style={{animation:'teardrop 0.7s ease 0.35s infinite'}}>
        <ellipse cx="12" cy="28" rx="1.5" ry="2.5" fill="#a0c8ff" opacity="0.7"/>
      </g>
      <g style={{animation:'teardrop 0.7s ease 0.55s infinite'}}>
        <ellipse cx="56" cy="38" rx="1.5" ry="2.5" fill="#a0c8ff" opacity="0.6"/>
      </g>
      <path d="M22 54 C14 58 12 66 18 68 C22 70 26 66 24 60" stroke="#c090aa" strokeWidth="3.5" strokeLinecap="round" fill="none" style={{transformOrigin:'24px 54px', animation:'tailDroop 0.8s ease infinite'}}/>
      <ellipse cx="36" cy="50" rx="18" ry="14" fill="#e8b0cc"/>
      <circle cx="36" cy="30" r="18" fill="#e8b0cc"/>
      <polygon points="18,18 10,8 22,14" fill="#e8b0cc"/>
      <polygon points="19,17 13,10 21,14" fill="#d090b8"/>
      <polygon points="54,18 62,8 50,14" fill="#e8b0cc"/>
      <polygon points="53,17 59,10 51,14" fill="#d090b8"/>
      <ellipse cx="24" cy="35" rx="5" ry="3" fill="#c080a0" opacity="0.3"/>
      <ellipse cx="48" cy="35" rx="5" ry="3" fill="#c080a0" opacity="0.3"/>
      <path d="M26 28 Q29 32 32 28" stroke="#905070" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
      <path d="M40 28 Q43 32 46 28" stroke="#905070" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
      <path d="M28 30 Q26 36 28 40" stroke="#a0c8ff" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.9" style={{animation:'teardrop 1s ease infinite'}}/>
      <path d="M44 30 Q46 36 44 40" stroke="#a0c8ff" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.9" style={{animation:'teardrop 1s ease 0.2s infinite'}}/>
      <ellipse cx="36" cy="32" rx="2" ry="1.5" fill="#b06080"/>
      <path d="M30 38 Q36 33 42 38" stroke="#905070" strokeWidth="2" strokeLinecap="round" fill="none"/>
      <line x1="18" y1="32" x2="28" y2="33" stroke="#c090b0" strokeWidth="1.2" strokeLinecap="round" opacity="0.6"/>
      <line x1="18" y1="35" x2="28" y2="34.5" stroke="#c090b0" strokeWidth="1.2" strokeLinecap="round" opacity="0.6"/>
      <line x1="44" y1="33" x2="54" y2="32" stroke="#c090b0" strokeWidth="1.2" strokeLinecap="round" opacity="0.6"/>
      <line x1="44" y1="34.5" x2="54" y2="35" stroke="#c090b0" strokeWidth="1.2" strokeLinecap="round" opacity="0.6"/>
      <ellipse cx="22" cy="63" rx="7" ry="5" fill="#e8b0cc"/>
      <ellipse cx="50" cy="63" rx="7" ry="5" fill="#e8b0cc"/>
    </svg>
  );
}

export default function CatPopup({ catAnim, lang }) {
  const isHappy = catAnim?.type === 'happy';
  const msgs = isHappy
    ? (lang === 'es' ? CAT_MSGS_HAPPY_ES : CAT_MSGS_HAPPY_EN)
    : (lang === 'es' ? CAT_MSGS_SAD_ES : CAT_MSGS_SAD_EN);
  const msg = catAnim ? msgs[catAnim.key % msgs.length] : '';
  return (
    <div className={`cat-popup ${catAnim ? 'show' : ''}`}>
      <div className="cat-bubble">
        {catAnim?.type === 'happy' ? <HappyCat /> : <SadCat />}
        <div className="cat-msg">{msg}</div>
      </div>
    </div>
  );
}
