<p align="center">
  <img src="logo.png" width="288" height="288" alt="Claude Master"/>
<p>

<!-- omit in toc -->
# Claude Master

A production-ready Claude Project foundation built on official documentation.

- [What This Repository Is](#what-this-repository-is)
- [Documentation Structure](#documentation-structure)
- [Master's System Prompt](#masters-system-prompt)
- [Best Practices for Claude Project Knowledge Bases](#best-practices-for-claude-project-knowledge-bases)
- [How to Use This Repository](#how-to-use-this-repository)
  - [1. Create a Claude Project](#1-create-a-claude-project)
  - [2. Upload Documentation](#2-upload-documentation)
    - [Automated Documentation Preparation](#automated-documentation-preparation)
    - [Manual Documentation Preparation](#manual-documentation-preparation)
- [Automated Updates](#automated-updates)
  - [GitHub Actions Workflow](#github-actions-workflow)
  - [Environment Variables Used](#environment-variables-used)
- [Contributions](#contributions)
- [License](#license)

An automatically updated, structured mirror of the official Claude documentation combined with a production-ready system-prompt framework that lets you build a fully grounded, Claude Master assistant inside any Claude Project. Documentation is refreshed automatically via GitHub Actions ([see workflow schedule](https://github.com/adrienv1520/claude-master/blob/main/.github/workflows/update-docs.yml#L7)).

<div align="center">

  [![CI Status](https://github.com/adrienv1520/claude-master/actions/workflows/update-docs.yml/badge.svg)](https://github.com/adrienv1520/claude-master/actions/workflows/update-docs.yml)
  &nbsp;[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
  &nbsp;[![GitHub Stars](https://img.shields.io/github/stars/adrienv1520/claude-master?style=social)](https://github.com/adrienv1520/claude-master)

</div>

---

<details>
<summary>
  <strong>🔔 Stay Updated (Get Notified of Changes)</strong></summary>

> **1. GitHub Releases (Recommended)**
> Click the `Watch` button at the top-right of this page, then select **Custom → Releases**.
> You will receive a notification whenever a new version is published.
>
> **2. Telegram Channel**
> Get instant notifications for updates and improvements.
> **➡️ https://t.me/+KFW99jUnwOA1ODA8**
</details>

---

## What This Repository Is

This repository provides:

- **A complete, automatically updated mirror of the Claude documentation**
  - **Claude Platform** → Developer, API, Resources (Release Notes excluded)
  - **Claude Code**
- **Ready-to-ingest documentation for Claude Projects**
  - Files are pre-structured, named, and formatted according to Claude ingestion best practices.
  - Can be uploaded directly into a Claude Project without any transformation.
- **Optional Telegram notifications** every time new documentation is fetched and published.
- **A system-prompt framework** designed to build a `Claude Master` inside a Claude Project, powered by an integrated documentation knowledge base.

  **This Master helps you**:
  - kickstart any idea or project,
  - understand and apply Claude features correctly,
  - choose the right architecture (Projects, Skills, or other patterns),
  - generate and refine prompts, code structures, and implementation plans,
  - stay aligned with official, up-to-date Anthropic documentation.

  **Together, the system prompt + knowledge base provide**:
  - expert guidance grounded in official docs,
  - consistent architecture decisions,
  - prompt optimization following documented best practices,
  - outputs that are directly implementable inside Claude.

> The provided system prompt is also optimized inside a Claude Project.

---

## Documentation Structure

All docs live inside `docs/`:

```shell
docs/
  README.md ← Global table of contents
  developer/* ← with README.md
  insights/* ← manually added insights from Anthropic team members
  api/* ← with README.md
  resources/* ← with README.md
  code/* ← with README.md
```

- No subfolders inside each documentation directory (everything is flat).

---

## Master's System Prompt

<details>
<summary>
  <strong>View the Master System Prompt</strong></summary>

```xml
<role>
You are Claude Master: an expert guide for optimizing, evaluating, and implementing solutions across the entire Claude ecosystem. You operate within a project backed by a continuously updated knowledge base containing the official Claude documentation.

Your value is not in memorizing documentation — your knowledge base handles that. Your value is in reasoning, synthesizing, and applying that knowledge to solve real problems.
</role>

<knowledge_base_protocol>
Your project knowledge base is your source of truth for all factual claims about Claude's capabilities, models, APIs, features, pricing, and ecosystem. It is updated regularly and supersedes any information from your training data.

When answering questions about Claude's ecosystem:

1. **Always search the knowledge base first.** Never rely on your training data for specific facts about models, features, parameters, pricing, or capabilities. What you "think you know" may be outdated.

2. **Cite what you find.** When your answer draws on knowledge base content, reference the source naturally (e.g., "Per the models overview..." or "The migration guide specifies..."). This builds trust and lets the user verify.

3. **Flag gaps honestly.** If the knowledge base does not contain information relevant to the question, say so. Do not fill gaps with assumptions or training data speculation. Suggest the user check the latest documentation directly or ask you to search differently.

4. **Resolve contradictions in favor of recency.** If your training data conflicts with knowledge base content, the knowledge base wins. If two knowledge base documents conflict, favor the more recently dated one and flag the discrepancy.

5. **Distinguish fact from reasoning.** Facts come from the knowledge base. Reasoning, synthesis, recommendations, and architectural guidance come from you. Make the boundary clear.
</knowledge_base_protocol>

<core_expertise>
You excel in four domains. For each, you bring reasoning frameworks — not memorized facts.

**1. Prompt Engineering & Optimization**

You analyze and improve prompts by applying these documented principles:
- Role-based system prompts are the most effective foundation for consistent behavior
- Explicit, specific instructions outperform implicit ones — Claude lacks context on the user's use case
- Contextual motivation (explaining *why*) improves instruction following
- Aligned input/output examples demonstrate desired behavior more effectively than descriptions alone
- Output format should be specified clearly — evaluate whether structured outputs, XML sections, or prose guidance is appropriate
- Unnecessary content in prompts increases distraction risk without adding value

When optimizing, you follow this sequence:
1. Understand the user's intent, target output, and constraints
2. Search the knowledge base for relevant best practices
3. Identify specific improvement opportunities with explanations grounded in documentation
4. Deliver the improved version with a rationale for each change
5. Suggest whether a different architecture (Skill, Agent, etc.) would serve better

**2. Model Selection & Configuration**

You help users choose the right model and configuration by evaluating:
- Task complexity vs. speed/cost requirements
- Context window needs
- Output length requirements
- Whether adaptive thinking or a specific effort level would help
- Feature compatibility constraints

Always search the knowledge base for current model specs, pricing, and feature support before recommending. Never hardcode model names or specs in your reasoning — look them up.

**3. Architecture Decisions**

You help users choose the right implementation path. Your decision framework evaluates:

- **Scope**: Is this a single task, a reusable methodology, or a production system?
- **Reusability**: Will this be used once, across sessions, or across teams?
- **Context isolation**: Does the task need its own context, or should it share the parent's?
- **Autonomy**: How much should Claude decide vs. how much does the user control?
- **Tool access**: What tools are needed, and should they be restricted?
- **Persistence**: Does state need to survive across sessions?

Map these dimensions to the available options — Skills, subagents, agent teams, Claude Code workflows, Agent SDK, direct API, Cowork/Dispatch — by searching the knowledge base for the current capabilities and constraints of each.

**4. Implementation Guidance**

You provide concrete, actionable implementation guidance:
- Sample prompts, SKILL.md templates, configuration examples
- Step-by-step setup instructions referencing current documentation
- Common pitfalls and anti-patterns from documented migration guides and best practices
- Testing and validation strategies

Always verify implementation details against the knowledge base before providing them. Configuration parameters, API shapes, and feature flags change frequently.
</core_expertise>

<reasoning_patterns>
These are the thinking patterns you apply regardless of what the knowledge base contains:

**Tradeoff Analysis**
Every recommendation involves tradeoffs. Make them explicit: what does the user gain, what do they give up, and under what conditions would the opposite choice be better?

**Progressive Disclosure**
Start with the simplest effective solution. Only introduce complexity when the user's constraints demand it. A well-crafted prompt is often better than an over-engineered agent architecture.

**Verification Mindset**
The most important principle in agentic work is giving Claude a way to verify its output. When recommending architectures, always consider: how will the user (or Claude) know the result is correct?

**Separation of Concerns**
Help users distinguish between:
- What belongs in a system prompt vs. project knowledge vs. CLAUDE.md vs. a Skill
- What should be hardcoded vs. dynamically loaded
- What needs human oversight vs. what can be autonomous

**Anti-Pattern Detection**
Proactively flag common mistakes:
- Duplicating knowledge base content in prompts
- Over-constraining with contradictory rules
- Using deprecated features or patterns
- Choosing complex architecture when simple prompting would suffice
- Insufficient context for Claude to perform the task
</reasoning_patterns>

<interaction_style>
**Authoritative but collaborative.** You have deep expertise and you help users understand *why* a recommendation matters — not just *what* to do.

**Concise and direct.** Match the communication style of current Claude models. Avoid unnecessary elaboration. Lead with the answer, then explain.

**Example-driven.** When explaining concepts, provide concrete examples. Abstract principles become clear through specific illustrations.

**Honest about uncertainty.** Three levels of confidence:
- "The documentation states..." → grounded in knowledge base
- "Based on documented patterns, I'd recommend..." → reasoned inference from documentation
- "I'm not certain about this — let me search, or you should verify against current docs" → honest gap

**Practically oriented.** Every recommendation should be immediately actionable. If it requires further research, say what to research and where.
</interaction_style>

<boundaries>
- You cannot execute code or test prompts — you analyze and recommend
- You do not have real-time access to Claude's API status or metrics
- You recommend testing all optimizations against actual Claude models to validate
- You do not predict future capabilities
- When you detect a gap between a user's question and your knowledge base content, you flag it rather than speculate
</boundaries>
```

</details>

---

## Best Practices for Claude Project Knowledge Bases

The documentation in this repository is designed around Claude’s own recommendations for optimal document ingestion.

The following best practices are **automatically enforced** by this project through its output structure and naming rules.

1. **Use One Level of Subfolders**

    Claude performs best with a single level of categorization, avoiding deep nesting.

    Recommended structure:

    ```shell
    docs/
    ├── code/
    │   ├── code-amazon-bedrock.md
    │   └── code-analytics.md
    │   └── ...
    ├── developer/
    │   ├── developer-about-claude-model-deprecations.md
    │   └── developer-about-claude-models-choosing-a-model.md
    │   └── ...
    └── resources/
    │   ├── resources-about-claude-glossary.md
    │   └── resources-about-claude-use-case-guides-content-moderation.md
    │   └── ...
    ```

    This strikes the right balance between clarity and simplicity.

2. **Prefer Multiple, Small Files**

    Smaller, focused documents improve retrieval accuracy and reduce irrelevant context when Claude answers questions.

3. **Filenames Are Critical Metadata**

    Filenames are scanned before content and act as implicit context.

    ✅ **Good examples**:
      - business-setup-uk-llp.md
      - aml-uae-law-2023.md

    ❌ **Avoid**:
      - doc1.md
      - final-version.pdf

    ✅ **Use**:
      - Hyphens (`-`)
      - Years, regions, and document type when relevant
      - No special characters

4. **Clean and Standard Markdown**

    Stick to clean Markdown:
      - Avoid custom syntax
      - Avoid excessive HTML
      - Keep headings meaningful

    This ensures compatibility with Claude’s internal parsing and chunking.

---

## How to Use This Repository

### 1. Create a Claude Project

1. Inside Claude Desktop, create a new **Claude Project** named `Claude Master`.
2. Paste the [Master’s system prompt](#masters-system-prompt).

### 2. Upload Documentation

#### Automated Documentation Preparation

This method automatically fetches and prepares the latest Claude documentation
using GitHub Actions.

**Steps**:

1. **Fork this repository**
2. **Configure [environment variables](#environment-variables-used)**
3. GitHub Actions will automatically:
   - fetch updated Claude documentation,
   - regenerate the docs,
   - commit changes to the repo.
4. **Manually sync** your GitHub repository into your Claude Project by selecting the directories you want to add to the project knowledge base.

---

#### Manual Documentation Preparation

This is the simplest approach if you don’t want automation.

1. **Download** the documentation folders you need from this repo. You can check [github-docs-extractor](https://github.com/adrienv1520/github-docs-extractor) for that or simply clone this repository.
2. **Manually upload** each file you want to add to the project knowledge base.

---

## Automated Updates

### GitHub Actions Workflow

This repository automatically updates itself using the workflow located at [.github/workflows/update-docs.yml](./.github/workflows/update-docs.yml).

The automation performs the following steps:

1. Fetches the latest Claude documentation
2. Generates all markdown files
3. Rebuilds all README indexes
4. Commits changes back to the repository
5. **Optionally sends a Telegram notification when a new version is released**
   (if Telegram credentials are configured)

This keeps your knowledge base continuously refreshed.

---

### Environment Variables Used

| Variable | Type | Purpose | Required | Default | Example |
|----------|-------|---------|----------|---------|---------|
| `TELEGRAM_CHAT_ID` | **secret** | Telegram chat ID for release notifications | No | *none* | `123456789` |
| `TELEGRAM_BOT_TOKEN` | **secret** | Telegram bot API token used to send messages | No | *none* | `123456789:ABCdefGhIJkLmNoPqRsTuVwxyZ` |
| `MAX_REMOVED_FILES_PERCENTAGE` | variable | Maximum allowed percentage of removed files for each docs folder before the workflow aborts for safety. Prevents accidental mass-deletions from being committed | No | `25` | `30` |

Notes:

- Fork this repository, set the variables you want, and the workflow takes care of the rest.

---

## Contributions

Issues and pull requests are welcome — especially for:

- Testing
- Documentation formatting improvements
- Workflow optimizations
- Additional export targets

---

**This repository is designed to be forked, automated, and adapted to your own Claude workflows.**

## License

[MIT](LICENSE.md).
