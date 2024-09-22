import React, { useState, useEffect } from 'react';
import { FaDiscord } from 'react-icons/fa';

interface Task {
  id: number;
  text: string;
  linkText: string;
  link: string;
  buttonText: string;
  extraContent?: string;
}

interface TaskData {
  lastModified: number;
  tasks: Task[];
}

interface TaskProps extends Task {
  isCompleted: boolean;
  isDisabled: boolean;
  onComplete: () => void;
}

const Task: React.FC<TaskProps> = ({
  text,
  linkText,
  link,
  buttonText,
  extraContent,
  isCompleted,
  isDisabled,
  onComplete,
}) => {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isCompleted && !isDisabled) {
      onComplete();
      window.open(link, '_blank');
    }
  };

  return (
    <div className={`border-b last:border-b-0 py-2 px-3 ${isDisabled ? 'opacity-50' : ''}`}>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
        <div className="flex items-center space-x-2 mb-2 sm:mb-0">
          <FaDiscord className="text-[#5865F2] flex-shrink-0 text-sm" />
          <span className="text-sm font-medium">
            {text}{' '}
            <a
              href={isDisabled ? undefined : link}
              target="_blank"
              rel="noopener noreferrer"
              className={`text-[#5865F2] hover:text-[#4752C4] font-bold ${isDisabled ? 'pointer-events-none' : ''}`}
              onClick={(e) => {
                e.stopPropagation();
                if (isDisabled) e.preventDefault();
              }}
            >
              {linkText}
            </a>
            {' '}on Discord
          </span>
        </div>
        <button
          onClick={handleClick}
          className={`bg-[#5865F2] hover:bg-[#4752C4] text-white font-bold px-3 py-1 rounded text-xs transition-colors duration-200 min-w-[80px] ${isDisabled || isCompleted ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={isDisabled || isCompleted}
        >
          {buttonText}
        </button>
      </div>
      {extraContent && (
        <div className="text-xs mt-1">{extraContent}</div>
      )}
    </div>
  );
};

const DiscordTaskList: React.FC = () => {
  const [completedTasks, setCompletedTasks] = useState<number[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [lastModified, setLastModified] = useState<number>(0);

  const fetchTasks = async () => {
    try {
      const response = await fetch('/TaskTwitter.txt');
      const data: TaskData = await response.json();
      
      if (data.lastModified > lastModified) {
        setTasks(data.tasks);
        setLastModified(data.lastModified);
      }
    } catch (error) {
      console.error('Error loading tasks:', error);
    }
  };

  useEffect(() => {
    fetchTasks();
    const intervalId = setInterval(fetchTasks, 5000); // Check every 5 seconds

    return () => clearInterval(intervalId);
  }, [lastModified]);

  const handleComplete = (id: number) => {
    setCompletedTasks([...completedTasks, id]);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden w-full flex flex-col h-full border-4 border-[#5865F2]">
      <div className="bg-[#5865F2] text-white p-3 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <FaDiscord className="text-lg" />
          <span className="font-bold text-lg">Discord</span>
        </div>
        <span className="text-sm">{completedTasks.length}/{tasks.length} Tasks</span>
      </div>
      <div className="bg-white flex-grow overflow-y-auto">
        {tasks.map((task) => (
          <Task
            key={task.id}
            {...task}
            isCompleted={completedTasks.includes(task.id)}
            isDisabled={task.id > completedTasks.length}
            onComplete={() => handleComplete(task.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default DiscordTaskList;
