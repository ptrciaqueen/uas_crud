"use client";

import Navbar from "@/components/nav";
import React, { useCallback, useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { InputWithButton } from "@/components/searchbar";
import { useRouter } from "next/navigation";
import { useGetAllNote } from "@/hooks/useCustom";
import Link from "next/link";
import { dateConvert } from "@/utils/dateConverter";
import debounce from "lodash.debounce";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [notes, setNotes] = useState([]);
  const router = useRouter();
  const limit = 6;

  const { data, refetch, isLoading } = useGetAllNote(limit, page - 1, search);

  const onSubmit = () => {
    setLoading(isLoading);
    refetch();
  };

  const debounceSubmit = debounce(onSubmit, 400);
  const _debounceSubmit = useCallback(debounceSubmit, []);

  const onSearchChange = (e) => {
    setSearch(e.target.value);
    _debounceSubmit();
  };

  const toNextPage = () => {
    if (page < data?.data?.data?.totalPage) {
      setPage(page + 1);
    }
    _debounceSubmit();
  };

  const toPreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
    _debounceSubmit();
  };

  useEffect(() => {
    const storage = typeof window !== "undefined" ? localStorage : null;
    const token = storage ? storage.getItem("access_token") : null;

    if (!token) {
      router.push("/");
    }
  }, [router]);

  useEffect(() => {
    if (data?.data?.data?.notes.length) {
      setNotes(data?.data?.data?.notes);
    } else {
      setNotes([]);
    }
    setLoading(isLoading);
  }, [data]);

  return (
    <div className="w-full h-[100vh] flex flex-col items-center ">
      <Navbar />
      <div className="pt-6 w-[70vw] flex justify-center">
        <InputWithButton
          searchState={search}
          onSearchChangeCb={onSearchChange}
        />
      </div>
      <div className="py-[26px] px-[10rem] w-full flex flex-wrap justify-evently gap-6">
        {notes.map((e) => {
          return (
            <Link href={`/notes/${e.id}`} key={e.id}>
              <Card className="flex flex-col w-[25vw]">
                <CardHeader className="text-center">
                  <CardTitle>{e.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p>{e.note}</p>
                </CardContent>
                <CardFooter className="text-end">
                  <p>{dateConvert(e.createdAt)}</p>
                </CardFooter>
              </Card>
            </Link>
          );
        })}
      </div>

      <div className="flex paddingYShorter3 justify-center items-center gap-4 max-md:w-full">
        <Button
          className="btn min-h-[2rem] h-[2rem] p hover:bg-black hover:text-white"
          onClick={toPreviousPage}
          variant="outline"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <p className="font-medium pBigger">
          {page} / {data?.data?.data?.totalPage}
        </p>
        <Button
          className="btn  min-h-[2rem] h-[2rem] p hover:bg-black hover:text-white"
          onClick={toNextPage}
          variant="outline"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
