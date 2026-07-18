import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.newsArticle.createMany({
    data: [
      {
        title: 'Открытие нового учебного года',
        excerpt: 'В обществе "Возрождение" стартовали курсы немецкого языка.',
        content: 'Полный текст новости здесь...',
        publishedAt: new Date(),
      },
      {
        title: 'Культурный вечер',
        excerpt: 'Прошёл ежегодный культурный вечер общества.',
        content: 'Полный текст новости здесь...',
        publishedAt: new Date(),
      },
    ],
  });

  await prisma.partner.createMany({
    data: [
      { name: 'Wiedergeburt.kz', logoUrl: '/partner1.png', websiteUrl: 'http://www.wiedergeburt.kz' },
      { name: 'Wiedergeburt Pavlodar', logoUrl: '/partner2.png', websiteUrl: 'http://www.wiedergeburt-pavlodar.kz' },
    ],
  });
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });