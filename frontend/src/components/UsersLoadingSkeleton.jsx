function UsersLoadingSkeleton() {
  return (
    <div className="flex-1 overflow-y-auto space-y-2 p-4">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div key={i} className="p-4 border-b border-slate-700">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-slate-700 rounded-full animate-pulse" />
            <div className="flex-1">
              <div className="h-4 bg-slate-700 rounded w-24 mb-2 animate-pulse" />
              <div className="h-3 bg-slate-700 rounded w-20 animate-pulse" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default UsersLoadingSkeleton;