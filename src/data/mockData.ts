
import { TopList, ListItem } from '@/types/list';

const sampleImages = [
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400',
  'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400',
  'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=400',
  'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=400',
  'https://images.unsplash.com/photo-1493770348161-369560ae357d?w=400'
];

const techKeywords = ['Innovation', 'Future', 'AI', 'Tech', 'Digital', 'Smart', 'Cloud', 'Data', 'Code', 'Web'];
const movieKeywords = ['Epic', 'Legendary', 'Classic', 'Masterpiece', 'Iconic', 'Brilliant', 'Stunning', 'Timeless'];

export const generateMockList = (keyword: string): TopList => {
  const id = Math.random().toString(36).substr(2, 9);
  const items: ListItem[] = [];
  
  const isMovieList = keyword.toLowerCase().includes('movie') || keyword.toLowerCase().includes('film');
  const keywords = isMovieList ? movieKeywords : techKeywords;
  
  for (let i = 1; i <= 100; i++) {
    const itemId = Math.random().toString(36).substr(2, 9);
    const randomKeyword = keywords[Math.floor(Math.random() * keywords.length)];
    
    items.push({
      id: itemId,
      name: `${randomKeyword} ${keyword} #${i}`,
      rank: i,
      tagline: `The ${randomKeyword.toLowerCase()} choice for ${keyword.toLowerCase()} enthusiasts`,
      description: `This exceptional ${keyword.toLowerCase()} item represents the pinnacle of quality and innovation. A must-have for anyone serious about ${keyword.toLowerCase()}.`,
      image: sampleImages[Math.floor(Math.random() * sampleImages.length)],
      tags: [keyword, randomKeyword, `Rank${i}`, i <= 10 ? 'Top10' : i <= 50 ? 'Top50' : 'Featured']
    });
  }

  return {
    id,
    name: `Top 100 ${keyword}`,
    rank: 1,
    tagline: `The definitive ranking of the best ${keyword.toLowerCase()} available`,
    description: `Discover the ultimate collection of ${keyword.toLowerCase()} items, carefully curated and ranked by experts. From the absolute best to hidden gems, this comprehensive list covers everything you need to know.`,
    image: sampleImages[0],
    tags: [keyword, 'Top100', 'Featured', 'Expert'],
    items,
    createdAt: new Date(),
    updatedAt: new Date(),
    createdBy: 'demo-user'
  };
};

export const sampleLists: TopList[] = [
  generateMockList('Movies'),
  generateMockList('Restaurants'),
  generateMockList('Books'),
  generateMockList('Tech Products'),
  generateMockList('Travel Destinations')
];
