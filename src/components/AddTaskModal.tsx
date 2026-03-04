import React, { useState } from 'react';

interface AddTaskModalProps {
  onClose: () => void;
  onCreate: (title: string, description: string, priority: 'LOW' | 'MED' | 'HIGH') => void;
}

export function AddTaskModal({ onClose, onCreate }: AddTaskModalProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<'LOW' | 'MED' | 'HIGH'>('MED');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onCreate(title.trim(), description.trim(), priority);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-[100]"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg border-4 border-black bg-[#E8E4E0] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]
                   animate-[slideUp_150ms_ease-out]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="border-b-4 border-black bg-black text-[#E8E4E0] p-4 flex items-center justify-between">
          <h2 className="font-display text-xl md:text-2xl tracking-tight">NEW_TASK</h2>
          <button
            onClick={onClose}
            className="font-mono text-2xl hover:text-[#FF3B3B] transition-colors w-10 h-10 flex items-center justify-center"
          >
            ×
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-4 md:p-6 space-y-4 md:space-y-6">
          {/* Title Input */}
          <div className="space-y-2">
            <label className="font-mono text-xs md:text-sm text-black/60 block">TITLE_INPUT //</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="ENTER TASK TITLE..."
              className="w-full border-4 border-black p-3 md:p-4 font-display text-base md:text-lg bg-white
                       placeholder:text-black/30 focus:outline-none focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
                       transition-shadow duration-75"
              autoFocus
            />
          </div>

          {/* Description Input */}
          <div className="space-y-2">
            <label className="font-mono text-xs md:text-sm text-black/60 block">DESCRIPTION_INPUT //</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter task description..."
              rows={3}
              className="w-full border-4 border-black p-3 md:p-4 font-mono text-sm md:text-base bg-white resize-none
                       placeholder:text-black/30 focus:outline-none focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
                       transition-shadow duration-75"
            />
          </div>

          {/* Priority Selector */}
          <div className="space-y-2">
            <label className="font-mono text-xs md:text-sm text-black/60 block">PRIORITY_SELECT //</label>
            <div className="flex gap-2 flex-wrap">
              {(['LOW', 'MED', 'HIGH'] as const).map((p) => {
                const colors = {
                  LOW: '#00FF88',
                  MED: '#FFD700',
                  HIGH: '#FF3B3B',
                };
                const isSelected = priority === p;
                return (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setPriority(p)}
                    className={`flex-1 min-w-[80px] border-4 border-black p-2 md:p-3 font-mono text-sm md:text-base font-bold
                              transition-all duration-75 ${
                                isSelected
                                  ? 'shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] -translate-x-0.5 -translate-y-0.5'
                                  : 'hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-0.5 hover:-translate-y-0.5'
                              }`}
                    style={{
                      backgroundColor: isSelected ? colors[p] : 'white',
                      color: p === 'HIGH' && isSelected ? 'white' : 'black',
                    }}
                  >
                    {p}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!title.trim()}
            className="w-full border-4 border-black bg-black text-[#E8E4E0] p-3 md:p-4 font-display text-lg md:text-xl
                     hover:bg-[#FFD700] hover:text-black transition-colors duration-75
                     disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-black disabled:hover:text-[#E8E4E0]
                     active:translate-y-0.5"
          >
            CREATE_TASK
          </button>
        </form>

        {/* Modal Footer */}
        <div className="border-t-4 border-black bg-black text-[#E8E4E0]/50 px-4 py-2 font-mono text-[10px] md:text-xs text-center">
          // ESC TO CLOSE | ENTER TO SUBMIT
        </div>
      </div>
    </div>
  );
}
