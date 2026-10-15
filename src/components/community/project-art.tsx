export function ProjectArt({ kind }: { kind: number }) {
  return <div className="project-art" aria-hidden="true">
    <svg viewBox="0 0 250 100" fill="none">
      {kind === 0 ? <>
        <rect x="55" y="12" width="140" height="76" rx="5" stroke="currentColor" opacity=".5" />
        <path d="M55 31h140M67 23h4m6 0h4m6 0h4M73 48l8 6-8 6m15 0h23" stroke="currentColor" strokeWidth="2" />
        <path d="M73 72h100" stroke="currentColor" opacity=".2" />
      </> : kind === 1 ? <>
        <path d="M48 50h154M125 20v60M72 28l106 44M72 72l106-44" stroke="currentColor" opacity=".3" />
        {[[48,50],[72,28],[72,72],[125,20],[125,80],[178,28],[178,72],[202,50]].map(([cx,cy],i)=><circle key={i} cx={cx} cy={cy} r="5" fill="var(--card)" stroke="currentColor" opacity=".6" />)}
        <circle cx="125" cy="50" r="14" fill="var(--card)" stroke="currentColor" /><path d="m120 50 4 4 7-8" stroke="currentColor" />
      </> : <>
        <path d="m125 8 47 22v40l-47 22-47-22V30l47-22Z" stroke="currentColor" opacity=".6" />
        <path d="m78 30 47 23 47-23M125 53v39m-24-73 47 23v16" stroke="currentColor" opacity=".3" />
        <path d="M45 39h18m124 22h18M48 66h12m128-31h16" stroke="currentColor" opacity=".3" />
      </>}
    </svg><span className="project-art-label">FOSS / CONCEPT_0{kind + 1}</span>
  </div>;
}
