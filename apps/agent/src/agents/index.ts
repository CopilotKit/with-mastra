import { openai } from "@ai-sdk/openai";
import { Agent } from "@mastra/core/agent";
import { manageTodos, getTodos, queryData } from "../tools";
import { LibSQLStore } from "@mastra/libsql";
import { z } from "zod";
import { Memory } from "@mastra/memory";
import { TodoSchema } from "../tools/todos";

export const AgentState = z.object({
  todos: z.array(TodoSchema).default([]),
});

export const sampleAgent = new Agent({
  id: "sample_agent",
  name: "Sample Agent",
  tools: { manageTodos, getTodos, queryData },
  model: openai("gpt-4o"),
  instructions: `
    You are a helpful assistant that helps users understand CopilotKit and Mastra used together.

    When asked about generative UI:
    1. Ground yourself in relevant information from the CopilotKit documentation.
    2. Use one of the relevant tools to demonstrate that piece of generative UI.
    3. Explain the concept to the user with a brief summary.
  `,
  memory: new Memory({
    storage: new LibSQLStore({
      id: "sample-agent-memory",
      url: "file::memory:",
    }),
    options: {
      workingMemory: {
        enabled: true,
        schema: AgentState,
      },
    },
  }),
});
