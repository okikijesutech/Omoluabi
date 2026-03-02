import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { FiEye, FiCheck, FiX } from "react-icons/fi";

export default function ContributeDashboard() {
  const pendingReviews = [
    { id: "REV-101", pair: "EN -> YR", type: "Translation", content: "\"The boy is running\" -> \"Ọmọkùnrin náà ń sáré\"", accuracy: 95, status: "pending" },
    { id: "REV-102", pair: "YR -> EN", type: "Audio", content: "Ẹ káàárọ (Voice recording)", accuracy: null, status: "pending" },
    { id: "REV-103", pair: "EN -> YR", type: "Exercise", content: "Family Match Items", accuracy: 88, status: "pending" },
  ];

  return (
    <div className="flex flex-col gap-8 max-w-5xl mx-auto">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Contributor Dashboard</h1>
          <p className="text-slate-500 text-lg">Manage lesson content and review community proposals.</p>
        </div>
        <Button variant="primary">
          + New Proposal
        </Button>
      </div>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <h3 className="font-semibold text-slate-500 mb-2">My Proposals</h3>
          <p className="text-4xl font-extrabold text-slate-800">3</p>
        </Card>
        <Card className="p-6 ring-2 ring-brand-primary/20">
          <h3 className="font-semibold text-slate-500 mb-2">Tokens Earned</h3>
          <p className="text-4xl font-extrabold text-brand-secondary">1,250 <span className="text-lg">TKN</span></p>
        </Card>
        <Card className="p-6">
          <h3 className="font-semibold text-slate-500 mb-2">Global Accuracy</h3>
          <p className="text-4xl font-extrabold text-success">94.2%</p>
        </Card>
      </div>

      {/* Pending Reviews Table */}
      <h2 className="text-2xl font-bold text-slate-800 mt-4">Needs Review</h2>
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="p-4 font-semibold text-slate-600 text-sm">ID</th>
                <th className="p-4 font-semibold text-slate-600 text-sm">Language Pair</th>
                <th className="p-4 font-semibold text-slate-600 text-sm">Type</th>
                <th className="p-4 font-semibold text-slate-600 text-sm">Content Snippet</th>
                <th className="p-4 font-semibold text-slate-600 text-sm">Confidence</th>
                <th className="p-4 font-semibold text-slate-600 text-sm text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {pendingReviews.map((review) => (
                <tr key={review.id} className="hover:bg-slate-50 text-sm">
                  <td className="p-4 font-mono text-xs text-slate-500">{review.id}</td>
                  <td className="p-4 font-bold text-slate-700">{review.pair}</td>
                  <td className="p-4"><Badge variant="default">{review.type}</Badge></td>
                  <td className="p-4 text-slate-600 max-w-[200px] truncate">{review.content}</td>
                  <td className="p-4">
                    {review.accuracy ? (
                      <span className={`font-bold ${review.accuracy > 90 ? "text-success" : "text-warning"}`}>
                        {review.accuracy}%
                      </span>
                    ) : (
                      <span className="text-slate-400 italic">Human eval</span>
                    )}
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                       <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-brand-primary">
                         <FiEye />
                       </Button>
                       <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-success bg-green-50">
                         <FiCheck />
                       </Button>
                       <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-error bg-red-50">
                         <FiX />
                       </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
