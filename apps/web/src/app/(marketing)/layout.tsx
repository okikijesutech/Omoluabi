import "../globals.css";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col items-center">
      {/* TODO: Add Marketing Header */}
      <main className="flex-1 w-full flex flex-col">
        {children}
      </main>
      {/* TODO: Add Marketing Footer */}
    </div>
  );
}
