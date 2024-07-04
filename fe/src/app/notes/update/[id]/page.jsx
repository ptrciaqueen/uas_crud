"use client";

import Navbar from "@/components/nav";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useGetNoteById, useUpdateNoteById } from "@/hooks/useCustom";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const page = () => {
  const { id } = useParams();
  const { data: noteData } = useGetNoteById(id);
  const [data, setData] = useState({
    title: "",
    note: "",
  });
  const { mutate: updateNote } = useUpdateNoteById();
  const router = useRouter();

  useEffect(() => {
    const storage = typeof window !== "undefined" ? localStorage : null;
    const token = storage ? storage.getItem("access_token") : null;

    if (!token) {
      router.push("/");
    }
  }, [router]);

  useEffect(() => {
    if (noteData && noteData.data && noteData.data.data) {
      setData({
        title: noteData.data.data.title,
        note: noteData.data.data.note,
      });
    }
  }, [noteData]);

  const updatedData = { id, body: data };

  const handleUpdateNote = (updatedData) => {
    updateNote(updatedData, {
      onSuccess: () => {
        router.push(`/notes/${id}`);
      },
      onError: (error) => {
        console.log(error);
      },
    });
  };

  return (
    <div className="w-full h-[100vh] flex flex-col items-center">
      <Navbar />
      <div className="w-full pt-[40px] px-[10rem] flex justify-start gap-5">
        <Button
          className="flex w-[8rem] hover:bg-black hover:text-white"
          variant="outline"
        >
          <Link
            href={`/notes/${id}`}
            className="w-full h-full flex justify-start items-center gap-3 text-center"
          >
            <ChevronLeft className="w-4 h-4" />
            Back
          </Link>
        </Button>{" "}
      </div>
      <div className="w-full h-full py-[40px] px-[10rem] flex flex-col justify-center items-center gap-5">
        <Input
          type="text"
          placeholder="Title"
          className="w-full h-[5vh] text-l text-black"
          onChange={(e) => setData({ ...data, title: e.target.value })}
          value={data.title}
        />
        <Textarea
          placeholder="Note"
          className="w-full h-full"
          onChange={(e) => setData({ ...data, note: e.target.value })}
          value={data.note}
        />
        <Button
          className="w-[15rem] hover:bg-white hover:text-black hover:border"
          onClick={() => handleUpdateNote(updatedData)}
        >
          Update
        </Button>
      </div>
    </div>
  );
};

export default page;
