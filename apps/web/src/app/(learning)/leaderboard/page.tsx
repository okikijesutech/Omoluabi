import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

export default function LeaderboardPage() {
  const users = [
    { rank: 1, name: "Adebayo S.", xp: 12500, streak: 45, isCurrentUser: false },
    { rank: 2, name: "Yomi T.", xp: 11200, streak: 30, isCurrentUser: false },
    { rank: 3, name: "Toluwani", xp: 9800, streak: 12, isCurrentUser: true }, // Highlight
    { rank: 4, name: "Kemi O.", xp: 8500, streak: 5, isCurrentUser: false },
    { rank: 5, name: "Folake B.", xp: 7200, streak: 21, isCurrentUser: false },
    { rank: 6, name: "Ojo K.", xp: 6100, streak: 8, isCurrentUser: false },
    { rank: 7, name: "Pelumi", xp: 5400, streak: 2, isCurrentUser: false },
  ];

  return (
    <div className="flex flex-col gap-8 items-center pb-24 max-w-2xl mx-auto">
      <div className="text-center w-full py-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2 mt-4 text-brand-primary">Emerald League</h1>
        <p className="text-slate-600 font-medium pb-4">Top 3 advance to the Amethyst League.</p>
        <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden mb-6">
           <div className="bg-brand-primary h-full w-[40%]" />
        </div>
        <p className="text-sm text-slate-500">2 days, 14 hours remaining</p>
      </div>

      <Card className="w-full flex flex-col p-2 text-slate-800 border-2">
        {users.map((user) => (
          <div
            key={user.rank}
            className={`flex flex-row items-center justify-between p-4 rounded-xl transition-colors ${
              user.isCurrentUser ? "bg-orange-50 ring-2 ring-brand-primary/50 -mx-2 px-6 shadow-sm z-10" : "hover:bg-slate-50"
            }`}
          >
            <div className="flex items-center gap-4">
              <span className={`w-8 font-bold text-lg text-center ${
                user.rank === 1 ? "text-yellow-500" :
                user.rank === 2 ? "text-slate-400" :
                user.rank === 3 ? "text-amber-700" : "text-slate-500"
              }`}>
                {user.rank}
              </span>
              <div className="w-12 h-12 rounded-full bg-slate-200 border-2 border-slate-300 flex-shrink-0 relative">
                {user.rank <= 3 && (
                  <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center text-xs bg-white shadow-sm border border-slate-100">
                    👑
                  </div>
                )}
              </div>
              <div className="flex flex-col">
                 <span className="font-bold text-lg">{user.name}</span>
                 {user.isCurrentUser && <span className="text-xs text-brand-primary font-bold">YOU</span>}
              </div>
            </div>

            <div className="flex flex-col items-end">
               <span className="font-bold text-slate-700">{user.xp} XP</span>
               <div className="flex items-center gap-1 text-warning text-sm font-bold">
                 <span>🔥</span> {user.streak}
               </div>
            </div>
          </div>
        ))}
      </Card>
    </div>
  );
}
