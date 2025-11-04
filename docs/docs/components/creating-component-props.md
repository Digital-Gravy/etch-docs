---
title: Creating Component Props
sidebar_position: 20
---

# Creating Component Props 

Props are the customizable properties that make components dynamic and reusable. They allow you to pass different data and control how components behave in different contexts.

Think of props as the "settings" for your component. Just like how you can adjust the settings on your phone (brightness, volume, etc.), props let you adjust how your component looks and behaves and what it says.

## Prop Planning

There are two main types of props:

### 1. Data Props
Data props are placeholders for content that changes between component instances. They allow you to display different information while maintaining the same structure and styling.

**Examples of data props:**
- **Text content**: Titles, descriptions, labels
- **Images**: Featured images, logos, icons
- **Links**: URLs for buttons, navigation items
- **Numbers**: Prices, ratings, quantities

**Example scenario**: A product card component might have data props for:
- `productName` - The name of the product
- `productPrice` - The price of the product
- `productImage` - The product's image
- `productDescription` - A brief description

### 2. Behavior Props
Behavior props control how a component functions or appears. They typically use boolean values (true/false) or specific options to determine component behavior.

**Examples of behavior props:**
- **Visibility controls**: Show/hide elements based on conditions
- **Style variations**: Different visual states (active, disabled, featured)
- **Functionality toggles**: Enable/disable features
- **Layout options**: Different arrangements or sizes

**Example scenario**: A button component might have behavior props for:
- `isDisabled` - Whether the button is clickable
- `isPrimary` - Whether to use primary or secondary styling
- `size` - Small, medium, or large button size
- `showIcon` - Whether to display an icon alongside text

## Why Props Matter

Props make your components:
- **Reusable**: Use the same component with different content
- **Flexible**: Adapt to different contexts and requirements
- **Maintainable**: Update one component to affect all instances
- **Consistent**: Maintain design standards across your site

## Adding Props in Etch
To add a prop to a component, click the "+" icon near the top of the component editor panel.

![Adding a prop to a component](./img/component-add-prop.avif)

Next, click on the prop type that you're wanting:

### Available Props
- **[Text](./props/prop-text)** - A simple text input for titles, descriptions, labels, or any string content.
- **[Boolean](./props/prop-boolean)** - True/false values for controlling visibility, states, or conditional behavior.
- **[Select](./props/prop-select)** - Dropdown options for choosing from predefined values (like sizes, categories, or themes).
- **[Image](./props/prop-image)** - Image upload and selection for photos, icons, logos, or any visual content.
- **[Array](./props/prop-array)** - Multiple values or objects for lists, collections, or complex data structures.
- **[Slot](./prop-slot)** - Content areas where you can drag and drop other components or elements.

Once added, you'll see it in the Component Editor.

![Adding a new prop to a component](./img/component-new-prop.avif)

Every prop has two mandatory values: **Name** & **Key**

- **Label** - The display name that appears in the component editor interface
- **Key** - The internal identifier used in code and data mapping

You can double click the Label to edit and the same is true for Key.

Repeat the process for all necessary props.

## Next Steps

Now that you understand the basics of adding props, the next step is:
- [Map props to your component](./mapping-component-props)
