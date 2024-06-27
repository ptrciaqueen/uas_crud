"use client";

import Navbar from "@/components/nav";
import React, { useEffect } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { InputWithButton } from "@/components/searchbar";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const storage = typeof window !== "undefined" ? localStorage : null;
    const token = storage ? storage.getItem("access_token") : null;

    if (!token) {
      router.push("/");
    }
  }, [router]);

  return (
    <div className="w-full h-[100vh] flex flex-col items-center ">
      <Navbar />
      <div className="pt-6 w-[70vw] flex justify-center">
        <InputWithButton />
      </div>
      <div className="py-[26px] px-[10rem] w-full flex flex-wrap justify-between gap-6">
        <Card className="flex flex-col w-[25vw]">
          <CardHeader className="text-center">
            <CardTitle>Card Title</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p>Card Content</p>
          </CardContent>
          <CardFooter className="text-end">
            <p>Card Footer</p>
          </CardFooter>
        </Card>
        <Card className="flex flex-col w-[25vw]">
          <CardHeader className="text-center">
            <CardTitle>Card Title</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p>Card Content</p>
          </CardContent>
          <CardFooter className="text-end">
            <p>Card Footer</p>
          </CardFooter>
        </Card>
        <Card className="flex flex-col w-[25vw]">
          <CardHeader className="text-center">
            <CardTitle>Card Title</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p>Card Content</p>
          </CardContent>
          <CardFooter className="text-end">
            <p>Card Footer</p>
          </CardFooter>
        </Card>
        <Card className="flex flex-col w-[25vw]">
          <CardHeader className="text-center">
            <CardTitle>Card Title</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p>Card Content</p>
          </CardContent>
          <CardFooter className="text-end">
            <p>Card Footer</p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
