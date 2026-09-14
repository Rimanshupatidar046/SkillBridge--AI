const nodes = [
  "left-[10%] top-[28%] h-12 w-12",
  "left-[27%] top-[8%] h-9 w-9",
  "right-[18%] top-[14%] h-14 w-14",
  "right-[5%] top-[47%] h-9 w-9",
  "right-[22%] bottom-[12%] h-11 w-11",
  "left-[22%] bottom-[10%] h-10 w-10",
];

export function HeroNetworkFallback() {
  return (
    <div className="relative h-full w-full overflow-hidden" aria-hidden="true">
      <div className="absolute left-1/2 top-1/2 h-[46%] w-[46%] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-success/35" />
      <div className="absolute left-1/2 top-1/2 h-[31%] w-[31%] -translate-x-1/2 -translate-y-1/2 rotate-12 rounded-[32%] bg-primary shadow-elevated" />
      <div className="absolute left-1/2 top-1/2 h-[17%] w-[17%] -translate-x-[35%] -translate-y-[70%] rounded-full bg-primary-foreground/35 blur-md" />
      {nodes.map((position, index) => (
        <div
          key={position}
          className={`absolute ${position} rotate-12 rounded-[30%] border-[6px] border-primary-soft ${index % 2 === 0 ? "bg-primary/80" : "bg-success/80"}`}
        />
      ))}
      <div className="absolute left-[15%] top-[31%] h-px w-[38%] rotate-[18deg] bg-primary/25" />
      <div className="absolute right-[20%] top-[29%] h-px w-[34%] -rotate-[23deg] bg-success/30" />
      <div className="absolute bottom-[27%] left-[26%] h-px w-[32%] -rotate-[38deg] bg-primary/25" />
      <div className="absolute bottom-[28%] right-[22%] h-px w-[31%] rotate-[35deg] bg-success/30" />
    </div>
  );
}
