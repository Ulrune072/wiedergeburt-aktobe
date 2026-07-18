import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import newsRouter from './routes/news.js';
import authRouter from './routes/auth.js';
import uploadRouter from './routes/upload.js';
import galleryRouter from './routes/gallery.js';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/news', newsRouter);
app.use('/api/auth', authRouter);
app.use('/api/upload', uploadRouter);
app.use('/api/gallery', galleryRouter);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

export default app;