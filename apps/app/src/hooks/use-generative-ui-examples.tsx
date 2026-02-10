import {
  useFrontendTool,
  useHumanInTheLoop,
} from "@copilotkit/react-core/v2";
import { z } from "zod"
import { useDefaultTool } from "@copilotkit/react-core";
import { PieChart } from "@/components/generative-ui/charts/pie-chart";
import { BarChart } from "@/components/generative-ui/charts/bar-chart";
import { MeetingTimePicker } from "@/components/generative-ui/meeting-time-picker";

export const useGenerativeUIExamples = () => {

  // ------------------
  // 🪁 Frontend Tools: https://docs.copilotkit.ai/langgraph/frontend-actions
  // ------------------
  useFrontendTool({
    name: "alertHelloToUser",
    description: "Call the browser's native `alert` function. This is a great example of a frontend tool.",
    parameters: z.object({
      name: z.string(),
    }),
    handler: async ({ name }) => {
      alert(`Hello ${name}!`);
      return `Said hello to ${name}!`;
    },
  });

  // --------------------------
  // 🪁 Backend Tool Rendering: https://docs.copilotkit.ai/langgraph/generative-ui/backend-tools
  // --------------------------
  useDefaultTool({
    render: ({ name, status }) => {
      const textStyles = "text-gray-500 text-sm mt-2"
      if(status !== "complete") {
        return <p className={textStyles}>Calling {name}...</p>;
      }
      return <p className={textStyles}>Called {name}!</p>;
    },
  });

  // ----------------------------------
  // 🪁 Frontend Tools - Generative UI: https://docs.copilotkit.ai/langgraph/generative-ui/frontend-tools
  // ----------------------------------
  useFrontendTool({
    name: "show_pie_chart",
    description: `
      Always call the query_data tool to fetch all data from the database first.
      Display data as a pie chart or bar chart. Use pie charts for part-to-whole relationships (5-7 segments max). Use bar charts for comparisons or trends.

      This is a great example of static generative UI.
    `,
    parameters: z.object({
      title: z.string().describe("Chart title"),
      description: z.string().describe("Brief description or subtitle"),
      data: z.array(z.object({
        label: z.string(),
        value: z.number(),
      })).describe("Array of {label: string, value: number}"),
    }),
    render: ({ args }) => {
      const { title, description, data } = args;

      // Provide defaults for required fields
      const chartTitle = title || "Chart";
      const chartDescription = description || "";
      const chartData = (data as Array<{ label: string; value: number }>) || [];

      return <PieChart title={chartTitle} description={chartDescription} data={chartData} />;
    }
  });

  useFrontendTool({
    name: "show_bar_chart",
    description: `
      Always call the query_data tool to fetch all data from the database first.
      Display data as a pie chart or bar chart. Use pie charts for part-to-whole relationships (5-7 segments max). Use bar charts for comparisons or trends.

      This is a great example of static generative UI.
    `,
    parameters: z.object({
      title: z.string().describe("Chart title"),
      description: z.string().describe("Brief description or subtitle"),
      data: z.array(z.object({
        label: z.string(),
        value: z.number(),
      })).describe("Array of {label: string, value: number}"),
    }),
    render: ({ args }) => {
      const { title, description, data } = args;

      // Provide defaults for required fields
      const chartTitle = title || "Chart";
      const chartDescription = description || "";
      const chartData = (data as Array<{ label: string; value: number }>) || [];

      return <BarChart title={chartTitle} description={chartDescription} data={chartData} />;
    }
  });

  // -------------------------------------
  // 🪁 Frontend-tools - Human-in-the-loop: https://docs.copilotkit.ai/langgraph/human-in-the-loop/frontend-tool-based
  // -------------------------------------
  useHumanInTheLoop({
    name: "demonstrateHumanInTheLoop",
    description: "Demonstrate human-in-the-loop by proposing meeting times and asking the user to select one.",
    render: ({ respond, status }) => {
      return (
        <MeetingTimePicker status={status} respond={respond} />
      );
    },
  });
}