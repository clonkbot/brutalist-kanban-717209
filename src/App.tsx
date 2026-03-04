import React, { useState, useCallback } from 'react';
import { KanbanColumn } from './components/KanbanColumn';
import { AddTaskModal } from './components/AddTaskModal';

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: 'LOW' | 'MED' | 'HIGH';
  createdAt: string;
}

export interface Column {
  id: string;
  title: string;
  tasks: Task[];
}

const initialColumns: Column[] = [
  {
    id: 'backlog',
    title: 'BACKLOG',
    tasks: [
      { id: '1', title: 'DESIGN SYSTEM AUDIT', description: 'Review all components for consistency', priority: 'HIGH', createdAt: '2024-01-15' },
      { id: '2', title: 'DATABASE MIGRATION', description: 'Move to PostgreSQL cluster', priority: 'MED', createdAt: '2024-01-14' },
    ],
  },
  {
    id: 'in-progress',
    title: 'IN PROGRESS',
    tasks: [
      { id: '3', title: 'API REFACTOR', description: 'Implement REST to GraphQL migration', priority: 'HIGH', createdAt: '2024-01-13' },
    ],
  },
  {
    id: 'review',
    title: 'REVIEW',
    tasks: [
      { id: '4', title: 'SECURITY PATCH', description: 'Fix XSS vulnerabilities in forms', priority: 'HIGH', createdAt: '2024-01-12' },
    ],
  },
  {
    id: 'done',
    title: 'DONE',
    tasks: [
      { id: '5', title: 'CI/CD PIPELINE', description: 'GitHub Actions workflow complete', priority: 'LOW', createdAt: '2024-01-10' },
    ],
  },
];

function App() {
  const [columns, setColumns] = useState<Column[]>(initialColumns);
  const [draggedTask, setDraggedTask] = useState<{ task: Task; sourceColumnId: string } | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [targetColumnId, setTargetColumnId] = useState<string>('backlog');

  const handleDragStart = useCallback((task: Task, columnId: string) => {
    setDraggedTask({ task, sourceColumnId: columnId });
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
  }, []);

  const handleDrop = useCallback((targetColumnId: string) => {
    if (!draggedTask) return;

    if (draggedTask.sourceColumnId === targetColumnId) {
      setDraggedTask(null);
      return;
    }

    setColumns(prev => {
      const newColumns = prev.map(col => {
        if (col.id === draggedTask.sourceColumnId) {
          return { ...col, tasks: col.tasks.filter(t => t.id !== draggedTask.task.id) };
        }
        if (col.id === targetColumnId) {
          return { ...col, tasks: [...col.tasks, draggedTask.task] };
        }
        return col;
      });
      return newColumns;
    });

    setDraggedTask(null);
  }, [draggedTask]);

  const handleAddTask = useCallback((columnId: string) => {
    setTargetColumnId(columnId);
    setIsModalOpen(true);
  }, []);

  const handleCreateTask = useCallback((title: string, description: string, priority: 'LOW' | 'MED' | 'HIGH') => {
    const newTask: Task = {
      id: Date.now().toString(),
      title: title.toUpperCase(),
      description,
      priority,
      createdAt: new Date().toISOString().split('T')[0],
    };

    setColumns(prev => prev.map(col => {
      if (col.id === targetColumnId) {
        return { ...col, tasks: [...col.tasks, newTask] };
      }
      return col;
    }));

    setIsModalOpen(false);
  }, [targetColumnId]);

  const handleDeleteTask = useCallback((taskId: string, columnId: string) => {
    setColumns(prev => prev.map(col => {
      if (col.id === columnId) {
        return { ...col, tasks: col.tasks.filter(t => t.id !== taskId) };
      }
      return col;
    }));
  }, []);

  return (
    <div className="min-h-screen bg-[#E8E4E0] relative overflow-hidden flex flex-col">
      {/* Noise texture overlay */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.08] z-50"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Header */}
      <header className="border-b-4 border-black bg-black text-[#E8E4E0] px-4 md:px-8 py-4 md:py-6 relative z-10">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div className="flex items-baseline gap-2 md:gap-4">
            <h1 className="font-display text-2xl md:text-4xl lg:text-5xl tracking-tighter">KANBAN</h1>
            <span className="font-mono text-xs md:text-sm text-[#FFD700] tracking-wider">SYS.V2.4</span>
          </div>
          <div className="font-mono text-xs md:text-sm tracking-wider opacity-70">
            {new Date().toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' }).toUpperCase()}
          </div>
        </div>
      </header>

      {/* Status bar */}
      <div className="border-b-4 border-black bg-[#FFD700] px-4 md:px-8 py-2 flex flex-wrap items-center justify-between gap-2 font-mono text-xs md:text-sm relative z-10">
        <div className="flex flex-wrap items-center gap-2 md:gap-4">
          <span className="font-bold">STATUS:</span>
          <span className="bg-black text-[#FFD700] px-2 py-0.5">OPERATIONAL</span>
        </div>
        <div className="flex items-center gap-2 md:gap-4">
          <span>TASKS: {columns.reduce((acc, col) => acc + col.tasks.length, 0)}</span>
          <span className="hidden sm:inline">|</span>
          <span className="hidden sm:inline">COLUMNS: {columns.length}</span>
        </div>
      </div>

      {/* Main content */}
      <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-x-auto relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 min-h-[calc(100vh-280px)]">
          {columns.map((column, index) => (
            <KanbanColumn
              key={column.id}
              column={column}
              index={index}
              onDragStart={handleDragStart}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onAddTask={handleAddTask}
              onDeleteTask={handleDeleteTask}
              isDragTarget={draggedTask !== null && draggedTask.sourceColumnId !== column.id}
            />
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t-4 border-black bg-[#1a1a1a] px-4 md:px-8 py-3 relative z-10">
        <p className="font-mono text-[10px] md:text-xs text-[#666] text-center tracking-wider">
          Requested by @web-user · Built by @clonkbot
        </p>
      </footer>

      {/* Add Task Modal */}
      {isModalOpen && (
        <AddTaskModal
          onClose={() => setIsModalOpen(false)}
          onCreate={handleCreateTask}
        />
      )}
    </div>
  );
}

export default App;
