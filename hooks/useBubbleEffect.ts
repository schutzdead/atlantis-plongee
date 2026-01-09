import { useState } from 'react';

export interface Bubble {
  id: number;
  x: number;
  y: number;
}

export function useBubbleEffect() {
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const [bubbleId, setBubbleId] = useState(0);

  const createBubbles = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Créer 5 bulles
    const newBubbles = Array.from({ length: 5 }, (_, i) => ({
      id: bubbleId + i,
      x: x + (Math.random() - 0.5) * 30,
      y: y + (Math.random() - 0.5) * 30,
    }));

    setBubbles(prev => [...prev, ...newBubbles]);
    setBubbleId(prev => prev + 5);

    // Supprimer les bulles après l'animation
    setTimeout(() => {
      setBubbles(prev => prev.filter(b => !newBubbles.find(nb => nb.id === b.id)));
    }, 1500);
  };

  const removeBubble = (id: number) => {
    setBubbles(prev => prev.filter(b => b.id !== id));
  };

  return { bubbles, createBubbles, removeBubble };
}
