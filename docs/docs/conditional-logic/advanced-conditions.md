---
title: Advanced Conditions
sidebar_position: 30
---

# Advanced Conditions 

While basic conditions are great for simple use cases, Etch provides powerful advanced condition features for more complex scenarios. This guide will show you how to leverage these advanced features to create sophisticated conditional logic in your designs.

## Logical Operators

Etch supports logical operators to combine multiple conditions together:

### AND Operator (`&&`)

Use the `&&` operator when you want to show an element only if **all** conditions are true:

```
props.isActive && props.rating >= 4.5
```

This will only show the element if the component's `isActive` prop is `true` AND the `rating` prop is at least `4.5`.

### OR Operator (`||`)

Use the `||` operator when you want to show an element if **any** of the conditions are true:

```
user.userRoles.includes("administrator") || user.userRoles.includes("editor")
```

This will show the element if the user has either the `administrator` OR `editor` role.

## Nested Conditions

One of the most powerful features of Etch's advanced conditions is the ability to nest conditions within each other, creating complex logical expressions.

### Basic Nesting

You can nest conditions by using parentheses to group expressions:

```
(props.isActive || props.isHighlighted) && (props.rating >= 4.5)
```

This will show the element only if both of these conditions are true:

<table>
  <tr>
    <th width="45%">Condition 1</th>
    <th width="10%">Operator</th>
    <th width="45%">Condition 2</th>
  </tr>
  <tr>
    <td>The component is either active <b>OR</b> highlighted</td>
    <td><b>AND</b></td>
    <td>The component's rating is at least 4.5 stars</td>
  </tr>
</table>

## Dynamic Comparison Values

You can compare values dynamically in your conditions.

This condition checks if the current user is the author of the post:

```
this.author.id === user.id
```

This condition shows a product only when its price is within the budget specified in the URL parameter. To get to that point, let's say that a user filled out a form and specified a budget. Then they are redirected to a grid of products. This shows a product only when its price is within the budget specified in the URL parameter.

```
this.meta.price <= url.parameter.budget
```


## Loose vs Strict Comparisons

Understanding the difference between loose and strict comparisons is crucial for writing reliable conditions.

### Loose Comparisons (`==` and `!=`)

- Compares values after attempting type conversion
- `"5" == 5` returns `true` (string "5" is converted to number 5)
- `true == 1` returns `true` (boolean true is converted to number 1)
- `false == 0` returns `true` (boolean false is converted to number 0)

**Use Loose Comparisons when:**
- You want flexible matching regardless of data type
- You expect the data might come in different formats

### Strict Comparisons (`===` and `!==`)

- Compares both value AND type without conversion
- `"5" === 5` returns `false` (string vs number)
- `true === 1` returns `false` (boolean vs number)
- `false === 0` returns `false` (boolean vs number)

**Use Strict Comparisons when:**
- You need precise type and value matching
- Working with exact data validation
- You want to prevent unexpected type conversion bugs

In most cases, strict comparisons (`===`, `!==`) are safer and prevent unexpected behavior, but loose comparisons can be useful when dealing with data from different sources where type conversion is needed.

## Best Practices for Advanced Conditions

1. **Break complex conditions into smaller parts** - Instead of one massive condition, consider using multiple condition elements with simpler logic.

2. **Use parentheses for clarity** - Even when not strictly needed, parentheses can make your conditions more readable.

3. **Be careful with type conversion** - Remember from the Basic Conditions guide that loose comparisons (`==`, `!=`) perform type conversion while strict comparisons (`===`, `!==`) do not.


## Debugging Advanced Conditions

When working with complex conditions, debugging can be challenging. Here are some tips:

1. **Break it down** - Test each part of your condition separately to identify which part is not behaving as expected.

2. **Start simple and build up** - Begin with the simplest version of your condition and gradually add complexity.

3. **Check your data types** - Some condition issues stem from comparing values of different types.