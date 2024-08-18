'use client';

import { useState, useEffect } from 'react';
import NamePopup from '@/app/components/popup';


interface Poster {
    id: number;
    tag: string;
    title: string;
    content: string;
    author: string;
  }
  
  interface Board {
    id: number;
    name: string;
    contents: Poster[];
  }

export default function MainPage() {
  const [userName, setUserName] = useState<string | null>(null);
  const [isPopupVisible, setIsPopupVisible] = useState<boolean>(false);
  const [boards, setBoards] = useState<Board[]>([]);


  useEffect(() => {
    const savedName = localStorage.getItem('userName');
    // 初回ロード時にポップアップを表示
    if (savedName) {
        setUserName(savedName);
        setIsPopupVisible(false);
      } else {
        setIsPopupVisible(true);
      }
    }, []);

  const handleNameSubmit = (name: string) => {
    localStorage.setItem('userName', name);
    setUserName(name);
    setIsPopupVisible(false); // ポップアップを閉じる
  };

  useEffect(() => {
    const fetchBoards = async () => {
      try {
        const response = await fetch('/api/boards');
        if (response.ok) {
          const data: Board[] = await response.json();
          setBoards(data);
        } else {
          console.error('Failed to fetch boards');
        }
      } catch (error) {
        console.error('Error fetching boards:', error);
      }
    };

    fetchBoards();
  }, []);

  return (
    <>
    <div>
      {isPopupVisible && <NamePopup onSubmit={handleNameSubmit} />}
      {userName ? <h1>Welcome, {userName}!</h1> : <p>Please enter your name.</p>}
    </div>
        <div>
          <h1>Boards</h1>
          {boards.map((board) => (
            <div key={board.id}>
              <h2>{board.name}</h2>
              <ul>
                {board.contents.map((poster) => (
                  <li key={poster.id}>
                    <h3>{poster.title}</h3>
                    <p>{poster.content}</p>
                    <p><strong>Author:</strong> {poster.author}</p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        </>
      );
}


