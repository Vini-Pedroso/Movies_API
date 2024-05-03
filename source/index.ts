const express = require('express');
import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

app.get("/", async (req: Request, res: Response) => {
  res.json({ message: "Hello World" });
});

// Rotas para usuários

// GET geral de usuários
app.get("/users", async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao recuperar os usuários' });
  }
});

// GET específico de usuário
app.get("/users/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await prisma.user.findUnique({
      where: { id: id.toString() }
    });
    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao recuperar o usuário' });
  }
});

// POST de usuário
app.post("/users", async (req: Request, res: Response) => {
  const { name, email } = req.body;
  try {
    const user = await prisma.user.create({
      data: {
        name,
        email,
      },
    });
    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao criar o usuário' });
  }
});

// DELETE de usuário
app.delete("/users/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.user.delete({
      where: { id: id.toString() }
    });
    res.status(204).end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao excluir o usuário' });
  }
});

// Rotas para filmes

// GET geral de filmes
app.get("/movies", async (req: Request, res: Response) => {
  try {
    const movies = await prisma.movie.findMany();
    res.json(movies);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao recuperar os filmes' });
  }
});

// GET específico de filme
app.get("/movies/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const movie = await prisma.movie.findUnique({
      where: { id: id.toString() }
    });
    if (!movie) {
      return res.status(404).json({ error: 'Filme não encontrado' });
    }
    res.json(movie);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao recuperar o filme' });
  }
});

// POST de filme
app.post("/movies", async (req: Request, res: Response) => {
  const { title, year, description } = req.body;
  try {
    const movie = await prisma.movie.create({
      data: {
        title,
        year,
        description,
      },
    });
    res.status(201).json(movie);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao criar o filme' });
  }
});

// DELETE de filme
app.delete("/movies/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.movie.delete({
      where: { id: id.toString() }
    });
    res.status(204).end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao excluir o filme' });
  }
});

// Rotas para avaliações (reviews)

// GET geral de avaliações
app.get("/reviews", async (req: Request, res: Response) => {
  try {
    const reviews = await prisma.review.findMany();
    res.json(reviews);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao recuperar as avaliações' });
  }
});

// GET específico de avaliação
app.get("/reviews/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const review = await prisma.review.findUnique({
      where: { id: id.toString() }
    });
    if (!review) {
      return res.status(404).json({ error: 'Avaliação não encontrada' });
    }
    res.json(review);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao recuperar a avaliação' });
  }
});

// POST de avaliação
app.post("/reviews", async (req: Request, res: Response) => {
  const { rating, comment, userId, movieId } = req.body;
  try {
    const review = await prisma.review.create({
      data: {
        rating,
        comment,
        userId,
        movieId,
      },
    });
    res.status(201).json(review);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao criar a avaliação' });
  }
});

// DELETE de avaliação
app.delete("/reviews/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.review.delete({
      where: { id: id.toString() }
    });
    res.status(204).end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao excluir a avaliação' });
  }
});

app.listen(3334, () => console.log("Server running on port 3334"));
