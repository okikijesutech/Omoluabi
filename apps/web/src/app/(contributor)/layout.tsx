import { SideNav } from "@/components/layout/SideNav";
import { TopBar } from "@/components/layout/TopBar";

export default function ContributorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-white">
      <SideNav />
      
      <div className="flex-1 flex flex-col">
        <TopBar />
        
        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
