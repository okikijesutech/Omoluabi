import { SideNav } from "@/components/layout/SideNav";
import { TopBar } from "@/components/layout/TopBar";

export default function LearningLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <SideNav />
      
      <div className="flex-1 flex flex-col">
        {/* Mobile Topbar or contextual secondary nav can go here if needed, omitting for now in favor of desktop first */}
        <div className="md:hidden">
          <TopBar />
        </div>
        
        <main className="flex-1 p-4 md:p-8 max-w-5xl mx-auto w-full">
          {children}
        </main>
      </div>
    </div>
  );
}
