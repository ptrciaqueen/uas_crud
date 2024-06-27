"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useLogin } from "@/hooks/useCustom";
import { useRouter } from "next/navigation";

export default function Home() {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const [errorHide, setErrorHide] = useState({ status: true, msg: "" });

  const router = useRouter();

  const { mutate: login } = useLogin();

  const handleLogin = () => {
    login(user, {
      onSuccess: (data) => {
        const token = data?.data;
        localStorage.setItem("access_token", token);
        router.push("/home");
        setUser({ username: "", password: "" });
      },
      onError: (error) => {
        if (error.response.data.error.message !== "") {
          setErrorHide({
            status: false,
            msg: error.response.data.error.message,
          });
        }
        console.error(error);
      },
    });
  };

  return (
    <div className="flex justify-center items-center h-[100vh] w-full">
      <div className="flex flex-col justify-center items-center gap-4">
        <h1 className="text-black text-7xl">"Welcome"</h1>
        <p className="text-3xl w-[50vw] text-center">
          "Welcome to Notess - your go-to platform for organizing, sharing, and
          collaborating on notes!"
        </p>

        <div className="flex flex-col w-[30vw] pt-5 gap-1.5">
          {!errorHide.status && (
            <p className="text-red-500 text-l text-center">{errorHide.msg}</p>
          )}
          <Label htmlFor="Username" className="text-l">
            Username
          </Label>
          <Input
            type="text"
            placeholder="Input your username..."
            value={user.username}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
          />
          <Label htmlFor="Username" className="text-l">
            Password
          </Label>
          <Input
            type="password"
            placeholder="Input your password..."
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
        </div>
        <Button onClick={handleLogin}>Login</Button>
        <p className="text-gray-500">
          not signup yet?{" "}
          <a href="/register" className="underline text-black">
            signup
          </a>{" "}
          now
        </p>
      </div>
    </div>
  );
}
