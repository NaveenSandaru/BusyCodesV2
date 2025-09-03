"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { UploadCloud } from "lucide-react";

interface UploadCVProps {
  setFileName: (name: string) => void;
};

export default function UploadCV({setFileName}:UploadCVProps) {
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState("");

  const handleUpload = async () => {
  if (!file) return;

  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch("http://localhost:5000/upload_cv", {
    method: "POST",
    body: formData,
  });

  const data = await res.json();
  const fileName = data.content[0].text.split("'")[1];
  setFileName(fileName);
  setMessage(data.content[0].text);
};

  return (
    <div className="p-4 border rounded-md shadow-sm space-y-4">
      <h2 className="text-xl font-bold">Upload CV</h2>
      <input type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} />
      <Button onClick={handleUpload} className="flex items-center gap-2">
        <UploadCloud /> Upload
      </Button>
      {message && <p className="text-green-600">{message}</p>}
    </div>
  );
}
