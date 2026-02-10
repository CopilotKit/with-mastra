import { createTool } from "@mastra/core/tools";
import { z } from "zod";
import { readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

export const queryData = createTool({
  id: "query_data",
  description:
    "Query the database. Always call before showing a chart or graph.",
  inputSchema: z.object({
    query: z.string().describe("The query to run against the data"),
  }),
  outputSchema: z.object({
    data: z.array(z.record(z.string())),
  }),
  execute: async () => {
    const __dirname = dirname(fileURLToPath(import.meta.url));
    const csvPath = join(__dirname, "..", "db.csv");
    const csvContent = readFileSync(csvPath, "utf-8");

    const lines = csvContent.trim().split("\n");
    const headers = lines[0].split(",");
    const data = lines.slice(1).map((line) => {
      const values = line.split(",");
      const row: Record<string, string> = {};
      headers.forEach((header, i) => {
        row[header] = values[i];
      });
      return row;
    });

    return { data };
  },
});
