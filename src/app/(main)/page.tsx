import { Navbar } from "@/components/navigation";
import Link from "next/link";

export default async function HomePage() {
  return (
    <main className="bg-home-gradient flex min-h-screen flex-col items-center justify-center text-white">
      <Navbar />
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-20">
        <h1 className="text-gradient text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
          Next Auth App
        </h1>

        <h2 className="max-w-[800px] text-center text-xl text-foreground md:text-3xl">
          {
            "Next.js authentication made simple, type safe and fully customizable. Built with the best technologies that React's ecosystem has to offer."
          }
        </h2>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-8">
          <h3 className="text-center text-2xl font-semibold text-foreground md:col-span-2">
            Started with Create <span className="text-gradient font-bold">T3</span> App
          </h3>
          <Link
            className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
            href="https://create.t3.gg/en/usage/first-steps"
            target="_blank"
          >
            <h4 className="text-2xl font-bold">First Steps →</h4>
            <div className="text-lg">
              Just the basics - Everything you need to know to set up your database and authentication.
            </div>
          </Link>
          <Link
            className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
            href="https://create.t3.gg/en/introduction"
            target="_blank"
          >
            <h4 className="text-2xl font-bold">Documentation →</h4>
            <div className="text-lg">Learn more about Create T3 App, the libraries it uses, and how to deploy it.</div>
          </Link>

          <h3 className="text-center text-2xl font-semibold text-foreground md:col-span-2">Tech Stack</h3>

          <Link
            className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
            href="https://nextjs.org/"
            target="_blank"
          >
            <h4 className="text-2xl font-bold">Next.js</h4>
            <div className="text-lg">
              The React Framework for the Web. Utilizing React server component architecture.
            </div>
          </Link>

          <Link
            className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
            href="https://www.typescriptlang.org/"
            target="_blank"
          >
            <h4 className="text-2xl font-bold">TypeScript</h4>
            <div className="text-lg">
              Because type safety is crucial for building scalable and maintainable applications.
            </div>
          </Link>

          <Link
            className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
            href="https://next-auth.js.org/"
            target="_blank"
          >
            <h4 className="text-2xl font-bold">NextAuth.js</h4>
            <div className="text-lg">
              Simplifying the implementation of secure authentication flows in React-based web applications.
            </div>
          </Link>

          <Link
            className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
            href="https://orm.drizzle.team/"
            target="_blank"
          >
            <h4 className="text-2xl font-bold">Drizzle ORM</h4>
            <div className="text-lg">
              A lightweight, type-safe object-relational mapper for TypeScript and SQL databases.
            </div>
          </Link>

          <Link
            className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
            href="https://neon.tech/home"
            target="_blank"
          >
            <h4 className="text-2xl font-bold">Neon Postgres</h4>
            <div className="text-lg">
              Postgres databse, on a serverless platform designed to build reliable and scalable applications faster.
            </div>
          </Link>

          <Link
            className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
            href="https://tailwindcss.com/"
            target="_blank"
          >
            <h4 className="text-2xl font-bold">Tailwind CSS</h4>
            <div className="text-lg">Fast, flexible, and reliable styling solution.</div>
          </Link>

          <Link
            className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
            href="https://create.t3.gg/en/introduction"
            target="_blank"
          >
            <h4 className="text-2xl font-bold">Shadcn/ui</h4>
            <div className="text-lg">
              UI components designed to accelerate development while maintaining flexibility and consistency across
              projects.
            </div>
          </Link>
        </div>
      </div>
    </main>
  );
}
