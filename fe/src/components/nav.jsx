"use client";

import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [username, setUsername] = useState("");
  const storage = typeof window !== "undefined" ? localStorage : null;
  const router = useRouter();

  useEffect(() => {
    // Retrieve username from localStorage or other persistent storage
    const storedUsername = storage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);
  console.log(username);

  const handleLogout = () => {
    storage.removeItem("access_token");
    storage.removeItem("username");
    // Optionally redirect after logout
    router.push("/");
  };
  return (
    <div className="w-full p-[20px] bg-black text-white">
      <div className="flex items-center w-full">
        <div className="flex justify-start w-full">
          <h1>Notess</h1>
        </div>
        <div className="flex justify-end items-center w-full gap-2">
          <a href="/home" className="text-l pr-5 pl-5">
            Home
          </a>
          <a href="/about" className="text-l pr-5 pl-5">
            About
          </a>
          <DropdownMenu>
            <DropdownMenuTrigger className="flex justify-center items-center gap-2">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>AN</AvatarFallback>
              </Avatar>
              <h1>{username}</h1>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>My Settings</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link href="/notes">Add Notes</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link href="/" onClick={handleLogout}>
                  Logout
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}
