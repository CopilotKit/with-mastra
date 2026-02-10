"use client";

import { TodoColumn } from "./todo-column";

interface Todo {
  id: string;
  title: string;
  description: string;
  emoji: string;
  status: "pending" | "completed";
}

interface TodoListProps {
  todos: Todo[];
  onUpdate: (todos: Todo[]) => void;
  isAgentRunning: boolean;
}

export function TodoList({ todos, onUpdate, isAgentRunning }: TodoListProps) {
  // Filter todos by status
  const pendingTodos = todos.filter((t) => t.status === "pending");
  const completedTodos = todos.filter((t) => t.status === "completed");

  // Handlers
  const toggleStatus = (todo: Todo) => {
    const updated = todos.map((t) =>
      t.id === todo.id
        ? { ...t, status: (t.status === "completed" ? "pending" : "completed") as "pending" | "completed" }
        : t
    );
    onUpdate(updated);
  };

  const deleteTodo = (todo: Todo) => {
    onUpdate(todos.filter((t) => t.id !== todo.id));
  };

  const updateTitle = (todoId: string, title: string) => {
    const updated = todos.map((t) =>
      t.id === todoId ? { ...t, title } : t
    );
    onUpdate(updated);
  };

  const updateDescription = (todoId: string, description: string) => {
    const updated = todos.map((t) =>
      t.id === todoId ? { ...t, description } : t
    );
    onUpdate(updated);
  };

  const addTodo = () => {
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      title: "New Todo",
      description: "Add a description",
      emoji: "✅",
      status: "pending",
    };
    onUpdate([...todos, newTodo]);
  };

  // Empty state
  if (!todos || todos.length === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        <button
          onClick={addTodo}
          className="px-6 py-3 bg-gray-800 text-white font-medium rounded-lg hover:bg-gray-900 shadow-md hover:shadow-lg transition-all cursor-pointer"
          aria-label="Add your first todo task"
          disabled={isAgentRunning}
        >
          Add your first todo
        </button>
      </div>
    );
  }

  // Columns
  return (
    <div className="flex gap-8 h-full max-w-6xl mx-auto">
      <TodoColumn
        title="To Do"
        todos={pendingTodos}
        emptyMessage="No pending tasks"
        showAddButton
        onAddTodo={addTodo}
        onToggleStatus={toggleStatus}
        onDelete={deleteTodo}
        onUpdateTitle={updateTitle}
        onUpdateDescription={updateDescription}
        isAgentRunning={isAgentRunning}
      />
      <TodoColumn
        title="Done"
        todos={completedTodos}
        emptyMessage="No completed tasks"
        onToggleStatus={toggleStatus}
        onDelete={deleteTodo}
        onUpdateTitle={updateTitle}
        onUpdateDescription={updateDescription}
        isAgentRunning={isAgentRunning}
      />
    </div>
  );
}
