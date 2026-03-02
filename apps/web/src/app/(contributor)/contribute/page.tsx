export default function ContributeDashboard() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Contributor Dashboard</h1>
        <p className="text-slate-500">Manage lesson content and review community proposals.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 border border-slate-200 rounded-xl bg-white shadow-sm">
          <h3 className="font-semibold text-slate-800 mb-2">My Proposals</h3>
          <p className="text-3xl font-bold text-brand-primary">3</p>
        </div>
        <div className="p-6 border border-slate-200 rounded-xl bg-white shadow-sm">
          <h3 className="font-semibold text-slate-800 mb-2">Pending Reviews</h3>
          <p className="text-3xl font-bold text-warning">12</p>
        </div>
        <div className="p-6 border border-slate-200 rounded-xl bg-white shadow-sm">
          <h3 className="font-semibold text-slate-800 mb-2">Approved Content</h3>
          <p className="text-3xl font-bold text-success">45</p>
        </div>
      </div>
    </div>
  );
}
