function MessagesLoadingSkeleton() {
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} className={`flex ${i % 2 === 0 ? "justify-end" : "justify-start"}`}>
          <div className="w-32 h-8 bg-slate-700 rounded-lg animate-pulse" />
        </div>
      ))}
    </div>
  );
}

export default MessagesLoadingSkeleton;
