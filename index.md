---
title: "Babylon Runtime"
layout: single
sidebar:
   nav: "docs"  
---

## Code less, Babylon more

<p style="text-align:center; width:100%;"><img src="https://raw.githubusercontent.com/babylon-runtime/_r.assets/master/_runtime-logo/exports/_runtime-logo_circleWhite_512.png" alt="babylon runtime logo" width="250" ></p>

**<span style="color:#eb1a1b">\_r</span>** is a lightweight, *write less, do more*, [BabylonJS](https://www.babylonjs.com/) library.

The purpose of **_r** is to make BabylonJS much easier to use and maintain in the 3D workflow, for both artists and developpers.

```javascript
_r.launch({
    assets : "https://models.babylonjs.com/CornellBox/",
    scene : "cornellBox.babylon",
    activeCamera : "Camera"
})
```
> example of a 3D scene loading

### For artists

<span style="color:#eb1a1b">\_r</span><span style="color:#2c789b">untime</span> will allow you to:
- export and reexport your scenes as many as you want without loosing your tweaks
- avoid as much as possible writing code

### For developpers

<span style="color:#eb1a1b">\_r</span><span style="color:#2c789b">untime</span> will allow you to:
- mass-select & filter elements in a easy way
