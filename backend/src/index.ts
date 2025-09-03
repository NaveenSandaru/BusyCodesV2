import dotenv from "dotenv";

dotenv.config();

import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import server from "./mcpServer.js";
import multer from "multer";
import { Request, Response } from "express";

interface MulterRequest extends Request {
  file?: Express.Multer.File;
}

const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 5000;

async function invokeTool(toolName: string, input: any) {
  const tools = (server as any)._registeredTools;
  if (!tools || !tools[toolName]) {
    throw new Error(`Tool "${toolName}" not found`);
  }

  const tool = tools[toolName];
  return await tool.callback(input);
}

const storage = multer.memoryStorage();
const upload = multer({ storage, limits: { fileSize: 50 * 1024 * 1024 } });

app.post("/upload_cv", upload.single("file"), async (req: MulterRequest, res: Response) => {
  const file = req.file;
  if (!file) return res.status(400).json({ error: "No file uploaded" });

  try {
    const result = await invokeTool("upload_cv", {
      filename: file.originalname,
      file_base64: file.buffer.toString("base64"),
    });
    res.json(result);
  } catch (err: any) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

app.post("/ask_cv", async (req, res) => {
  const { filename, question } = req.body;
  if (!filename || !question) return res.status(400).json({ error: "Missing parameters" });

  try {
    const result = await invokeTool("ask_cv", { filename, question });
    res.json(result);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/send_email", async (req, res) => {
  const { to, subject, body } = req.body;
  if (!to || !subject || !body) return res.status(400).json({ error: "Missing parameters" });

  try {
    const result = await invokeTool("send_email", { to, subject, body });
    res.json(result);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/test", async (req, res)=> {
  try{
    const result = await invokeTool("test",{});
    res.json(result);
  }
  catch(err: any){
    res.status(500).json({error: err.message});
  }
});

app.listen(PORT, () => console.log(`Backend API running on http://localhost:${PORT}`));