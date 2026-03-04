import React from 'react';
import { TaskCard } from './TaskCard';
import type { Column, Task } from '../App';

interface KanbanColumnProps {
  column: Column;
  index: number;
  onDragStart: (task: Task, columnId: string) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDrop: (columnId: string) => void;
  onAddTask: (columnId: string) => void;
  onDeleteTask: (taskId: string, columnId: string) => void;
  isDragTarget: boolean;
}

export function KanbanColumn({
  column,
  index,
  onDragStart,
  onDragOver,
  onDrop,
  onAddTask,
  onDeleteTask,
  isDragTarget,
}: KanbanColumnProps) {
  const columnColors = ['#FF3B3B', '#FFD700', '#00FF88', '#00BFFF'];
  const accentColor = columnColors[index % columnColors.length];

  return (
    <div
      className={`flex flex-col border-4 border-black bg-[#F5F3F0] transition-all duration-75 ${
        isDragTarget ? 'shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]' : ''
      }`}
      style={{
        animationDelay: `${index * 100}ms`,
      }}
      onDragOver={onDragOver}
      onDrop={() => onDrop(column.id)}
    >
      {/* Column Header */}
      <div
        className="border-b-4 border-black p-3 md:p-4"
        style={{ backgroundColor: accentColor }}
      >
        <div className="flex items-center justify-between">
          <h2 className="font-display text-lg md:text-xl lg:text-2xl tracking-tight text-black">{column.title}</h2>
          <span className="font-mono text-xs md:text-sm bg-black text-white px-2 py-0.5">
            {String(column.tasks.length).padStart(2, '0')}
          </span>
        </div>
      </div>

      {/* Column Index */}
      <div className="border-b-4 border-black bg-black text-white px-3 py-1 font-mono text-[10px] md:text-xs">
        COL_{String(index + 1).padStart(2, '0')} // {column.id.toUpperCase().replace('-', '_')}
      </div>

      {/* Tasks Container */}
      <div className="flex-1 p-2 md:p-3 space-y-2 md:space-y-3 min-h-[120px] md:min-h-[200px] overflow-y-auto">
        {column.tasks.map((task, taskIndex) => (
          <TaskCard
            key={task.id}
            task={task}
            columnId={column.id}
            onDragStart={onDragStart}
            onDelete={onDeleteTask}
            index={taskIndex}
          />
        ))}

        {column.tasks.length === 0 && (
          <div className="h-full flex items-center justify-center border-2 border-dashed border-black/30 p-4">
            <span className="font-mono text-xs md:text-sm text-black/40 text-center">// NO_TASKS</span>
          </div>
        )}
      </div>

      {/* Add Button */}
      <button
        onClick={() => onAddTask(column.id)}
        className="border-t-4 border-black bg-black text-[#E8E4E0] p-3 md:p-4 font-mono text-sm md:text-base
                   hover:bg-[#FFD700] hover:text-black transition-colors duration-75
                   active:translate-y-0.5 flex items-center justify-center gap-2"
      >
        <span className="text-lg md:text-xl">+</span>
        <span>ADD_TASK</span>
      </button>
    </div>
  );
}
