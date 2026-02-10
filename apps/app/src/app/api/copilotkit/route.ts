import {
  CopilotRuntime,
  ExperimentalEmptyAdapter,
  copilotRuntimeNextJSAppRouterEndpoint,
} from "@copilotkit/runtime";
import { NextRequest } from "next/server";
import { MastraAgent } from "@ag-ui/mastra";
import { mastra } from "@repo/agent/mastra";
import { aguiMiddleware } from "@/app/api/copilotkit/ag-ui-middleware";

// 1. Define the agent connection to Mastra
const mastraAgents = MastraAgent.getLocalAgents({ mastra, resourceId: "sample_agent" });
const defaultAgent = Object.values(mastraAgents)[0];

// 2. Bind in middleware to the agent. For A2UI and MCP Apps.
defaultAgent.use(...aguiMiddleware)

console.log("Mastra agents:", defaultAgent)

// 3. Define the route and CopilotRuntime for the agent
export const POST = async (req: NextRequest) => {
  const { handleRequest } = copilotRuntimeNextJSAppRouterEndpoint({
    endpoint: "/api/copilotkit",
    serviceAdapter: new ExperimentalEmptyAdapter(),
    runtime: new CopilotRuntime({
      agents: {
        default: defaultAgent,
      },
    }),
  });

  return handleRequest(req);
};
