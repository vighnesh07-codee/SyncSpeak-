// How to make animated gradient border 👇
// https://cruip-tutorials.vercel.app/animated-gradient-border/
function BorderAnimatedContainer({ children }) {
  return (
    <div className="relative rounded-2xl overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-r from-cyan-500 via-cyan-300 to-cyan-500 p-1 rounded-2xl animate-pulse" />
      <div className="relative bg-slate-800 rounded-2xl p-4 flex overflow-hidden">
        {children}
      </div>
    </div>
  );
}
export default BorderAnimatedContainer;