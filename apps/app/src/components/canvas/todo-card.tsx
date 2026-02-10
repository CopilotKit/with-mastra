"use client";

import { useState } from "react";

interface Todo {
  id: string;
  title: string;
  description: string;
  emoji: string;
  status: "pending" | "completed";
}

interface TodoCardProps {
  todo: Todo;
  onToggleStatus: (todo: Todo) => void;
  onDelete: (todo: Todo) => void;
  onUpdateTitle: (todoId: string, title: string) => void;
  onUpdateDescription: (todoId: string, description: string) => void;
}

export function TodoCard({
  todo,
  onToggleStatus,
  onDelete,
  onUpdateTitle,
  onUpdateDescription,
}: TodoCardProps) {
  const [editingField, setEditingField] = useState<"title" | "description" | null>(null);
  const [editValue, setEditValue] = useState("");

  const isEditingTitle = editingField === "title";
  const isEditingDescription = editingField === "description";
  const isCompleted = todo.status === "completed";
  const truncatedDescription = todo.description.length > 100
    ? todo.description.slice(0, 100) + "..."
    : todo.description;

  const startEdit = (field: "title" | "description") => {
    setEditingField(field);
    setEditValue(field === "title" ? todo.title : todo.description);
  };

  const saveEdit = (field: "title" | "description") => {
    if (editValue.trim()) {
      if (field === "title") {
        onUpdateTitle(todo.id, editValue.trim());
      } else {
        onUpdateDescription(todo.id, editValue.trim());
      }
    }
    setEditingField(null);
    setEditValue("");
  };

  const cancelEdit = () => {
    setEditingField(null);
    setEditValue("");
  };

  return (
    <div
      className="group bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-all duration-200 shadow-sm"
    >
      <div className="flex items-start gap-3">
        {/* Checkbox toggle */}
        <button
          onClick={() => onToggleStatus(todo)}
          className="flex-shrink-0 w-5 h-5 rounded-full border-2 border-gray-300 hover:border-gray-600 transition-colors flex items-center justify-center mt-0.5 cursor-pointer"
          aria-label={isCompleted ? "Mark as incomplete" : "Mark as complete"}
          title={isCompleted ? "Mark as incomplete" : "Mark as complete"}
        >
          {isCompleted && (
            <svg className="w-3 h-3 text-gray-700" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="2,6 5,9 10,3" />
            </svg>
          )}
        </button>

        <div className="flex-1 min-w-0">
          <div className="flex items-start gap-2">
            {/* Emoji */}
            <span className="text-xl flex-shrink-0">{todo.emoji}</span>

            {/* Title (editable) */}
            <div className="flex-1 min-w-0">
              {isEditingTitle ? (
                <input
                  type="text"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  onBlur={() => saveEdit("title")}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") saveEdit("title");
                    if (e.key === "Escape") cancelEdit();
                  }}
                  className="w-full px-2 py-1 text-base font-semibold border-b-2 border-gray-400 focus:outline-none"
                  autoFocus
                  aria-label="Edit todo title"
                />
              ) : (
                <div
                  onClick={() => startEdit("title")}
                  className={`text-base font-semibold cursor-text break-words ${
                    isCompleted ? "line-through text-gray-400" : "text-gray-900"
                  }`}
                >
                  {todo.title}
                </div>
              )}
            </div>
          </div>

          {/* Description (editable, truncated) */}
          <div className="mt-2 ml-7">
            {isEditingDescription ? (
              <textarea
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                onBlur={() => saveEdit("description")}
                onKeyDown={(e) => {
                  if (e.key === "Escape") cancelEdit();
                }}
                className="w-full px-2 py-1 text-sm text-gray-600 border border-gray-400 rounded focus:outline-none resize-none"
                rows={3}
                autoFocus
                aria-label="Edit todo description"
              />
            ) : (
              <p
                onClick={() => startEdit("description")}
                className={`text-sm cursor-text ${
                  isCompleted ? "line-through text-gray-300" : "text-gray-600"
                }`}
              >
                {truncatedDescription}
              </p>
            )}
          </div>
        </div>

        {/* Delete button (visible on hover) */}
        <button
          onClick={() => onDelete(todo)}
          className="flex-shrink-0 opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-600 transition-all text-lg cursor-pointer"
          aria-label="Delete todo"
          title="Delete todo"
        >
          ×
        </button>
      </div>
    </div>
  );
}
