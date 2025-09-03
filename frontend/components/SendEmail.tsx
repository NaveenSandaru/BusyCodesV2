"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, Mail } from "lucide-react";
import { sendEmail } from "@/lib/api";

export default function SendEmail() {
  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [message, setMessage] = useState("");
  const [sendingEmail, setSendingEmail] = useState(false);

  const handleSend = async () => {
    setSendingEmail(true);
    try {
      if (!to || !subject || !body) return;
      const res = await sendEmail(to, subject, body);
      setMessage(res.data.content[0].text);
    }
    catch (err: any) {
      window.alert(err.message);
    }
    finally{
      setSendingEmail(false);
    }
  };

  return (
    <div className="p-4 border rounded-md shadow-sm space-y-4">
      <h2 className="text-xl font-bold">Send Email</h2>
      <input
        type="email"
        placeholder="Recipient"
        value={to}
        onChange={(e) => setTo(e.target.value)}
        className="input input-bordered w-full"
      />
      <input
        type="text"
        placeholder="Subject"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        className="input input-bordered w-full"
      />
      <textarea
        placeholder="Body"
        value={body}
        onChange={(e) => setBody(e.target.value)}
        className="textarea textarea-bordered w-full"
      />
      <Button disabled={sendingEmail} onClick={handleSend} className="flex items-center gap-2">
        {sendingEmail? <Loader2 className="animate-spin"></Loader2> : <Mail />} {sendingEmail? "Sending...": "Send"}
      </Button>
      {message && <p className="text-green-600">{message}</p>}
    </div>
  );
}
