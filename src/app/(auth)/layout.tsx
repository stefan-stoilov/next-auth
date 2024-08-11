export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-full min-h-screen items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-100 to-blue-400">
      {children}
    </div>
  );
}
