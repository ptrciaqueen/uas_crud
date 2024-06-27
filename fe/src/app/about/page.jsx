import Navbar from "@/components/nav";
import React from "react";

export default function About() {
  return (
    <div className="w-full h-[100vh] flex flex-col items-center justify-center">
      <Navbar />
      <div className="py-[26px] px-[10rem] w-[70vw] h-[100vh] flex flex-col gap-6 text-xl items-center justify-center">
        <h1 className="text-center">
          Welcome to Notess! This website was created by Patricia Queen as a
          personal project. Notess is a platform for organizing, sharing, and
          collaborating on notes. Whether you're a student, a professional, or
          just someone who loves taking notes, Notess has everything you need to
          stay organized and on top of your work.
        </h1>
        <h1 className="text-center">
          {" "}
          With Notess, you can create, edit, and share your notes with others.
          You can also collaborate with your classmates or colleagues by sharing
          your notes and working together in real-time. Our platform is easy to
          use, intuitive, and designed to make note-taking a breeze.
        </h1>
      </div>
    </div>
  );
}
