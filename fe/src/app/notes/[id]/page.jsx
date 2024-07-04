"use client";

import Navbar from "@/components/nav";
import { Button } from "@/components/ui/button";
import { useDeleteNoteById, useGetNoteById } from "@/hooks/useCustom";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";

const page = () => {
  const { id } = useParams();
  const router = useRouter();
  const { mutate: deleteNote } = useDeleteNoteById();
  const { data } = useGetNoteById(id);

  const handleDeleteNote = (noteId) => {
    deleteNote(noteId, {
      onSuccess: () => {
        router.push("/home");
      },
      onError: (error) => {
        console.log(error);
      },
    });
  };

  if (!data) {
    return (
      <div className="w-full h-[100vh] flex flex-col items-center ">
        <Navbar />
        Loading...
      </div>
    );
  }

  const noteData = data?.data?.data;

  return (
    <div className="w-full h-[100vh] flex flex-col items-center ">
      <Navbar />
      <div className="w-full pt-[40px] px-[10rem] flex justify-start gap-5">
        <Button
          className="flex w-[8rem] hover:bg-black hover:text-white"
          variant="outline"
        >
          <Link
            href={`/home`}
            className="w-full h-full flex justify-start items-center gap-3 text-center"
          >
            <ChevronLeft className="w-4 h-4" />
            Back
          </Link>
        </Button>{" "}
      </div>
      <div className="py-[26px] px-[10rem] w-full h-full">
        <div className="w-full h-[100vh] flex flex-col items-center justify-center gap-5">
          <h1 className="text-3xl font-bold">{noteData?.title}</h1>
          {noteData?.img_url && (
            <img
              src={`${process.env.NEXT_PUBLIC_APP_API_STATIC}/${noteData.img_url}`}
              className="object-contain w-full h-[50vh] rounded-2xl"
              alt="Note"
            />
          )}
          <p className="text-xl font-mono w-[50%]">{noteData?.note}</p>
          <div className="flex flex-wrap justify-evenly items-center w-full pt-9">
            <Button variant="destructive" onClick={() => handleDeleteNote(id)}>
              Delete
            </Button>
            <Button variant="outline">
              <Link href={`/notes/update/${id}`}>Update</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
