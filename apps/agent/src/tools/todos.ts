import { createTool } from "@mastra/core/tools";
import { z } from "zod";
import { randomUUID } from "crypto";

export const TodoSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  emoji: z.string(),
  status: z.enum(["pending", "completed"]),
});

export type Todo = z.infer<typeof TodoSchema>;

export const manageTodos = createTool({
  id: "manage_todos",
  description: "Manage the current todos.",
  inputSchema: z.object({
    todos: z.array(TodoSchema),
  }),
  outputSchema: z.object({
    todos: z.array(TodoSchema),
  }),
  execute: async ({ context }) => {
    const todos = context.todos.map((todo) => ({
      ...todo,
      id: todo.id || randomUUID(),
    }));
    return { todos };
  },
});

export const getTodos = createTool({
  id: "get_todos",
  description: "Get the current todos.",
  inputSchema: z.object({}),
  outputSchema: z.object({
    message: z.string(),
  }),
  execute: async () => {
    return {
      message:
        "Check your current working memory for the todos. The todos are stored in your agent state.",
    };
  },
});
