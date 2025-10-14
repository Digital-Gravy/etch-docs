---
title: Component Slots
sidebar_position: 60
---

# Component Slots

A Slot in a component is not actually a "prop" the way other props are. You can think of a Slot as a "drop zone" that can accept any content. It allows you to place anything inside a component from the outside.

Slots can be difficult to wrap your head around at first. The best way to think about it is this:

Every other "prop" in component design forces you to define exactly what type of data is accounted for and/or allowed: text, image, boolean, link, etc.

Slots, on the other hand, let you define an area of the component where anything can be dropped in.

The easiest example to understand is an accordion component for Frequently Asked Questions.

The accordion heading is almost always just text, so you can easily use a text prop. This will allow us to write the "question" part of the FAQ.

What about the content of the accordion, though — the answer part of the FAQ? 

Should it be text? Should it be a combination of text and images? How much text? How many images? What if I want to include a link? What if I want to include a button? How do we determine what style of button? 

That's a lot of questions. And if we have to configure props and conditional logic for all the possibilities, that's going to be a tremendously complex component that still ends up with a lot of limitations.

Instead of programming all that complexity via props, all we have to do is define a slot in the accordion content area. Once the slot is defined, users can drop anything they want in the slot and be happy. 100% flexibility with zero complexity!

To add a slot, click the slot icon and give it a name in camelCase. Make sure you place the slot in the area of the component where you want slot content to show up. That's it!

:::warning Common Confusion
A slot is an empty drop-zone that you define at the component level. This means each component instance will have a slot available for unique content. You should not try to add content to the slot from inside the component editor — slots are for adding content to each instance from *outside* the component editing context (e.g. the normal page development workflow).
:::