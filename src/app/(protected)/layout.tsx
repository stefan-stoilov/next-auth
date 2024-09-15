import { UserNavbar } from "@/components/navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-gradient flex h-full min-h-screen flex-col items-center justify-center">
      <div className="mb-4 flex w-full items-center justify-center">
        <UserNavbar />
      </div>
      {children}
    </div>
  );
}
