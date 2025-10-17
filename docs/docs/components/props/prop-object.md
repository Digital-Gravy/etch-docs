---
title: Object Prop
sidebar_position: 55
---

# Object Prop

The Object Prop passes loop/object/array/json data from outside a component, into the component.

## Why the Object Prop Exists

There are two main reasons for the Object Prop:

1. It's important to build components in an atomized way. Using keys in a component that rely on specific configurations outside the component is bad component architecture. It harms the component's ability to be used, exported, shared, or migrated.
2. Sometimes it is preferable to pass an entire object or array at once, instead of creating props for everything separately.

The main thing you need to know is that loop/object/array/json data that exists outside of a component is not accessible to the component unless it's explicitly passed into the component via the Object Prop.

For example, if you create a blog post card component and put it inside `{#loop posts as post}`, you will notice that dynamic data keys like `{post.title}` and `{item.permalink.relative}` don't render. This is by design. 

To make dynamic data keys render in this scenario, you can create an Object Prop and map the keys to the object, like this: `{props.object.title}` and `{props.object.permalink.relative}`. 

When using the component, you tell the component instance which object to pass data from (the blog post loop in this example) and your keys will start working.

:::tip
Always think of a component as completely separated from the page you are currently editing. It has its own "scope." Therefore, the only data it has access to by default is *global* data (`this`, `site` or `url`). If the component needs to access *local* data, that data needs to be explicitly passed into the component. This is done with the Object Prop.
:::

## Adding Object Prop

When your component needs to be nested in a loop in order to function properly, it's a good indication that you need an Object Prop.

In the component editor, select "Object" from the props list.

![Etch Object Prop](../img/etch-object-prop.avif)

There are two things you need to know about the Object Prop:

1. The key for your Object Prop will be the base key for all your dynamic data (e.g. `{props.yourObject.foo}`).
2. The object input is for fallback/preview content only.

## Using the Object Prop in the Component Editor

Once you've created an Object Prop and named it, you can start to reference the data it's going to pull. This is done the same way you reference all other dynamic data. The only difference is that you use the `props` extension combined with the object key.

Using a simple blog post card as an example: 

We create an Object Prop named "post". Our card is going to have a featured image, heading, and link.

- Heading === `{props.post.title}`
- Featured Image === `{props.post.featuredImage}`
- Link === `{props.post.permalink.relative}`

## Previewing Data

Since the dynamic data now relies on an external object that you're not currently referencing, the dynamic data keys will fail to resolve to anything while you're building the component. They'll also fail to resolve when the component is used, until the object prop is told to reference something.

This isn't great for DX or UX because empty/broken components that are waiting on data aren't very user friendly.

That's what the Object Prop code editor is for. It accepts placeholder/default object data and will render that data when an object source is not available.

For our blog post card situation, we'd add the following JSON to our Object Prop in the component editor:

```json
{
    "title": "Title of the Post",
    "featuredImage": "[url-to-sample-image]",
    "permalink.relative": "#"
}
```

This is the data you'll see while you're building the component. And when you use the component in your development workflow, it's the data you'll see prior to choosing a source object.

## Using Your Component

Once your component is built using the Object Prop, it's very easy to use. Simply drop your component into the page and look for the object attribute in the attributes panel. It will be named whatever you named your Object Prop.

This input is a combobox. If you place the component inside a loop, it will automatically populate itself with the proper key from any parent or ancestor loops. If it's a single loop, your component will work out of the box. If it's a nested loop, you'll want to make sure that the correct data source is selected.

You also type custom values into the input for edge case scenarios.