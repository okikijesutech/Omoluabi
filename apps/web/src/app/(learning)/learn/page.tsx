export default function LearnPage() {
  return (
    <div className="flex flex-col gap-8 items-center">
      <div className="text-center max-w-md w-full py-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Yoruba Path</h1>
        <p className="text-slate-600">Start your journey to mastering the Yoruba language.</p>
      </div>
      
      {/* Placeholder for the interactive Learning Path Tree */}
      <div className="w-full flex justify-center py-12">
        <div className="flex flex-col items-center gap-6">
          <div className="w-24 h-24 rounded-full bg-brand-primary flex items-center justify-center text-white shadow-lg cursor-pointer transform hover:scale-105 transition-transform">
             Start
          </div>
          <div className="w-2 h-16 bg-slate-200" />
          <div className="w-20 h-20 rounded-full bg-slate-200 flex items-center justify-center text-white shadow opacity-50">
             Locked
          </div>
        </div>
      </div>
    </div>
  );
}
