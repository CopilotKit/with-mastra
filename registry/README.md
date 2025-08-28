# Registry

This folder contains the shadcn registry files for the CopilotKit + Mastra integration template.

## What is this?

This registry allows users to install the complete CopilotKit + Mastra application with a single command using the shadcn CLI. The registry follows the [shadcn registry specification](https://ui.shadcn.com/docs/registry) to provide a standardized way to distribute reusable code components.

## Files

- **`registry.json`** - The main registry definition that lists all available components
- **`copilotkit-mastra-app.json`** - The complete registry item containing all source code and configuration for the CopilotKit + Mastra integration

## Usage

Users can install the complete application using:

```bash
npx shadcn@latest add [your-registry-url]/registry/copilotkit-mastra-app
```

This single command will:
- Install all required dependencies automatically
- Create the proper folder structure:
  - `/src/app/copilotkit/page.tsx` - Demo interface with CopilotKit features
  - `/src/app/copilotkit/layout.tsx` - Layout with CopilotKit provider
  - `/src/app/api/copilotkit/route.ts` - API endpoint for CopilotKit runtime
  - `/src/mastra/` - Complete Mastra agent and tools configuration
  - `/src/app/globals.css` - Required styling
- Set up a working CopilotKit application with Mastra agents

## What gets installed

The registry installs a complete example application featuring:

- **CopilotKit Integration**: Full setup with runtime, UI components, and Next.js API routes
- **Mastra Agents**: Weather agent with memory and state management
- **Frontend Actions**: Theme color changing functionality
- **Shared State**: Proverbs management with real-time updates
- **Generative UI**: Weather cards with dynamic rendering
- **Complete Styling**: Tailwind CSS with dark/light mode support

## Building the Registry

To rebuild the registry files after making changes:

```bash
npx shadcn@latest build
```

This will regenerate the registry files in this folder based on the source `registry.json` configuration.

## Registry Structure

The registry uses a `registry:block` type, which is designed for complete applications or large feature sets that include multiple files and dependencies. This is different from individual components and is perfect for template repositories like this one.