---
title: "In-depth patching"
layout: single
toc : true
permalink: /going-further/advanced-patching/
sidebar:
   nav: "docs"  
---

## Mass-patching

### Dancing with the ~~star~~ asterisk

What if we want a bunch of materials using the exact same property? It looks like very annoying to copy-paste a patch for each element, right?

Here comes the `*`! This little char will tell to runtime that `*` = whatever-you-want-characters.

For example, if you have vegetation with many leaves type (and so with many different materials), using `leave` somewhere in their names, you can patch all of these materials in one shot.


```javascript
{
   "*leave*":{
      "useAlphaFromAlbedoTexture": true
   }
}
```

Note that \_runtime is [**case-sensitive**](https://en.wikipedia.org/wiki/Case_sensitivity) (like BabylonJS)!

So in the example above, `oak-leaves.000`, `leavePoplar01.000` and `chestnutleave` materials will be tweaked, but **not** `oakLeaves`.

<p class="codepen" data-height="285" data-theme-id="light" data-default-tab="js,result" data-user="BabylonRuntime" data-slug-hash="VRrwdQ" data-preview="true" style="height: 285px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid black; margin: 1em 0; padding: 1em;" data-pen-title="_r.advancedPatching - 01">
  <span>See the Pen <a href="https://codepen.io/BabylonRuntime/pen/VRrwdQ/">
  _r.advancedPatching - 01</a> by Babylon Runtime (<a href="https://codepen.io/BabylonRuntime">@BabylonRuntime</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

> see [examples/going-further/advanced-patching/01.html](https://github.com/babylon-runtime/_r.assets/blob/master/babylon-runtime.github.io/examples/going-further/advanced-patching/01.html) using [patch.patch](https://github.com/babylon-runtime/_r.assets/blob/master/babylon-runtime.github.io/examples/going-further/advanced-patching/assets/patch.patch)

How to patch also materials using `Leave` *or* `leave`? We could use `*eave*` selector, but it's not very convenient to read an retrieve. That's why we will use multiple selectors.

### Multiple selectors

Sending multiple selectors is very easy to do, just write them successively separated with a comma `,`:

```javascript
{
   "*leave*, *Leave*":{
      "useAlphaFromAlbedoTexture": true
   }
}
```

In the example above, `oak-leaves.000`, `leavePoplar01.000`, `chestnutleave` and `oakLeaves` materials will be tweaked.

<p class="codepen" data-height="" data-theme-id="light" data-default-tab="js,result" data-user="BabylonRuntime" data-slug-hash="KEyKBK" data-preview="true" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid black; margin: 1em 0; padding: 1em;" data-pen-title="_r.advancedPatching - 02">
  <span>See the Pen <a href="https://codepen.io/BabylonRuntime/pen/KEyKBK/">
  _r.advancedPatching - 02</a> by Babylon Runtime (<a href="https://codepen.io/BabylonRuntime">@BabylonRuntime</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

> example with the BJS logo in the cornellBox, see [examples/going-further/advanced-patching/02.html](https://github.com/babylon-runtime/_r.assets/blob/master/babylon-runtime.github.io/examples/going-further/advanced-patching/02.html) using [patch02.patch](https://github.com/babylon-runtime/_r.assets/blob/master/babylon-runtime.github.io/examples/going-further/advanced-patching/assets/patch02.patch)

### Filters

Using our leaves example, you may be wondering "if somes meshes are named using `leave` too, are they patched also?!".

Answer is yes: actually, if a property doesn't exist on an element, \_runtime will write it as kind-of metadatas (we will [talk about that](../metadatas/) later).

So a mesh will get a new property named `useAlphaFromAlbedoTexture`, but considering our example it is totally useless. Note that adding a new property is not a big deal and should not affect neither performances or engine stability.

How to avoid this? We can use a filter, like `:material`

```javascript
{
   "*leave*:material, *Leave*:material":{
      "useAlphaFromAlbedoTexture": true
   }
}
```

Here only material elements using `leave` or `Leave` in their names will be modified!

See [\_r.select API](../../api/select/) to see all available filters.

<p class="codepen" data-height="" data-theme-id="light" data-default-tab="js,result" data-user="BabylonRuntime" data-slug-hash="EMbxLZ" data-preview="true" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid black; margin: 1em 0; padding: 1em;" data-pen-title="_r.advancedPatching - 03">
  <span>See the Pen <a href="https://codepen.io/BabylonRuntime/pen/EMbxLZ/">
  _r.advancedPatching - 03</a> by Babylon Runtime (<a href="https://codepen.io/BabylonRuntime">@BabylonRuntime</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

> example with the BJS logo in the cornellBox, see [examples/going-further/advanced-patching/03.html](https://github.com/babylon-runtime/_r.assets/blob/master/babylon-runtime.github.io/examples/going-further/advanced-patching/03.html) using [patch03.patch](https://github.com/babylon-runtime/_r.assets/blob/master/babylon-runtime.github.io/examples/going-further/advanced-patching/assets/patch03.patch)

