export function Background() {
  return (
    <>
      <div className="absolute inset-0 bg-linear-to-b from-sky-200 via-sky-100 to-white" />

      <svg
        className="absolute inset-0 w-full h-full opacity-20"
        viewBox="0 0 1200 800"
        preserveAspectRatio="xMidYMid slice"
      >
        <ellipse
          cx="600"
          cy="400"
          rx="500"
          ry="300"
          fill="none"
          stroke="white"
          strokeWidth="1"
        />
        <ellipse
          cx="600"
          cy="400"
          rx="650"
          ry="400"
          fill="none"
          stroke="white"
          strokeWidth="1"
        />
        <ellipse
          cx="600"
          cy="400"
          rx="800"
          ry="500"
          fill="none"
          stroke="white"
          strokeWidth="1"
        />
      </svg>

      <div className="absolute bottom-0 left-0 right-0 h-[40%]">
        <div
          className="absolute inset-0"
          style={{
            background: `
radial-gradient(ellipse 120% 80% at 10% 100%, rgba(255,255,255,0.95) 0%, transparent 50%),
radial-gradient(ellipse 100% 70% at 30% 95%, rgba(255,255,255,0.9) 0%, transparent 45%),
radial-gradient(ellipse 80% 60% at 50% 100%, rgba(255,255,255,0.95) 0%, transparent 50%),
radial-gradient(ellipse 90% 65% at 70% 95%, rgba(255,255,255,0.9) 0%, transparent 45%),
radial-gradient(ellipse 110% 75% at 90% 100%, rgba(255,255,255,0.95) 0%, transparent 50%),
radial-gradient(ellipse 60% 50% at 20% 90%, rgba(255,255,255,0.8) 0%, transparent 40%),
radial-gradient(ellipse 70% 55% at 60% 92%, rgba(255,255,255,0.85) 0%, transparent 42%),
radial-gradient(ellipse 65% 50% at 85% 88%, rgba(255,255,255,0.8) 0%, transparent 40%)
`,
          }}
        />
      </div>

      {/* Additional cloud wisps - sides */}
      <div
        className="absolute top-1/4 left-0 w-1/3 h-1/2 opacity-60"
        style={{
          background: `
radial-gradient(ellipse 80% 50% at 0% 50%, rgba(255,255,255,0.6) 0%, transparent 50%)
`,
        }}
      />
      <div
        className="absolute top-1/4 right-0 w-1/3 h-1/2 opacity-60"
        style={{
          background: `
radial-gradient(ellipse 80% 50% at 100% 50%, rgba(255,255,255,0.6) 0%, transparent 50%)
`,
        }}
      />
    </>
  );
}
