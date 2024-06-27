"use client";

import InputLabel from "@/components/inputLabel";
import Navbar from "@/components/nav";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import React, { useState } from "react";
import vectorUpload from "./assets/vector-upload.png";

export default function Notes() {
  const [loading, setLoadin] = useState(false);
  const [pictureData, setPictureData] = useState({ url: "" });

  const handleChangePic = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setPictureData({ url: event.target.result });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="w-full h-[100vh] flex flex-col items-center ">
      <Navbar />
      <div className="py-[26px] px-[10rem] w-full h-full grid grid-cols-3 justify-between gap-6">
        <div className="col-span-2 flex flex-col items-center justify-center gap-4">
          <Input
            type="text"
            placeholder="Title"
            className="w-full h-[5vh] text-l text-black"
          />
          <Textarea placeholder="Note" className="w-full h-full" />
          <Button className="w-[15rem]">Add</Button>
        </div>
        <div className="col-span-1 flex flex-col justify-center items-center gap-6">
          <div className="w-full h-[50vh] aspect-square flex items-center flex-col justify-between gap-y-4">
            <div
              className={`cursor-pointer w-full max-lg:aspect-square lg:h-full flex justify-center items-center rounded-xl relative bg-[#F1F1F1]`}
            >
              <InputLabel
                type="file"
                accept="image/png, image/jpeg, image/heic, image/jpg"
                className="opacity-0 cursor-pointer w-[8vw] h-[8vh]"
                onChange={handleChangePic}
              />
              {loading ? (
                <div className="absolute flex items-center justify-center w-full h-full">
                  <GridLoader color="#C91F3B" />
                </div>
              ) : (
                <img
                  alt="Note's Picture"
                  src={
                    pictureData.url && !loading ? pictureData.url : vectorUpload
                  }
                  className={`absolute ${pictureData.url && !loading
                      ? "w-full h-full rounded-xl object-cover"
                      : "top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]"
                    } `}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
