"use client";

import { TodoCard } from "./todo-card";

interface Todo {
  id: string;
  title: string;
  description: string;
  emoji: string;
  status: "pending" | "completed";
}

interface TodoColumnProps {
  title: string;
  todos: Todo[];
  emptyMessage: string;
  showAddButton?: boolean;
  onAddTodo?: () => void;
  onToggleStatus: (todo: Todo) => void;
  onDelete: (todo: Todo) => void;
  onUpdateTitle: (todoId: string, title: string) => void;
  onUpdateDescription: (todoId: string, description: string) => void;
  isAgentRunning: boolean;
}

export function TodoColumn({
  title,
  todos,
  emptyMessage,
  showAddButton = false,
  onAddTodo,
  onToggleStatus,
  onDelete,
  onUpdateTitle,
  onUpdateDescription,
  isAgentRunning,
}: TodoColumnProps) {
  return (
    <section aria-label={`${title} column`} className="flex-1 min-w-0">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">{title}</h2>
          <p className="text-sm text-gray-500 mt-1">
            {todos.length} {todos.length === 1 ? 'task' : 'tasks'}
          </p>
        </div>
        {showAddButton && onAddTodo && (
          <button
            onClick={onAddTodo}
            className="px-2.5 py-0.5 text-black text-xl border bg-white font-medium rounded-lg hover:border-gray-500 hover:border hover:shadow-md transition-all cursor-pointer"
            aria-label="Add new todo"
            disabled={isAgentRunning}
          >
            +
          </button>
        )}
      </div>
      <div className="space-y-6">
        {todos.length === 0 ? (
          <div role="status" className="text-center py-12 text-gray-400 text-sm">
            {emptyMessage}
          </div>
        ) : (
          todos.map((todo) => (
            <TodoCard
              key={todo.id}
              todo={todo}
              onToggleStatus={onToggleStatus}
              onDelete={onDelete}
              onUpdateTitle={onUpdateTitle}
              onUpdateDescription={onUpdateDescription}
            />
          ))
        )}
      </div>
    </section>
  );
}
