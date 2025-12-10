import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <div className="antialiased font-sans min-h-screen bg-background text-foreground">
      {children}
    </div>
  );
}
