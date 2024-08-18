'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function NewPoster() {
  const [tag, setTag] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [boardId, setBoardId] = useState('');
  const [boardName, setBoardName] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch('/api/posters', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ tag, title, content, boardId, boardName }),
    });

    if (res.ok) {
      router.push('/');
    } else {
      console.error('Failed to create poster');
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
        <label>Board ID (Optional):</label>
        <input type="number" value={boardId} onChange={(e) => setBoardId(e.target.value)} />
      </div>
      <div>
        <label>Board Name (If no ID):</label>
        <input type="text" value={boardName} onChange={(e) => setBoardName(e.target.value)} />
      </div>
      <button type="submit">Create Poster</button>
    </form>
  );
}
