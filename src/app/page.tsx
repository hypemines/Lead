'use client'

import { TrophyIcon, ClipboardDocumentIcon } from '@heroicons/react/24/solid'
import Timer from './components/Timer'
import { useEffect } from 'react';
import { useState } from 'react'
import { Tooltip } from 'react-tooltip';
import TaskList from './components/TaskList';
import DiscordTaskList from './components/DiscordTaskList';
import KickTask from './components/KickTask';
import { Aeonik } from './fonts';
import TaskTabs from './components/TaskTabs';
import styles from './page.module.css';

const HomePage: React.FC = () => {
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText("HYPEMINES").then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    });
  };

  useEffect(() => {
    const title = document.getElementById('leaderboard-title');
    if (title) {
      title.classList.add('animate-pulse');
    }
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4 bg-blue-900">
      <div className="text-center mb-8">
        <h1 
          id="leaderboard-title"
          className="text-4xl md:text-6xl font-extrabold text-white"
        >
          $20,000 LEADERBOARD
        </h1>
        <h2 className={`${Aeonik.className} text-lg md:text-2xl font-bold text-white mt-2 md:mt-3`}>
          USE CODE <span 
            className="cursor-pointer underline"
            onClick={copyToClipboard}
            data-tooltip-id="copy-tooltip"
            data-tooltip-content={isCopied ? "Copied!" : "Copy the CODE"}
          >HYPEMINES</span> ON ROOBET TO PARTICIPATE
        </h2>
      </div>

      <Tooltip 
        id="copy-tooltip" 
        place="bottom"
        style={{
          backgroundColor: "#1e293b",
          color: "white",
          borderRadius: "0.5rem",
          padding: "0.5rem 1rem",
          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        }}
        opacity={1}
        noArrow={true}
        render={({ content }) => (
          <div className="flex items-center space-x-2">
            <span className="text-yellow-400">✨</span>
            <span>{content}</span>
          </div>
        )}
      />

      <Timer />
      
      <div className="flex flex-col md:flex-row justify-center items-stretch space-y-4 md:space-y-0 md:space-x-4 w-full max-w-6xl">
        <div className="flex-1 flex flex-col min-h-[300px] relative">
          <TaskList />
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-blue-500 to-transparent opacity-30 blur-md"></div>
        </div>
        <div className="flex-1 flex flex-col min-h-[300px] relative">
          <DiscordTaskList />
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#5865F2] to-transparent opacity-30 blur-md"></div>
        </div>
        <div className="flex-1 flex flex-col min-h-[300px] relative">
          <KickTask />
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#53FC18] to-transparent opacity-30 blur-md"></div>
        </div>
      </div>
    </main>
  );
};

export default HomePage;
