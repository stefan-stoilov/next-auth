import { Navbar } from "@/components/navbar";

export default function Page() {
  return (
    <div>
      <Navbar />
      <div className="flex h-screen w-full items-center justify-center bg-slate-200">Protected Page</div>
    </div>
  );
}
