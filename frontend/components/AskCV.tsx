"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, MessageSquare } from "lucide-react";
import { askCV } from "@/lib/api";

interface AskCVProps {
  fileName: string;
}

export default function AskCV({ fileName }: AskCVProps) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [asking, setAsking] = useState(false);

  const handleAsk = async () => {
    setAsking(true);
    try {
      if (!fileName || !question) {
        if(!fileName){
          window.alert("Please Upload the file first");
        }
        else if(!question){
          window.alert("Ask a question please");
        }
        return;
      }
      const res = await askCV(fileName, question);
      setAnswer(res.data.content[0].text);
    }
    catch (err: any) {
      window.alert(err.message);
    }
    finally {
      setAsking(false);
    }
  };

  return (
    <div className="p-4 border rounded-md shadow-sm space-y-4">
      <h2 className="text-xl font-bold">Ask about CV</h2>
      <textarea
        placeholder="Your question"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        className="textarea textarea-bordered w-full"
      />

      <Button disabled={asking} onClick={handleAsk} className="flex items-center gap-2">
        {asking? <Loader2 className="animate-spin"/> : <MessageSquare />} {asking? "Asking..." : "Ask"}
      </Button>
      {answer && <p className="text-blue-600">{answer}</p>}
    </div>
  );
}