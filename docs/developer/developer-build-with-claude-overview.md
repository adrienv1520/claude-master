# Features overview

Explore Claude's advanced features and capabilities.

---

## Model capabilities

Ways to steer Claude and Claude's direct outputs, including response format, reasoning depth, and input modalities.

| Feature | Description | Availability |
|---------|-------------|--------------|
| [1M token context window](./developer-build-with-claude-context-windows.md#1m-token-context-window) | An extended context window that allows you to process much larger documents, maintain longer conversations, and work with more extensive codebases. | <PlatformAvailability claudeApiBeta bedrockBeta vertexAiBeta azureAiBeta /> |
| [Adaptive thinking](./developer-build-with-claude-adaptive-thinking.md) | Let Claude dynamically decide when and how much to think. The recommended thinking mode for Opus 4.6. Use the effort parameter to control thinking depth. | <PlatformAvailability claudeApi bedrock vertexAi azureAi /> |
| [Batch processing](./developer-build-with-claude-batch-processing.md) | Process large volumes of requests asynchronously for cost savings. Send batches with a large number of queries per batch. Batch API calls costs 50% less than standard API calls. | <PlatformAvailability claudeApi bedrock vertexAi /> |
| [Citations](./developer-build-with-claude-citations.md) | Ground Claude's responses in source documents. With Citations, Claude can provide detailed references to the exact sentences and passages it uses to generate responses, leading to more verifiable, trustworthy outputs. | <PlatformAvailability claudeApi bedrock vertexAi azureAi /> |
| [Data residency](./developer-build-with-claude-data-residency.md) | Control where model inference runs using geographic controls. Specify `"global"` or `"us"` routing per request via the `inference_geo` parameter. | <PlatformAvailability claudeApi /> |
| [Effort](./developer-build-with-claude-effort.md) | Control how many tokens Claude uses when responding with the effort parameter, trading off between response thoroughness and token efficiency. Supported on Opus 4.6 and Opus 4.5. | <PlatformAvailability claudeApi bedrock vertexAi azureAi /> |
| [Extended thinking](./developer-build-with-claude-extended-thinking.md) | Enhanced reasoning capabilities for complex tasks, providing transparency into Claude's step-by-step thought process before delivering its final answer. | <PlatformAvailability claudeApi bedrock vertexAi azureAi /> |
| [PDF support](./developer-build-with-claude-pdf-support.md) | Process and analyze text and visual content from PDF documents. | <PlatformAvailability claudeApi bedrock vertexAi azureAi /> |
| [Search results](./developer-build-with-claude-search-results.md) | Enable natural citations for RAG applications by providing search results with proper source attribution. Achieve web search-quality citations for custom knowledge bases and tools. | <PlatformAvailability claudeApi bedrock vertexAi azureAi /> |
| [Structured outputs](./developer-build-with-claude-structured-outputs.md) | Guarantee schema conformance with two approaches: JSON outputs for structured data responses, and strict tool use for validated tool inputs. | <PlatformAvailability claudeApi bedrock azureAiBeta /> |

## Tools

Built-in tools that Claude invokes via `tool_use`. Server-side tools are run by the platform; client-side tools are implemented and executed by you.

### Server-side tools

| Feature | Description | Availability |
|---------|-------------|--------------|
| [Code execution](./developer-agents-and-tools-tool-use-code-execution-tool.md) | Run code in a sandboxed environment for advanced data analysis, calculations, and file processing. Free when used with web search or web fetch. | <PlatformAvailability claudeApi azureAi /> |
| [Memory](./developer-agents-and-tools-tool-use-memory-tool.md) | Enable Claude to store and retrieve information across conversations. Build knowledge bases over time, maintain project context, and learn from past interactions. | <PlatformAvailability claudeApi bedrock vertexAi azureAi /> |
| [Web fetch](./developer-agents-and-tools-tool-use-web-fetch-tool.md) | Retrieve full content from specified web pages and PDF documents for in-depth analysis. | <PlatformAvailability claudeApi azureAi /> |
| [Web search](./developer-agents-and-tools-tool-use-web-search-tool.md) | Augment Claude's comprehensive knowledge with current, real-world data from across the web. | <PlatformAvailability claudeApi vertexAi azureAi /> |

### Client-side tools

| Feature | Description | Availability |
|---------|-------------|--------------|
| [Bash](./developer-agents-and-tools-tool-use-bash-tool.md) | Execute bash commands and scripts to interact with the system shell and perform command-line operations. | <PlatformAvailability claudeApi bedrock vertexAi azureAi /> |
| [Computer use](./developer-agents-and-tools-tool-use-computer-use-tool.md) | Control computer interfaces by taking screenshots and issuing mouse and keyboard commands. | <PlatformAvailability claudeApiBeta bedrockBeta vertexAiBeta azureAiBeta /> |
| [Text editor](./developer-agents-and-tools-tool-use-text-editor-tool.md) | Create and edit text files with a built-in text editor interface for file manipulation tasks. | <PlatformAvailability claudeApi bedrock vertexAi azureAi /> |

## Tool infrastructure

Infrastructure that supports discovering, orchestrating, and scaling tool use.

| Feature | Description | Availability |
|---------|-------------|--------------|
| [Agent Skills](./developer-agents-and-tools-agent-skills-overview.md) | Extend Claude's capabilities with Skills. Use pre-built Skills (PowerPoint, Excel, Word, PDF) or create custom Skills with instructions and scripts. Skills use progressive disclosure to efficiently manage context. | <PlatformAvailability claudeApiBeta azureAiBeta /> |
| [Fine-grained tool streaming](./developer-agents-and-tools-tool-use-fine-grained-tool-streaming.md) | Stream tool use parameters without buffering/JSON validation, reducing latency for receiving large parameters. | <PlatformAvailability claudeApi bedrock vertexAi azureAi /> |
| [MCP connector](./developer-agents-and-tools-mcp-connector.md) | Connect to remote [MCP](https://platform.claude.com/docs/en/mcp.md) servers directly from the Messages API without a separate MCP client. | <PlatformAvailability claudeApiBeta azureAiBeta /> |
| [Programmatic tool calling](./developer-agents-and-tools-tool-use-programmatic-tool-calling.md) | Enable Claude to call your tools programmatically from within code execution containers, reducing latency and token consumption for multi-tool workflows. | <PlatformAvailability claudeApi azureAi /> |
| [Tool search](./developer-agents-and-tools-tool-use-tool-search-tool.md) | Scale to thousands of tools by dynamically discovering and loading tools on-demand using regex-based search, optimizing context usage and improving tool selection accuracy. | <PlatformAvailability claudeApi bedrock vertexAi azureAi /> |

## Context management

Infrastructure for controlling and optimizing Claude's context window.

| Feature | Description | Availability |
|---------|-------------|--------------|
| [Compaction](./developer-build-with-claude-compaction.md) | Server-side context summarization for long-running conversations. When context approaches the window limit, the API automatically summarizes earlier parts of the conversation. Supported on Opus 4.6 and Haiku 4.5. | <PlatformAvailability claudeApiBeta /> |
| [Context editing](./developer-build-with-claude-context-editing.md) | Automatically manage conversation context with configurable strategies. Supports clearing tool results when approaching token limits and managing thinking blocks in extended thinking conversations. | <PlatformAvailability claudeApiBeta bedrockBeta vertexAiBeta azureAiBeta /> |
| [Prompt caching (5m)](./developer-build-with-claude-prompt-caching.md) | Provide Claude with more background knowledge and example outputs to reduce costs and latency. | <PlatformAvailability claudeApi bedrock vertexAi azureAi /> |
| [Prompt caching (1hr)](./developer-build-with-claude-prompt-caching.md#1-hour-cache-duration) | Extended 1-hour cache duration for less frequently accessed but important context, complementing the standard 5-minute cache. | <PlatformAvailability claudeApi azureAi /> |
| [Token counting](https://platform.claude.com/docs/en/api/messages-count-tokens.md) | Token counting enables you to determine the number of tokens in a message before sending it to Claude, helping you make informed decisions about your prompts and usage. | <PlatformAvailability claudeApi bedrock vertexAi azureAi /> |

## Files & assets

Manage files and assets for use with Claude.

| Feature | Description | Availability |
|---------|-------------|--------------|
| [Files API](./developer-build-with-claude-files.md) | Upload and manage files to use with Claude without re-uploading content with each request. Supports PDFs, images, and text files. | <PlatformAvailability claudeApiBeta azureAiBeta /> |