---
title: Select Prop
sidebar_position: 30
---

# Select Prop

The Select Prop is a dropdown selection field that allows you to declare multiple `key : value` pairs with the "key" essentially being the "label" or "option" in the dropdown. The "value" is typically output as code.

If the key and value are to be the same, you can define a single key, which will also be the value by default.

One key, or one key-value pair, should be placed on each line.

:::info
When writing a key/value pair, it's imperative that you put a space between the key (label), the ":" (separator), and the value when defining key/value pairs. 

**Incorrect:** `key:value`

**Correct:** `key : value`.
:::

Referencing a select prop with dynamic data will output the value of the prop by default. It's not currently possible to output the key, though it will be in the future.