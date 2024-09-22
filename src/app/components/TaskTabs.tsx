import React, { useState } from 'react';
import KickTask from './KickTask';
import DiscordTaskList from './DiscordTaskList';
import TaskList from './TaskList';

const TaskTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'kick' | 'discord' | 'twitter'>('kick');

  const handleTabClick = (tab: 'kick' | 'discord' | 'twitter') => {
    setActiveTab(tab);
  };

  return (
    <div className="flex flex-col w-full">
      <div className="flex space-x-2 mb-4">
        {['kick', 'discord', 'twitter'].map((tab) => (
          <button
            key={tab}
            onClick={() => handleTabClick(tab as 'kick' | 'discord' | 'twitter')}
            className={`px-4 py-2 rounded-t-lg font-bold ${
              activeTab === tab
                ? 'bg-white text-black'
                : 'bg-gray-700 text-white'
            }`}
            onKeyDown={(e) => e.preventDefault()}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>
      <div className="bg-white rounded-b-lg p-4">
        {activeTab === 'kick' && <KickTask />}
        {activeTab === 'discord' && <DiscordTaskList />}
        {activeTab === 'twitter' && <TaskList />}
      </div>
    </div>
  );
};

export default TaskTabs;
