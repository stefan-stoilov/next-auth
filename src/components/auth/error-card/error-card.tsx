import { CardWrapper } from "@/components/auth/card-wrapper";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";

const font = Poppins({
  subsets: ["latin"],
  weight: ["500"],
});

export function ErrorCard() {
  return (
    <CardWrapper headerLabel="Oops! Something went wrong!" backButtonHref="/sign-in" backButtonLabel="Back to login">
      <h1 className={cn("text-center text-lg font-semibold", font.className)}>
        Seems like there was an error processing your request!
      </h1>
    </CardWrapper>
  );
}

export default ErrorCard;
