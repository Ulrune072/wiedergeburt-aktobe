import { Router } from 'express';
import { del } from '@vercel/blob';
import { prisma } from '../lib/prisma.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

router.get('/', async (_req, res) => {
  const images = await prisma.galleryImage.findMany({ orderBy: { createdAt: 'desc' } });
  res.json(images);
});

router.post('/', requireAuth, async (req, res) => {
  const { url, caption } = req.body;
  const image = await prisma.galleryImage.create({ data: { url, caption } });
  res.json(image);
});

router.delete('/:id', requireAuth, async (req, res) => {
  const image = await prisma.galleryImage.findUnique({ where: { id: Number(req.params.id) } });
  if (image) {
    await del(image.url).catch(() => {});
  }
  await prisma.galleryImage.delete({ where: { id: Number(req.params.id) } });
  res.json({ success: true });
});

export default router;