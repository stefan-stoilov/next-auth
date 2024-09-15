import { Navbar } from "@/components/navigation";
import Link from "next/link";
import { data } from "./data";

export default async function HomePage() {
  return (
    <main className="bg-home-gradient flex min-h-screen flex-col items-center justify-center text-white">
      <Navbar />
      <div className="container flex flex-col items-center justify-center gap-20 px-5 pb-20 md:gap-12 md:pt-40">
        <div className="flex h-screen flex-col items-center justify-center gap-4 md:h-fit md:gap-12">
          <h1 className="text-gradient text-center text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            Next Auth App
          </h1>

          <h2 className="text-center text-2xl md:text-4xl">Under development. Run locally to test functionality.</h2>

          <h2 className="max-w-[800px] text-center text-xl text-foreground md:text-3xl">
            {
              "Next.js authentication made simple, type safe and fully customizable. Built with the best technologies that React's ecosystem has to offer."
            }
          </h2>
        </div>

        <div className="my-4 flex w-full max-w-[1024px] flex-col gap-4 text-sm md:my-8 md:h-fit md:w-4/5 md:gap-8 md:text-center md:text-lg">
          <h3 className="text-center text-xl font-semibold text-foreground md:col-span-2 md:text-3xl">
            About this app
          </h3>
          {data.description.map((paragraph, index) => (
            <p key={index} className="text-foreground/90">
              {paragraph}
            </p>
          ))}
        </div>

        <div>
          <h3 className="mb-6 text-center text-xl font-semibold text-foreground md:col-span-2 md:text-3xl">
            Started with Create <span className="text-gradient font-bold">T3</span> App
          </h3>
          <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-8">
            {data.t3.map(({ link, title, description }, i) => (
              <li key={i} className="flex w-full md:aspect-[16/12] md:max-w-xs">
                <Link
                  className="flex w-full flex-col gap-2 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20 md:gap-4"
                  href={link}
                  target="_blank"
                >
                  <h4 className="text-lg font-bold md:text-2xl">{title}</h4>
                  <p className="text-sm md:text-lg">{description}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-6 text-center text-3xl font-semibold text-foreground md:col-span-2 lg:col-span-3">
            Tech Stack Used
          </h3>

          <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
            {data.stack.map(({ link, title, description }, i) => (
              <li key={i} className="flex w-full md:aspect-[16/12] md:max-w-xs">
                <Link
                  className="flex w-full flex-col gap-2 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20 md:gap-4"
                  href={link}
                  target="_blank"
                >
                  <h4 className="text-lg font-bold md:text-2xl">{title}</h4>
                  <p className="text-sm md:text-lg">{description}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
}
