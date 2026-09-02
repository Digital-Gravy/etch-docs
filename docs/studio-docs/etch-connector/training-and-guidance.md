---
title: Training & Guidance
sidebar_position: 25
---

# Training & Guidance

Etch Connector ships with **no built-in guidance for your AI assistant**. This page explains what that means and why it's intentional.

## What "no guidance" means

When you connect an AI assistant through Etch Connector, the connector gives it two things: the ability to run commands against your live builder tab, and access to the Etch documentation so it knows the correct syntax. That's it.

What the connector does **not** do is tell the assistant _how_ you like to work. It doesn't inject opinions about:

- Naming conventions (class names, components, custom fields)
- Code style and structure (how to organize sections, when to make a component, BEM vs. utility classes)
- Which tools or frameworks to lean on (for example, whether to use ACSS)
- Your project's specific patterns and preferences

In other words, the assistant arrives knowing how to drive Etch, but not how _you_ want things built. Out of the box it will fall back on its own general defaults.

## Why it works this way

This is by design. There's no single "right" way to build a site, and baking one opinionated ruleset into the connector would force that opinion on everyone. Instead, the connector stays neutral so you stay in control of how your assistant behaves.

That leaves you two paths:

- **Write your own guidelines.** Define the conventions, patterns, and preferences you want the assistant to follow, tailored to you or your team.
- **Import someone else's rulesets.** Drop in a ruleset published by another developer, an agency, or the community — and adjust it to taste.

## Where guidance lives

Guidance belongs with your AI assistant, not in the connector. Most coding assistants read project-level instructions from a rules file in your working directory — for example, an `AGENTS.md` or `CLAUDE.md` file, or a tool-specific rules folder. Put your conventions there, and the assistant will apply them every time it works through the connector.

A good ruleset usually covers things like your preferred class-naming approach, when to create components, how to structure pages and sections, and any tools or standards you always use.

:::tip
Start small. Add a few rules that capture the conventions you care about most, then refine them as you watch how the assistant builds. Importing an existing ruleset is a fast way to get a solid baseline you can tweak.
:::

For notes aimed at the assistant itself once it's connected, see the [AI Agent Guide](./ai-agent-guide.md).
