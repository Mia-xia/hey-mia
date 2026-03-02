"use client";
import { useRef, useEffect } from "react";

// Cards grouped into 4 columns of 2–3 entries each
const columns = [
  [0, 4, 8],
  [1, 5, 9],
  [2, 6, 10],
  [3, 7],
];

// Vertical offset for the whole column — staggers where each column starts
const colTops = [0, 20, 8, 35]; // px

// Background token index — actual colours are defined as CSS vars
// so dark mode gets its own palette automatically via globals.css
const bgColorVars = [
  'var(--blog-bg-0)',
  'var(--blog-bg-1)',
  'var(--blog-bg-2)',
  'var(--blog-bg-3)',
  'var(--blog-bg-4)',
  'var(--blog-bg-5)',
];

// Additional margin-top per card within its column — breaks the monotony
const cardTops: number[][] = [
  [0, 12,  0], // col 0
  [0,  0, 14], // col 1
  [0, 10,  0], // col 2
  [0, 18],     // col 3
];

const quotes = [
  {
    text: `用对自然倾心的眼，反观人生，使我不能不觉得热情的可珍，而看重人与人凑巧的藤葛，在同一人事上，第二次的凑巧是不会有的。`,
    ml: "0%", maxW: "78%", fadeDelay: "0s", floatDelay: "0s", floatDur: "6s",
  },
  {
    text: `过去依赖的很多坚固的东西突然被敲碎了，就像一场漫长的长跑，突然间没有了目标，然后你就被虚无和茫然的感受层层包裹住，失去重心。`,
    ml: "14%", maxW: "72%", fadeDelay: "0.1s", floatDelay: "1.3s", floatDur: "7s",
  },
  {
    text: `希望新的一年要好好努力，放低姿态，少一些"I don't care"的态度，如此，看最好能做到多好。`,
    ml: "6%", maxW: "62%", fadeDelay: "0.2s", floatDelay: "2.5s", floatDur: "5.5s",
  },
  {
    text: `在讨论婚与不婚、育与不育、自由与稳定、挑战与舒适的一系列话题时，我常常都固执己见，固执地坚持一些二元对立的观点，尽管很少发表自己的看法，但在内心深处一直是这么觉得的。`,
    ml: "9%", maxW: "76%", fadeDelay: "0.3s", floatDelay: "0.7s", floatDur: "6.5s",
  },
  {
    text: `迷笛太美好了，每次抽离出来都要很长很长一段时间，我想一定是活在真实的正常的被建构的世界太难了。今年很多个流泪的瞬间都留在了现场，留给了在现场遇见的美好的大家，真实的、感受到活着的瞬间，记住midi，不忘继续做自己。`,
    ml: "0%", maxW: "82%", fadeDelay: "0.4s", floatDelay: "1.9s", floatDur: "6s",
  },
  {
    text: `生日已经过去很久了，收藏在notion里面雨婷给我的祝福：我要奢侈的祝你永远快乐和健康，享受生活，体会到所有应得的美好，不应得的美好也不会因好运守恒消损掉。这句话也想送给我爱的很多人，最后一句很戳我，因为"好运守恒"也是我从小就坚信的事情。`,
    ml: "12%", maxW: "74%", fadeDelay: "0.5s", floatDelay: "3.1s", floatDur: "7.5s",
  },
  {
    text: `常常，情绪丰富的时候，我什么都做不了，某天看到今年才写了三篇公众号，发现，分别写于BFA、恬恬姐去法国、养马岛迷笛之后，几段我非常想沉溺在回忆中的时光，彷佛要把记忆留存下来之后，才可以继续往前走。这段时间没有实习课也很少，正值北京最好的季节，每天早上不紧不慢的去买杯咖啡。`,
    ml: "0%", maxW: "86%", fadeDelay: "0.6s", floatDelay: "0.4s", floatDur: "8s",
  },
  {
    text: `记得滹沱河第一天晚上结束，没找到接驳车，又打不上车，荒郊野岭，我沿着马路走呀走，打不上，继续走，路过很黑的地方总是会害怕，打开手机假装在接视频电话，最后是一个好心人让我上了车。那天晚上那条很长的路，我以为我会一直走下去。`,
    ml: "10%", maxW: "78%", fadeDelay: "0.7s", floatDelay: "2.1s", floatDur: "6.5s",
  },
  {
    text: `自由是很多人的追求，在我心里，我从来不觉得自己自由过，离家去很远的城市不是、不必迎合家长喜好考公考编不是、敢于说出内心的想法不是，想去哪就去哪不是……还活在这个社会和制度的规训之下，还在各方面寻求认可，所以不是。想要挣脱，没那么容易。`,
    ml: "5%", maxW: "78%", fadeDelay: "0.8s", floatDelay: "1.0s", floatDur: "7s",
  },
  {
    text: `有很多人以铮铮之笔娓娓道来了她眼中糟糕的世界，也有很多段子内涵社会的幕后构造，可是这个世界，它不会变，at least not now, not better and better，笑过了，看过了，感悟过了，还是play的一环，还是要穿上盔甲踏入这条河流。于是希望，坚定地只用寻求自己认可的那一天早日到来。`,
    ml: "17%", maxW: "72%", fadeDelay: "0.9s", floatDelay: "2.7s", floatDur: "6s",
  },
  {
    text: `但\u200d生命和关系是流动的河流`,
    ml: "auto", maxW: "auto", fadeDelay: "1.0s", floatDelay: "1.5s", floatDur: "5s",
    centered: true,
  },
];

export default function Blog() {
  const trackRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);
  const posRef = useRef(0);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    let rafId: number;
    const SPEED = 0.8; // px per frame @ 60 fps ≈ 48 px/s

    const tick = () => {
      if (!pausedRef.current && el.scrollWidth > 0) {
        posRef.current += SPEED;
        // Reset at the midpoint — second half is an exact duplicate of the first
        if (posRef.current >= el.scrollWidth / 2) {
          posRef.current = 0;
        }
        el.scrollLeft = posRef.current;
      }
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, []);

  const renderColumns = (prefix: string) =>
    columns.map((indices, ci) => (
      <div
        key={`${prefix}-${ci}`}
        className="flex flex-col gap-3 shrink-0"
        style={{ paddingTop: colTops[ci] }}
      >
        {indices.map((qi, ri) => (
          <div
            key={`${prefix}-${ci}-${qi}`}
            className="blog-bubble"
            style={{
              "--fade-delay": quotes[qi].fadeDelay,
              "--float-delay": quotes[qi].floatDelay,
              "--float-dur": quotes[qi].floatDur,
              background: bgColorVars[qi % 6],
              width: "fit-content",
              minWidth: 160,
              maxWidth: 460,
              marginTop: cardTops[ci]?.[ri] ?? 0,
            } as React.CSSProperties}
          >
            <p
              className={`blog-card-text${
                quotes[qi].centered ? " italic text-[var(--color-text-muted)]" : ""
              }`}
            >
              {quotes[qi].text}
            </p>
          </div>
        ))}
      </div>
    ));

  return (
    <section
      id="blog"
      className="bg-[var(--color-surface-2)] overflow-hidden"
      style={{ height: 560 }}
    >
      <div className="max-w-3xl mx-auto px-6 pt-6 pb-4">
        <p className="text-xs font-mono text-[var(--color-accent)] uppercase tracking-widest mb-1">
          Writing
        </p>
        <h2 className="text-2xl font-bold tracking-tight">Blog</h2>
      </div>

      <div className="relative">
        <div className="pointer-events-none absolute left-0 top-0 h-full w-20 z-10 blog-fade-left" />
        <div className="pointer-events-none absolute right-0 top-0 h-full w-20 z-10 blog-fade-right" />

        <div
          ref={trackRef}
          className="blog-hscroll overflow-x-scroll"
          onMouseEnter={() => { pausedRef.current = true; }}
          onMouseLeave={() => { pausedRef.current = false; }}
        >
          {/* Canvas: rendered twice back-to-back for seamless infinite loop */}
          <div className="flex gap-4 px-6 pt-2 pb-5" style={{ width: "max-content" }}>
            {renderColumns("a")}
            {renderColumns("b")}
          </div>
        </div>
      </div>
    </section>
  );
}
