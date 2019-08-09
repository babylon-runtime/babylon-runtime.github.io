---
title: "Babylon Runtime Documentation"
layout: single
toc : true
sidebar:
   nav: "docs"  
---

## Code less, Babylon more

<p style="text-align:center; width:100%;"><img src="https://raw.githubusercontent.com/babylon-runtime/_r.assets/master/_runtime-logo/exports/_runtime-logo_circleWhite_512.png" alt="babylon runtime logo" width="250" ></p>

<span style="color:#e0684b">\_r</span><span style="color:#201936">untime</span>, aka **<span style="color:#e0684b">\_r</span>**, is a lightweight *write less, do more* [BabylonJS](https://www.babylonjs.com/) library.

The purpose of **<span style="color:#e0684b">\_r</span>** is to make BabylonJS much easier to use and maintain in the 3D workflow, for both artists and developpers.

```javascript
_r.patch([{
    "*wood*": {
        "albedoColor": "red"
    }
}]);
```
> Setting red albedoColor for all wood materials with _runtime.

### For artists

<span style="color:#e0684b">\_r</span><span style="color:#201936">untime</span> will allow you to:
- easily tweak your BabylonJS scenes
- export and reexport your scenes as many as you want without loosing your tweaks
- avoid as much as possible writing code
- do simple animations in a fast way

### For developpers

<span style="color:#e0684b">\_r</span><span style="color:#201936">untime</span> will allow you to:
- mass-select & filter elements in a easy way
- manage scene files
- quickly bind user interactions
- handle custom metadata & events on assets

## Install

### Dependencies

- [BabylonJS](https://www.babylonjs.com/) (yep, 'seems obvious)
- (optionnal) [PEP](https://doc.babylonjs.com/how_to/interactions#pointer-interactions) to get touch events
- that's it!

### Integration

Add the online dist in your `<head>` using:

```html
<script src="https://unpkg.com/babylon-runtime@latest/dist/_r.min.js"></script>
```

Or download and load it locally from the [github repo releases](https://github.com/babylon-runtime/_r/releases):

```html
<!doctype html>
<html>
<head>
    <meta charset="utf-8">
    <script src="babylon.js"></script>
    <script src="_r.min.js"></script>
</head>
<body>

</body>
</html>
```

## Launch

No need to manually create the canvas, _r will do that for you, by using the [launch](api/launch/) function:

```html

<body>
    <script type="text/javascript">
        _r.launch({
            scene : "assets/cornellBox.babylon",
            activeCamera : "Camera"
        });
    </script>
</body>

```

> This load the file **cornellBox.babylon** from the **assets/** folder, and set the camera named **Camera** as default scene active camera.

<p class="codepen" data-height="265" data-theme-id="light" data-default-tab="js,result" data-user="BabylonRuntime" data-slug-hash="VRrwxQ" data-preview="true" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid black; margin: 1em 0; padding: 1em;" data-pen-title="_r.launch - 01">
  <span>See the Pen <a href="https://codepen.io/BabylonRuntime/pen/VRrwxQ/">
  _r.launch - 01</a> by Babylon Runtime (<a href="https://codepen.io/BabylonRuntime">@BabylonRuntime</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

<br>

It's now time to do your [firsts steps using \_runtime](/first-steps/launch/).