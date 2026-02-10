# CopilotKit + Mastra Todo Demo

## Purpose

This repository serves as both a **showcase** and **template** for building AI agents with CopilotKit and Mastra. It demonstrates how CopilotKit can drive interactive UI beyond just chat, using a **collaborative todo list** as the primary example.

**Target audience:** Developers evaluating CopilotKit or starting new projects with AI agents.

## Core Concept

The todo list demonstrates **agent-driven UI** where:
- The agent can manipulate application state (adding todos, updating status, organizing tasks)
- Users can interact with the same state (editing titles, checking off tasks, deleting todos)
- Both agent and user changes update the same shared state
- The UI reactively updates based on agent state changes

This uses CopilotKit's **v2 agent state pattern** where state lives in the agent and syncs to the frontend.

## Architecture

This is a **Turborepo monorepo** with two apps:

### Repository Structure

```
apps/
├── app/                         # Next.js frontend
│   ├── src/
│   │   ├── app/
│   │   │   ├── page.tsx        # Main page - wires up all components
│   │   │   └── api/copilotkit/ # CopilotKit API route
│   │   ├── components/
│   │   │   ├── canvas/         # Todo list UI
│   │   │   │   ├── index.tsx   # Canvas container
│   │   │   │   ├── todo-list.tsx    # Todo list with columns
│   │   │   │   ├── todo-column.tsx  # Column (pending/completed)
│   │   │   │   └── todo-card.tsx    # Individual todo card
│   │   │   ├── example-layout/ # Layout: chat + canvas side-by-side
│   │   │   └── generative-ui/  # Example generative UI components
│   │   └── hooks/
│   │       ├── use-generative-ui-examples.tsx  # Example CopilotKit patterns
│   │       └── use-example-suggestions.tsx     # Chat suggestions
└── mcp/                         # MCP (Model Context Protocol) integration
```

## Key Pattern: Agent State with CopilotKit v2

The todo list uses **CopilotKit v2's agent state pattern** where state lives in the agent backend and syncs bidirectionally with the frontend.

### How It Works

1. **Frontend reads from agent state**
   ```typescript
   // apps/app/src/components/canvas/index.tsx
   const { agent } = useAgent();

   return (
     <TodoList
       todos={agent.state?.todos || []}
       onUpdate={(updatedTodos) => agent.setState({ todos: updatedTodos })}
       isAgentRunning={agent.isRunning}
     />
   );
   ```

2. **User interactions update agent state**
   ```typescript
   // User clicks checkbox -> frontend calls agent.setState()
   const toggleStatus = (todo) => {
     const updated = todos.map(t =>
       t.id === todo.id ? { ...t, status: t.status === "completed" ? "pending" : "completed" } : t
     );
     agent.setState({ todos: updated });
   };
   ```

3. **Agent can manipulate state via tools**
   - The agent calls tools to update the todo list
   - Both user and agent changes update the same `agent.state.todos`
   - Frontend automatically re-renders when state changes

### Why This Pattern?

- **Single source of truth**: State lives in the agent, not duplicated in frontend
- **Bidirectional sync**: User changes -> agent state, Agent changes -> UI update
- **Simple**: No need for separate frontend state management
- **Observable**: Agent has full visibility into state changes

## Implementation Details

### Frontend

**Canvas Component** (`apps/app/src/components/canvas/index.tsx`):
```typescript
export function Canvas() {
  const { agent } = useAgent();  // CopilotKit v2 hook

  return (
    <div className="h-full p-8 bg-gray-50">
      <TodoList
        // Read state from agent
        todos={agent.state?.todos || []}
        // Update state in agent
        onUpdate={(updatedTodos) => agent.setState({ todos: updatedTodos })}
        // React to agent execution
        isAgentRunning={agent.isRunning}
      />
    </div>
  );
}
```

**Todo List** (`apps/app/src/components/canvas/todo-list.tsx`):
```typescript
export function TodoList({ todos, onUpdate, isAgentRunning }: TodoListProps) {
  const toggleStatus = (todo: Todo) => {
    const updated = todos.map((t) =>
      t.id === todo.id
        ? { ...t, status: t.status === "completed" ? "pending" : "completed" }
        : t
    );
    onUpdate(updated);  // Calls agent.setState()
  };

  const addTodo = () => {
    const newTodo = { id: crypto.randomUUID(), ... };
    onUpdate([...todos, newTodo]);
  };

  return (
    <div className="flex gap-8">
      <TodoColumn title="To Do" todos={pendingTodos} onAddTodo={addTodo} ... />
      <TodoColumn title="Done" todos={completedTodos} ... />
    </div>
  );
}
```

### How State Flows

1. **User adds/edits todo** -> Frontend calls `agent.setState({ todos: [...] })`
2. **Agent state updates** -> CopilotKit syncs to backend
3. **Agent observes change** -> Can respond via tools
4. **Agent modifies todos** -> Calls tools to update state
5. **State syncs to frontend** -> `agent.state.todos` updates
6. **UI re-renders** -> React sees new state and updates display

**Key insight**: State lives in the agent, frontend just reads/writes to it via CopilotKit hooks.

## Tech Stack

- **Frontend**: Next.js 16, React 19, TailwindCSS 4
- **Agent**: Mastra (TypeScript)
- **CopilotKit**: React hooks for agent integration (v2)
- **Monorepo**: Turborepo with pnpm workspaces
- **Other**: MCP (Model Context Protocol) integration, Recharts for generative UI examples

## Development

This is a Turborepo monorepo using pnpm workspaces.

```bash
# Install dependencies (all apps)
pnpm install

# Start all apps (app, mcp)
pnpm dev

# Start individually
pnpm dev:app    # Next.js frontend on port 3000
pnpm dev:mcp    # MCP server

# Build all apps
pnpm build

# Lint all apps
pnpm lint
```

### Environment Setup

```bash
cp .env.example .env
# Then edit .env and add your OpenAI API key
```

## Design Principles

1. **Simple over complex** - The todo list is intentionally simple and focused
2. **CopilotKit v2 patterns** - Uses modern agent state management
3. **Template-first** - Code is meant to be forked and extended
4. **Showcasing agent-driven UI** - Demonstrates AI manipulating application state beyond chat

## Key Takeaways for Developers

**State Management Pattern**: This app uses CopilotKit v2's agent state pattern where:
- Frontend reads via `agent.state.todos`
- Frontend writes via `agent.setState({ todos: ... })`
- Agent can modify state via tools
- Changes sync bidirectionally automatically

**When extending this template**:
- Use `useAgent()` hook in frontend to read/write state
- Let CopilotKit handle the sync - no manual state management needed

This pattern works great for **agent-driven applications** where the AI needs to manipulate structured application state, not just chat.