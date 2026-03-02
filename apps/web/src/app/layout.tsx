export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased font-sans text-slate-900 bg-white">
        {children}
      </body>
    </html>
  );
}
