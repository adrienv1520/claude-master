# What's new in Claude 4.6

Overview of new features and capabilities in Claude Opus 4.6.

---

Claude 4.6 represents the next generation of Claude models, bringing significant new capabilities and API improvements. This page summarizes all new features available at launch.

## New models

| Model | API model ID | Description |
|:------|:-------------|:------------|
| Claude Opus 4.6 | `claude-opus-4-6` | Our most intelligent model for building agents and coding |

Claude Opus 4.6 supports a 200K context window (with [1M token context window](./developer-build-with-claude-context-windows.md#1m-token-context-window) available in beta), 128K max output tokens, extended thinking, and all existing Claude API features.

For complete pricing and specs, see the [models overview](./developer-about-claude-models-overview.md).

## New features

### Adaptive thinking mode

[Adaptive thinking](./developer-build-with-claude-adaptive-thinking.md) (`thinking: {type: "adaptive"}`) is the recommended thinking mode for Opus 4.6. Claude dynamically decides when and how much to think. At the default effort level (`high`), Claude will almost always think. At lower effort levels, it may skip thinking for simpler problems.

`thinking: {type: "enabled"}` and `budget_tokens` are **deprecated** on Opus 4.6. They remain functional but will be removed in a future model release. Use adaptive thinking and the [effort parameter](./developer-build-with-claude-effort.md) to control thinking depth instead. Adaptive thinking also automatically enables interleaved thinking.

```python
response = client.messages.create(
    model="claude-opus-4-6",
    max_tokens=16000,
    thinking={"type": "adaptive"},
    messages=[{"role": "user", "content": "Solve this complex problem..."}],
)
```

### Effort parameter GA

The [effort parameter](./developer-build-with-claude-effort.md) is now generally available (no beta header required). A new `max` effort level provides the absolute highest capability on Opus 4.6. Combine effort with adaptive thinking for optimal cost-quality tradeoffs.

### Compaction API (beta)

[Compaction](./developer-build-with-claude-compaction.md) provides automatic, server-side context summarization, enabling effectively infinite conversations. When context approaches the window limit, the API automatically summarizes earlier parts of the conversation.

### Fast mode (research preview)

[Fast mode](./developer-build-with-claude-fast-mode.md) (`speed: "fast"`) delivers significantly faster output token generation for Opus models. Fast mode is up to 2.5x as fast at premium pricing ($30/$150 per MTok). This is the same model running with faster inference (no change to intelligence or capabilities).

```python
response = client.beta.messages.create(
    model="claude-opus-4-6",
    max_tokens=4096,
    speed="fast",
    betas=["fast-mode-2026-02-01"],
    messages=[{"role": "user", "content": "Refactor this module..."}],
)
```

### Fine-grained tool streaming (GA)

[Fine-grained tool streaming](./developer-agents-and-tools-tool-use-fine-grained-tool-streaming.md) is now generally available on all models and platforms. No beta header is required.

### 128K output tokens

Opus 4.6 supports up to 128K output tokens, doubling the previous 64K limit. This enables longer thinking budgets and more comprehensive responses. The SDKs require streaming for requests with large `max_tokens` values to avoid HTTP timeouts. If you don't need to process events incrementally, use `.stream()` with `.get_final_message()` to get the complete response. See [Streaming Messages](./developer-build-with-claude-streaming.md#get-the-final-message-without-handling-events) for details.

### Data residency controls

[Data residency controls](./developer-build-with-claude-data-residency.md) allow you to specify where model inference runs using the `inference_geo` parameter. You can choose `"global"` (default) or `"us"` routing per request. US-only inference is priced at 1.1x on Claude Opus 4.6 and newer models.

## Deprecations

### `type: "enabled"` and `budget_tokens`

`thinking: {type: "enabled", budget_tokens: N}` is **deprecated** on Opus 4.6. It remains functional but will be removed in a future model release. Migrate to `thinking: {type: "adaptive"}` with the [effort parameter](./developer-build-with-claude-effort.md).

### `interleaved-thinking-2025-05-14` beta header

The `interleaved-thinking-2025-05-14` beta header is **deprecated** on Opus 4.6. It is safely ignored if included, but is no longer required. [Adaptive thinking](./developer-build-with-claude-adaptive-thinking.md) automatically enables [interleaved thinking](./developer-build-with-claude-extended-thinking.md#interleaved-thinking). Remove `betas=["interleaved-thinking-2025-05-14"]` from your requests when using Opus 4.6.

### `output_format`

The `output_format` parameter for [structured outputs](./developer-build-with-claude-structured-outputs.md) has been moved to `output_config.format`. The old parameter remains functional but is deprecated and will be removed in a future model release.

```python
# Before
response = client.messages.create(
    output_format={"type": "json_schema", "schema": {...}},
    # ...
)

# After
response = client.messages.create(
    output_config={"format": {"type": "json_schema", "schema": {...}}},
    # ...
)
```

## Breaking changes

### Prefill removal

Prefilling assistant messages (last-assistant-turn prefills) is **not supported** on Opus 4.6. Requests with prefilled assistant messages return a 400 error.

**Alternatives:**
- [Structured outputs](./developer-build-with-claude-structured-outputs.md) for controlling response format
- System prompt instructions for guiding response style
- [`output_config.format`](./developer-build-with-claude-structured-outputs.md#json-outputs) for JSON output

### Tool parameter quoting

Opus 4.6 may produce slightly different JSON string escaping in tool call arguments (e.g., different handling of Unicode escapes or forward slash escaping). Standard JSON parsers handle these differences automatically. If you parse tool call `input` as a raw string rather than using `json.loads()` or `JSON.parse()`, verify your parsing logic still works.

## Migration guide

For step-by-step migration instructions, see [Migrating to Claude 4.6](./developer-about-claude-models-migration-guide.md).

## Next steps

<CardGroup>
  <Card title="Adaptive thinking" icon="brain" href="./developer-build-with-claude-adaptive-thinking.md">
    Learn how to use adaptive thinking mode.
  </Card>
  <Card title="Models overview" icon="list" href="./developer-about-claude-models-overview.md">
    Compare all Claude models.
  </Card>
  <Card title="Compaction" icon="compress" href="./developer-build-with-claude-compaction.md">
    Explore server-side context compaction.
  </Card>
  <Card title="Fast mode" icon="bolt" href="./developer-build-with-claude-fast-mode.md">
    Faster output token generation for Opus models.
  </Card>
  <Card title="Migration guide" icon="arrow-right" href="./developer-about-claude-models-migration-guide.md">
    Step-by-step migration instructions.
  </Card>
</CardGroup>