"use client";
import type { PropsWithChildren } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Header } from "@/components/auth/header";
import { BackButton, Social } from "@/components/auth/buttons";

export type CardWrapperProps = {
  headerLabel: string;
  backButtonLabel: string;
  backButtonHref: string;
  showSocial?: boolean;
} & PropsWithChildren;

export function CardWrapper({ children, headerLabel, showSocial, backButtonHref, backButtonLabel }: CardWrapperProps) {
  return (
    <Card className="w-[25rem] rounded bg-background shadow-md">
      <CardHeader>
        <Header label={headerLabel} />
      </CardHeader>
      <CardContent>{children}</CardContent>
      {showSocial && (
        <CardFooter>
          <Social />
        </CardFooter>
      )}
      <CardFooter>
        <BackButton href={backButtonHref} label={backButtonLabel} />
      </CardFooter>
    </Card>
  );
}

export default CardWrapper;
