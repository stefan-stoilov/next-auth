export default function Layout({ children }: { children: React.ReactNode }) {
  return <div className="bg-gradient flex h-full min-h-screen items-center justify-center">{children}</div>;
}
