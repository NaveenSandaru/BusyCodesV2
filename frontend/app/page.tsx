"use client"

import UploadCV from "@/components/UploadCV";
import AskCV from "@/components/AskCV";
import SendEmail from "@/components/SendEmail";
import { useState } from "react";

export default function Home() {

  const [fileName, setFileName] = useState("");

  return (
    <div className="min-h-screen bg-gray-50 p-8 space-y-8">
      <h1 className="text-3xl font-bold text-center">CV Management Dashboard</h1>
      <div className="grid md:grid-cols-3 gap-8">
        <UploadCV setFileName={setFileName} />
        <AskCV fileName={fileName}/>
        <SendEmail />
      </div>
    </div>
  );
}
