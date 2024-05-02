import express from "express";

import { PrismaClient } from '@prisma/client'

import { Request, Response } from "express";

const prisma = new PrismaClient()

const app = express();

app.use(express.json());

app.get("/", async (req: Request, res: Response) => {
  res.json({ message: "Hello World" });
});

app.listen(3333, () => "server running on port 3333");
