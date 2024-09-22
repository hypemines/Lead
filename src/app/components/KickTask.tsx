import React, { useState, useEffect } from 'react';

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

const KickLogo: React.FC<{ color?: string }> = ({ color = "white" }) => (
  <svg width="24" height="24" viewBox="0 0 934 300" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M0 0H100V66.6667H133.333V33.3333H166.667V0H266.667V100H233.333V133.333H200V166.667H233.333V200H266.667V300H166.667V266.667H133.333V233.333H100V300H0V0ZM666.667 0H766.667V66.6667H800V33.3333H833.333V0H933.333V100H900V133.333H866.667V166.667H900V200H933.333V300H833.333V266.667H800V233.333H766.667V300H666.667V0ZM300 0H400V300H300V0ZM533.333 0H466.667V33.3333H433.333V266.667H466.667V300H533.333H633.333V200H533.333V100H633.333V0H533.333Z" fill={color}/>
  </svg>
);

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
          <KickLogo color="#53FC18" />
          <span className="text-sm font-medium">
            {text}{' '}
            <a
              href={isDisabled ? undefined : link}
              target="_blank"
              rel="noopener noreferrer"
              className={`text-[#53FC18] hover:text-[#3FBE12] font-bold ${isDisabled ? 'pointer-events-none' : ''}`}
              onClick={(e) => {
                e.stopPropagation();
                if (isDisabled) e.preventDefault();
              }}
            >
              {linkText}
            </a>
            {' '}on Kick
          </span>
        </div>
        <button
          onClick={handleClick}
          className={`bg-[#53FC18] hover:bg-[#3FBE12] text-black font-bold px-3 py-1 rounded text-xs transition-colors duration-200 min-w-[80px] ${isDisabled || isCompleted ? 'opacity-50 cursor-not-allowed' : ''}`}
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

const KickTask: React.FC = () => {
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
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden w-full flex flex-col h-full border-4 border-[#53FC18]">
      <div className="bg-[#53FC18] p-3 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <KickLogo />
          <span className="font-bold text-lg text-black">Kick</span>
        </div>
        <span className="text-sm text-black">{completedTasks.length}/{tasks.length} Tasks</span>
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

export default KickTask;
