import { Router } from 'express';
import multer from 'multer';
import { put } from '@vercel/blob';
import { requireAuth } from '../middleware/auth.js';

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post('/', requireAuth, upload.array('files', 10), async (req, res) => {
  const files = req.files as Express.Multer.File[];
  if (!files || files.length === 0) return res.status(400).json({ error: 'No files provided' });

  const urls = await Promise.all(
    files.map(async (file) => {
      const blob = await put(file.originalname, file.buffer, {
        access: 'public',
        addRandomSuffix: true,
      });
      return blob.url;
    })
  );

  res.json({ urls });
});

export default router;