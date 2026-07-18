import { Router } from 'express';
import { prisma } from '../lib/prisma.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

router.get('/', async (_req, res) => {
  const news = await prisma.newsArticle.findMany({ orderBy: { publishedAt: 'desc' } });
  res.json(news);
});

router.post('/', requireAuth, async (req, res) => {
  const { title, excerpt, content, imageUrl } = req.body;
  const article = await prisma.newsArticle.create({
    data: { title, excerpt, content, imageUrl },
  });
  res.json(article);
});

router.put('/:id', requireAuth, async (req, res) => {
  const { title, excerpt, content, imageUrl } = req.body;
  const article = await prisma.newsArticle.update({
    where: { id: Number(req.params.id) },
    data: { title, excerpt, content, imageUrl },
  });
  res.json(article);
});

router.delete('/:id', requireAuth, async (req, res) => {
  await prisma.newsArticle.delete({ where: { id: Number(req.params.id) } });
  res.json({ success: true });
});

export default router;