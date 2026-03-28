# API and data retention

Learn about how Anthropic's APIs and associated features retain data, including information about which APIs and features are eligible for zero data retention ("ZDR").

---

<Note>
Information about Anthropic's standard retention policies is set out in [Anthropic's commercial data retention policy](https://privacy.claude.com/en/articles/7996866-how-long-do-you-store-my-organization-s-data) and [consumer data retention policy](https://privacy.claude.com/en/articles/10023548-how-long-do-you-store-my-data).

When users use API endpoints with zero data retention (ZDR), customer data submitted through those endpoints is not stored at rest after the API response is returned except where needed to comply with law or combat misuse. Subject to these exceptions, when using ZDR-enabled endpoints, customer data is processed in real time and promptly discarded, with no logging or non-ephemeral storage of prompts or outputs.
</Note>

## Anthropic's approach to data retention

Different APIs and features have different storage and retention needs. Where an API or feature doesn't require storage of customer prompts or responses, it may be eligible for ZDR. Where an API or feature necessarily requires storage of customer prompts or responses, Anthropic designs for the smallest possible retention footprint. For these features:

- Retained data is never used for model training without your express permission.
- Only what is technically necessary for the API and feature to work is retained. Conversation content (your prompts and Claude's outputs) is never retained unless explicitly noted.
- Data is purged on the shortest practical TTL, and Anthropic aims to give customers control over how long data is retained. What is held, and the retention duration where a specific TTL applies, is documented on each feature's page.

In the [ZDR eligibility table](#zdr-eligibility-by-feature), some features are marked "Yes (qualified)" in the ZDR eligible column. If your organization has a ZDR arrangement, you can use these features with confidence that what Anthropic retains is narrow and is required for optimal performance.

## Zero data retention (ZDR) scope

**What ZDR covers**

- **Certain Claude APIs:** ZDR applies to the Claude Messages and Token Counting APIs
- **Claude Code:** ZDR applies when used with Commercial organization API keys or through Claude Enterprise (see [Claude Code ZDR docs](https://code.claude.com/docs/en/zero-data-retention))

**What ZDR does NOT cover**

- **Console and Workbench:** Any usage on Console or Workbench
- **Claude consumer products:** Claude Free, Pro, or Max plans, including when customers on those plans use Claude's web, desktop, or mobile apps or Claude Code
- **Claude Teams and Claude Enterprise:** Claude Teams and Claude Enterprise product interfaces are **not ZDR-eligible**, except for Claude Code when used through Claude Enterprise with ZDR enabled for the organization. For other product interfaces, only Commercial organization API keys are eligible for ZDR.
- **Third-party integrations:** Data processed by third-party websites, tools, or other integrations is **not ZDR-eligible**, though some may have similar offerings. When using external services in conjunction with the Claude API, make sure to review those services' data handling practices.

<Note>
For the most up-to-date information on what products and features are ZDR-eligible, refer to your contract terms or contact your Anthropic account representative.
</Note>

## ZDR eligibility by feature

| Feature | Endpoint | ZDR eligible | Data retention details |
| ------- | -------- | ---------- | --------------------- |
| [Messages API](./developer-build-with-claude-working-with-messages.md) | `/v1/messages` | Yes | Standard API calls for generating Claude responses. |
| [Token counting](./developer-build-with-claude-token-counting.md) | `/v1/messages/count_tokens` | Yes | Count tokens before sending requests. |
| [Web search](./developer-agents-and-tools-tool-use-web-search-tool.md) | `/v1/messages` (with `web_search` tool) | Yes<sup>1</sup> | Real-time web search results returned in the API response. |
| [Web fetch](./developer-agents-and-tools-tool-use-web-fetch-tool.md) | `/v1/messages` (with `web_fetch` tool) | Yes<sup>1</sup> <sup>2</sup> | Fetched web content returned in the API response. |
| [Memory tool](./developer-agents-and-tools-tool-use-memory-tool.md) | `/v1/messages` (with `memory` tool) | Yes | Client-side memory storage where you control data retention. |
| [Context management (compaction)](./developer-build-with-claude-compaction.md) | `/v1/messages` (with `context_management`) | Yes | Server-side compaction results are returned/round-tripped statelessly through the API response. |
| [Context editing](./developer-build-with-claude-context-editing.md) | `/v1/messages` (with `context_management`) | Yes | Context edits (tool use clearing + thinking clearing) are applied in real time. |
| [Fast mode](./developer-build-with-claude-fast-mode.md) | `/v1/messages` (with `speed: "fast"`) | Yes | Same Messages API endpoint with faster inference. ZDR applies regardless of speed setting. |
| [1M token context window](./developer-build-with-claude-context-windows.md) | `/v1/messages` | Yes | Extended context processing uses the standard Messages API. |
| [Adaptive thinking](./developer-build-with-claude-adaptive-thinking.md) | `/v1/messages` | Yes | Dynamic thinking depth uses the standard Messages API. |
| [Citations](./developer-build-with-claude-citations.md) | `/v1/messages` | Yes | Source attribution uses the standard Messages API. |
| [Data residency](./developer-build-with-claude-data-residency.md) | `/v1/messages` (with `inference_geo`) | Yes | Geographic routing uses the standard Messages API. |
| [Effort](./developer-build-with-claude-effort.md) | `/v1/messages` (with `effort`) | Yes | Token efficiency control uses the standard Messages API. |
| [Extended thinking](./developer-build-with-claude-extended-thinking.md) | `/v1/messages` (with `thinking`) | Yes | Step-by-step reasoning uses the standard Messages API. |
| [PDF support](./developer-build-with-claude-pdf-support.md) | `/v1/messages` | Yes | PDF document processing uses the standard Messages API. |
| [Search results](./developer-build-with-claude-search-results.md) | `/v1/messages` (with `search_results` source) | Yes | RAG citation support uses the standard Messages API. |
| [Bash tool](./developer-agents-and-tools-tool-use-bash-tool.md) | `/v1/messages` (with `bash` tool) | Yes | Client-side tool executed in your environment. |
| [Text editor tool](./developer-agents-and-tools-tool-use-text-editor-tool.md) | `/v1/messages` (with `text_editor` tool) | Yes | Client-side tool executed in your environment. |
| [Computer use](./developer-agents-and-tools-tool-use-computer-use-tool.md) | `/v1/messages` (with `computer` tool) | Yes | Client-side tool where screenshots and files are captured and stored in your environment, not by Anthropic. See [Computer use](./developer-agents-and-tools-tool-use-computer-use-tool.md#data-retention). |
| [Fine-grained tool streaming](./developer-agents-and-tools-tool-use-fine-grained-tool-streaming.md) | `/v1/messages` | Yes | Streaming tool parameters uses the standard Messages API. |
| [Prompt caching](./developer-build-with-claude-prompt-caching.md) | `/v1/messages` | Yes | Your prompts and Claude's outputs are not stored. KV cache representations and cryptographic hashes are held in memory for the cache TTL and promptly deleted after expiry. See [Prompt caching](./developer-build-with-claude-prompt-caching.md#data-retention). |
| [Structured outputs](./developer-build-with-claude-structured-outputs.md) | `/v1/messages` | Yes (qualified) | Your prompts and Claude's outputs are not stored. Only the JSON schema is cached, for up to 24 hours since last use. See [Structured outputs](./developer-build-with-claude-structured-outputs.md#data-retention). |
| [Tool search](./developer-agents-and-tools-tool-use-tool-search-tool.md) | `/v1/messages` (with `tool_search` tool) | Yes (qualified) | Only tool catalog data (names, descriptions, argument metadata) is stored server-side. See [Tool search](./developer-agents-and-tools-tool-use-tool-search-tool.md#data-retention). |
| [Batch processing](./developer-build-with-claude-batch-processing.md) | `/v1/messages/batches` | No | 29-day retention; async storage required. See [Batch processing](./developer-build-with-claude-batch-processing.md#data-retention). |
| [Code execution](./developer-agents-and-tools-tool-use-code-execution-tool.md) | `/v1/messages` (with `code_execution` tool) | No | Container data retained up to 30 days. See [Code execution](./developer-agents-and-tools-tool-use-code-execution-tool.md#data-retention). |
| [Programmatic tool calling](./developer-agents-and-tools-tool-use-programmatic-tool-calling.md) | `/v1/messages` (with `code_execution` tool) | No | Built on code execution containers; data retained up to 30 days. See [Programmatic tool calling](./developer-agents-and-tools-tool-use-programmatic-tool-calling.md#data-retention). |
| [Files API](./developer-build-with-claude-files.md) | `/v1/files` | No | Files retained until explicitly deleted. See [Files API](./developer-build-with-claude-files.md#data-retention). |
| [Agent skills](./developer-agents-and-tools-agent-skills-overview.md) | `/v1/messages` (with `skills`) / `/v1/skills` | No | Skill data retained per standard policy. See [Agent skills](./developer-agents-and-tools-agent-skills-overview.md#data-retention). |
| [MCP connector](./developer-agents-and-tools-mcp-connector.md) | `/v1/messages` (with `mcp_servers`) | No | Data retained per standard policy. See [MCP connector](./developer-agents-and-tools-mcp-connector.md#data-retention). |

<sup>1</sup> [Dynamic filtering](./developer-agents-and-tools-tool-use-web-search-tool.md#dynamic-filtering-with-opus-4-6-and-sonnet-4-6) is not ZDR-eligible.

<sup>2</sup> While web fetch is ZDR-eligible, website publishers may retain request data (such as fetched URLs and request metadata) according to their own policies.

## Limitations and exclusions

### CORS not supported

**Cross-Origin Resource Sharing (CORS)** is not supported for organizations with ZDR arrangements. If you need to make API calls from browser-based applications, you must:

- Use a backend proxy server to make API calls on behalf of your front end
- Implement your own CORS handling on the proxy server
- Never expose API keys directly in browser JavaScript

### Data retention for policy violations and where required by law

Even with ZDR arrangements in place, Anthropic may retain data where required by law or to combat Usage Policy violations and malicious uses of Anthropic's platform. As a result, if a chat or session is flagged for such a violation, Anthropic may retain inputs and outputs for up to 2 years.

## Frequently asked questions

<section title="How do I know if my organization has ZDR arrangements?">

Check your contract terms or contact your Anthropic account representative to confirm if your organization has ZDR arrangements in place.

</section>

<section title="Can I use ZDR-eligible (qualified) features under my ZDR arrangement?">

Yes. These features retain a minimal, documented set of technical data, not your prompts or Claude's outputs. See [Anthropic's approach to data retention](#anthropics-approach-to-data-retention) for the commitments that govern these features.

</section>

<Accordion title={'What happens if I use a feature marked "No"?'}>
Features marked "No" are fundamentally stateful: the Batch API stores your jobs, the Files API stores your files, and code execution runs in persistent containers. Data for these features is retained per the feature's documented policy. Using them is a choice to step outside your ZDR arrangement for that specific data.
</Accordion>

<section title="Can I request deletion of data from features that are not ZDR-eligible?">

Contact your Anthropic account representative to discuss deletion options for non-ZDR features.

</section>

<section title="Does this apply to Claude on AWS Bedrock or Vertex AI?">

No, only the Claude API is eligible for ZDR. For Claude deployments on AWS Bedrock or Vertex AI, refer to those platforms' data retention policies.

</section>

<section title="Is Claude Code eligible for ZDR?">

Claude Code is eligible for ZDR through two paths:

- **API keys:** Claude Code used with pay-as-you-go API keys from a Commercial organization
- **Claude Enterprise:** Claude Code used through Claude Enterprise with ZDR enabled for the organization

ZDR is enabled on a per-organization basis. Each new organization requires ZDR to be enabled separately by your account team. ZDR does not automatically apply to new organizations created under the same account.

Additionally, if you have metrics logging enabled in Claude Code, productivity data (such as usage statistics) is exempted from ZDR and may be retained.

For full details on ZDR for Claude Code on Claude Enterprise, including disabled features and how to request enablement, see the [Claude Code ZDR documentation](https://code.claude.com/docs/en/zero-data-retention).

</section>

<section title="Does Claude for Excel support ZDR?">

No, Claude for Excel is not currently ZDR-eligible.

</section>

<section title="How do I request ZDR?">

To request a ZDR arrangement, contact the [Anthropic sales team](https://claude.com/contact-sales).

</section>

## Related resources

- [Privacy Policy](https://www.anthropic.com/legal/privacy)
- [Batch processing](./developer-build-with-claude-batch-processing.md)
- [Files API](https://platform.claude.com/docs/en/api/files-create.md)
- [Agent SDK Sessions](./developer-agent-sdk-sessions.md)
- [Prompt caching](./developer-build-with-claude-prompt-caching.md)