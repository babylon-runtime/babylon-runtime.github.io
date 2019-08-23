---
title: "Babylon Runtime Documentation"
layout: single
toc : true
sidebar:
   nav: "docs"  
---

## Code less, Babylon more

<p style="text-align:center; width:100%;"><img src="https://raw.githubusercontent.com/babylon-runtime/_r.assets/master/_runtime-logo/exports/_runtime-logo_circleWhite_512.png" alt="babylon runtime logo" width="250" ></p>

<span style="color:#e0684b">\_r</span><span style="color:#201936">untime</span>, aka **<span style="color:#e0684b">\_r</span>**, is a lightweight *&laquo;write less, do more&raquo;* [BabylonJS](https://www.babylonjs.com/) library.

The purpose of **<span style="color:#e0684b">\_r</span>** is to make BabylonJS much easier to use and maintain in the 3D workflow, for both artists and developpers.

```javascript
_r.patch([{
    "*wood*": {
        "albedoColor": "red"
    }
}]);
```
> applying red albedoColor for all wood materials with _runtime

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

## Use

As soon as _r is loaded, you can start using it in your BabylonJS app:

```javascript
var delayCreateScene = function () {

    var scene = new BABYLON.Scene(engine);
    scene.createDefaultCamera(true, true, true);
    scene.createDefaultEnvironment({createGround: false,createSkybox: false});

    BABYLON.SceneLoader.ImportMesh(
        "",
        "assets/",
        "cornellBox.babylon",
        scene,
        function () {
            scene.activeCamera.target = new BABYLON.Vector3(0, 1.5, 0);
            scene.activeCamera.beta = Math.PI / 2;
            scene.activeCamera.radius = 10;

            /* babylon runtime */
            
            _r.patch([
                {
                    "scene": {
                        "ambientColor": "white"
                    }
                },
                {
                    "*:material": {
                        "ambientColor": "#e0684b"
                    }
                }
            ]);

            /***/
        });

    return scene;
};
```

> This set scene ambientColor to white, and all materials ambientColor to orange.

<br>

It's now time to do your [firsts steps using \_runtime](/first-steps/launch/).