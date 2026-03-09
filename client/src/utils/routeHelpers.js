export const resolveImageUrl = (imageUrl) => {
  if (!imageUrl) return 'https://placehold.co/600x400?text=No+Image';
  if (imageUrl.startsWith('http')) return imageUrl;
  const base = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
  return `${base.replace('/api', '')}${imageUrl}`;
};
