'use client';

import { useState, useEffect } from 'react';
import NamePopup from '@/app/components/popup';
import Poster from '@/app/components/poster';
import New from '@/app/components/new';


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
    </div>
        <div>
          {boards.map((board) => (
            <div key={board.id}>
              <ul>
              <li key={board.id}>
                {board.contents.map((poster) => (
                    <Poster key={poster.id} tag={poster.tag} name={poster.author} text={poster.content} />
                ))}
                </li>
              </ul>
            </div>
          ))}
        </div>
        <a href="/home/new">
            <New />
        </a>
        </>
      );
}


