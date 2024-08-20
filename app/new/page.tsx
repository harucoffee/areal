'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/app/components/header';

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
        body: JSON.stringify({ tag, title, content, boardId: 1, author: userName }),
      });

      if (response.ok) {
        router.push('/home');
        console.log('Poster created successfully');
      } else {
        console.error('Failed to create poster');
      }
    } else {
      console.error('Username not found in localStorage');
    }
  };

  return (
    <>
    <Header />
    <form className="flex flex-col items-center justify-center" onSubmit={handleSubmit}>
      <div className="m-2">
        <label>Tag:</label>
        <input className="border-2 border-gray-300 rounded-md p-2" type="text" value={tag} onChange={(e) => setTag(e.target.value)} required />
      </div>
      <div className="m-2">
        <label>Title:</label>
        <input className="border-2 border-gray-300 rounded-md p-2" type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
      </div>
      <div className="flex flex-col m-2">
        <label>Content:</label>
        <textarea className="border-2 border-gray-300 rounded-md p-2 w-full h-40" value={content} onChange={(e) => setContent(e.target.value)} required />
      </div>
     
        <button className="bg-blue-500 text-white rounded-md p-2" type="submit">Create Poster</button>
    </form>
    </>
  );
}
