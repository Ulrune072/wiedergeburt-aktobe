import { Router } from 'express';
import multer from 'multer';
import { put } from '@vercel/blob';
import { requireAuth } from '../middleware/auth.js';

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post('/', requireAuth, upload.single('file'), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file provided' });

  const blob = await put(req.file.originalname, req.file.buffer, {
    access: 'public',
    addRandomSuffix: true,
  });

  res.json({ url: blob.url });
});

export default router;