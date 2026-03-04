import React from 'react';
import type { Task } from '../App';

interface TaskCardProps {
  task: Task;
  columnId: string;
  onDragStart: (task: Task, columnId: string) => void;
  onDelete: (taskId: string, columnId: string) => void;
  index: number;
}

export function TaskCard({ task, columnId, onDragStart, onDelete, index }: TaskCardProps) {
  const priorityConfig = {
    HIGH: { bg: '#FF3B3B', text: 'white' },
    MED: { bg: '#FFD700', text: 'black' },
    LOW: { bg: '#00FF88', text: 'black' },
  };

  const priority = priorityConfig[task.priority];

  return (
    <div
      draggable
      onDragStart={() => onDragStart(task, columnId)}
      className="group border-4 border-black bg-white cursor-grab active:cursor-grabbing
                 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-0.5 hover:-translate-y-0.5
                 transition-all duration-75"
      style={{
        animationDelay: `${index * 50}ms`,
      }}
    >
      {/* Task Header */}
      <div className="border-b-2 border-black px-2 md:px-3 py-1.5 md:py-2 flex items-start justify-between gap-2">
        <h3 className="font-display text-sm md:text-base lg:text-lg tracking-tight leading-tight flex-1 break-words">
          {task.title}
        </h3>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(task.id, columnId);
          }}
          className="font-mono text-sm md:text-base text-black/40 hover:text-[#FF3B3B] hover:bg-[#FF3B3B]/10
                     w-6 h-6 md:w-7 md:h-7 flex items-center justify-center border-2 border-transparent
                     hover:border-[#FF3B3B] transition-colors duration-75 flex-shrink-0"
        >
          ×
        </button>
      </div>

      {/* Task Body */}
      <div className="px-2 md:px-3 py-2">
        <p className="font-mono text-[10px] md:text-xs text-black/60 leading-relaxed break-words">
          {task.description}
        </p>
      </div>

      {/* Task Footer */}
      <div className="border-t-2 border-black px-2 md:px-3 py-1.5 md:py-2 flex flex-wrap items-center justify-between gap-2 bg-[#F5F3F0]">
        <span
          className="font-mono text-[10px] md:text-xs font-bold px-1.5 md:px-2 py-0.5 border-2 border-black"
          style={{ backgroundColor: priority.bg, color: priority.text }}
        >
          {task.priority}
        </span>
        <span className="font-mono text-[10px] md:text-xs text-black/50">
          {task.createdAt}
        </span>
      </div>

      {/* Drag indicator */}
      <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-1 h-8 bg-black opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>
  );
}
