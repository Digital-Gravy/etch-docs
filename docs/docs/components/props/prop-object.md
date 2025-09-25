---
title: Object Prop
sidebar_position: 1000
---

# Object Prop

The Object Prop passes loop/object/array/json data from outside a component, into the component.
The most basic example would be to pass an entire post into a post card component like this:
```
{#loop allPosts as currentPost}
  <PostCard post={currentPost}/>
{/loop}
```
Within the component, the entire post object is now accessible under the `props.post` key.
To retrieve the posts title you can write `{props.post.title}` for example.

## Why the Object Prop Exists

Sometimes it is preferable to pass an entire object or array at once, instead of creating props for everything separately.
Especially if you try to access data from a loop wrapping your component, inside your component, without passing it as a prop, it will not work.

For example, if you create a component without an object prop, and put it inside a `{#loop allPosts as post}`, you will find you cannot access e.g. `{post.title}` when editing the component. This is by design, as a component should be atomic, and not dependend on anything from outside. 
_Everything a component "needs" should be given to it as a prop._

:::tip

Always think of a component as completely separated from the page you are currently editing, it has its own "scope", and can only see `props` and global keys like `this`, `site` or `url`.

:::


Let's say you build a blog post card component with the intention of using it inside a loop that will be configured to query blog posts.

If the blog post card uses dynamic data keys like `{item.title}`, then you've created a component that relies on the loop key being "item."

If the loop is `{#loop posts as post}`, your component will fail to render any data. You'll be forced to change the key from `post` to `item` or change every dynamic data tag in the component to `post.foo` (which will still create the same problem in reverse).

Using keys in a component that rely on specific configurations outside the component is bad component architecture. It harms the component's ability to be exported, shared, or migrated.

The solution is to base the keys you're using in the component on a definitive object. Thus, we have our use case for the Object Prop.

## Using the Object Prop

When your component needs to be nested in a loop in order to function properly, it's a good indication that you need an Object Prop.

In the component editor, select "Object" from the props list.

![Etch Object Prop](../img/etch-object-prop.avif)

There are two things you need to know about the Object Prop:

1. The key for your Object Prop will be the base key for all your dynamic data.
2. The object input is for fallback/preview content only.

