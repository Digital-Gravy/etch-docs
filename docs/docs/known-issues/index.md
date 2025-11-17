---
title: Known Issues
sidebar_position: 10
---

# Known Issues & Areas of Improvement

Great software is never "done," and that's certainly true for software as young as Etch. We are committed to continuous improvement and transparency about the current limitations, bugs, and areas where we know things could be better. 

This page documents the most significant known issues and areas we're actively planning to improve. If you encounter a problem not listed here, please let us know so we can investigate and address it in future updates.

## Content Hub / CPTs / Custom Fields

This area of Etch is a functional Proof of Concept so that users can start to experience the tremendous advantages of a "unified workflow." It's a high priority area and will get progressively better very quickly, but the CPT/Custom Fields functionality should be treated as more of a playground right now than a real part of your workflow (unless your needs are very basic).

## Partial Selectors

The HTML editor allows you to write classes in plain HTML, which it then parses into attached selector pills on the element. The one limitation of this workflow is that it has to be debounced, which means it has to try and guess when you're done typing.

If you're a fast typer, you won't have any issues. If you're a slow typer and constantly pause or stop to think, Etch will think you're done and will create a selector out of the partial selector you typed. This can result in having tons of partial selectors in your style manager.

If you find partial selectors in your style manager, it's a sign that you should stop using the HTML editor to add classes to elements. Instead, use the add attribute bar/workflow which allows you to type at any speed and doesn't require any debouncing or guessing.