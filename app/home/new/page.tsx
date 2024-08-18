'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function NewPosterPage() {
  const [userName, setUserName] = useState<string | null>(null);
  const [tag, setTag] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [boardId, setBoardId] = useState('');
  const router = useRouter();

  useEffect(() => {
    const savedName = localStorage.getItem('userName');
    if (savedName) {
      setUserName(savedName);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (userName) {
      const response = await fetch('/api/posters', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ tag, title, content, boardId, author: userName }),
      });

      if (response.ok) {
        router.push('/');
        console.log('Poster created successfully');
      } else {
        console.error('Failed to create poster');
      }
    } else {
      console.error('Username not found in localStorage');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Tag:</label>
        <input type="text" value={tag} onChange={(e) => setTag(e.target.value)} required />
      </div>
      <div>
        <label>Title:</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
      </div>
      <div>
        <label>Content:</label>
        <textarea value={content} onChange={(e) => setContent(e.target.value)} required />
      </div>
      <div>
        <label>Board ID:</label>
        <input type="number" value={boardId} onChange={(e) => setBoardId(e.target.value)} required />
      </div>
      <button type="submit">Create Poster</button>
    </form>
  );
}
