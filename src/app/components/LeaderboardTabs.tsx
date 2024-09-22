import React, { useState } from 'react';
import Image from 'next/image';
import Timer from './Timer';

interface TabProps {
  title: string;
  amount: string;
  isActive: boolean;
  onClick: () => void;
}

const Tab: React.FC<TabProps> = ({ title, amount, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`leaderboard-tab min-h-[72px] h-auto w-full sm:w-[19.375em] rounded-lg p-[.0625rem] transition ${
      isActive
        ? 'bg-gradient-to-b from-[#48485F] to-[#262535] opacity-100'
        : 'bg-gradient-to-b from-[#48485F] to-[#262535] opacity-50'
    }`}
  >
    <div className="relative bg-gradient-radial from-[#22222D] to-[#1A1A24] rounded-[inherit] w-full h-full">
      <div className="absolute w-full h-full inset-0 bg-[radial-gradient(103.71%_100%_at_49.63%_0%,_rgba(95,89,72,0.20)_0%,_rgba(30,30,40,0.00)_100%)]"></div>
      <div className="relative grid grid-cols-2 items-center justify-between px-6 py-4 h-full">
        <div className="flex flex-col items-start gap-1">
          <p className="text-base font-bold text-white capitalize w-full truncate text-left">{title}</p>
          <Timer />
        </div>
        <div className="flex flex-row items-center justify-end gap-2.5">
          <Image
            src="/static/image/stack-of-coins-small.530ca18a.webp"
            width={23}
            height={20.68345323741007}
            alt=""
            className="w-7"
          />
          <div className="relative">
            <svg
              width="100"
              height="72"
              viewBox="0 0 100 72"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={`absolute w-[75px] h-[65px] top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 -mt-1 ${
                isActive ? 'text-[#FFAE39]' : 'text-grey-75'
              }`}
            >
              {/* SVG content */}
            </svg>
            <div className="relative text-[28px] font-black uppercase [textShadow:0_0_16px_rgba(255,174,57,0.25)] z-1">
              {amount}
            </div>
            <span className="absolute left-0 -top-[1px] text-[28px] font-black uppercase">{amount}</span>
          </div>
        </div>
      </div>
    </div>
  </button>
);

const LeaderboardTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'leaderboard' | 'raffles'>('leaderboard');

  return (
    <div className="leaderboard-content-top__buttons flex flex-col sm:flex-row gap-4 justify-center px-6">
      <Tab
        title="Leaderboard"
        amount="100K"
        isActive={activeTab === 'leaderboard'}
        onClick={() => setActiveTab('leaderboard')}
      />
      <Tab
        title="Raffles"
        amount="50K"
        isActive={activeTab === 'raffles'}
        onClick={() => setActiveTab('raffles')}
      />
    </div>
  );
};

export default LeaderboardTabs;
