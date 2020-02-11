---
title: "Loading a file"
layout: single
toc : true
permalink: /first-steps/launch/
sidebar:
  nav: "docs"  
---

You've probably just seen [how to setup](../../#launch) your project. But what is this `launch` function and how to use it?

We're going to use this [cornell box example](https://github.com/babylon-runtime/_r.assets/tree/master/cornellBox) scene. Feel free to download [files](https://github.com/babylon-runtime/_r.assets/releases/download/v1.0/cornellBox.zip).

## \_r.launch()

Let's start from the beginning:
- Create a dedicated folder for your project. A good thing should to be able to run your project inside a local webserver (on Windows, [EasyPhp](https://www.easyphp.org/) is easy to use). Note that Firefox allow local javascript execution even without webserver.
- Create a new file called `index.html`
- Create a folder named, for example, `assets` and put files from the `cornellBox\exports\babylon-standard\` folder in the .zip linked above
- Copy-paste the code above in your `index.html`:

```html
<!doctype html>
<html>
<head>
    <meta charset="utf-8">
    <style>
        html, body {
            overflow: hidden;
            width   : 100%;
            height  : 100%;
            margin  : 0;
            padding : 0;
        }
    </style>
    <script src="https://cdn.babylonjs.com/babylon.js"></script>
    <script src="https://unpkg.com/babylon-runtime@latest/dist/_r.min.js"></script>
</head>
<body>
    <script type="text/javascript">
        _r.launch({
            scene : "assets/cornellBox.babylon",
            activeCamera : "Camera"
        });
    </script>
</body>
</html>
```

<p class="codepen" data-height="" data-theme-id="light" data-default-tab="js,result" data-user="BabylonRuntime" data-slug-hash="VRrwxQ" data-preview="true" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid black; margin: 1em 0; padding: 1em;" data-pen-title="_r.launch - 01">
  <span>See the Pen <a href="https://codepen.io/BabylonRuntime/pen/VRrwxQ/">
  _r.launch - 01</a> by Babylon Runtime (<a href="https://codepen.io/BabylonRuntime">@BabylonRuntime</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

*see [examples/first-steps/launch/01.html](https://github.com/babylon-runtime/_r.assets/blob/master/examples/first-steps/launch/01.html)*

You should now already have your first 3D scene loaded using \_runtime!

So what's just append?

By calling the `_r.launch()` function, \_runtime creates in background for us:

- the html5 canvas (using some default parameters)
- an instance of BabylonJS engine
- a new scene

Then, we have few parameters in this `launch` function to set:

### scene

Scene filename with its path.

If your BJS version include [loaders](https://doc.babylonjs.com/how_to/load_from_any_file_type), you can load .gltf, .stl & .obj in addition to the default .babylon format.

Path is relative to from where the `launch` is executed. An url can be used too, as you may seen on our codepen examples.

```javascript
_r.launch({
    scene : "assets/cornellBox.babylon",
    activeCamera : "Camera"
});
```

### activeCamera

As a camera is needed to render the scene, you have to write here the name of your camera included in your scene file.

If your scene file doesn't have a camera, don't panic! You can send a new BJS camera using javascript, like this:

```javascript
_r.launch({
    scene : "assets/cornellBox.babylon",
    activeCamera : function(){
        var camera = new BABYLON.ArcRotateCamera("runtimeCamera", -1, 1, 8, new BABYLON.Vector3(0, 1.5, 0), _r.scene);
        return camera;
    }
});
```

But two important points to note:

- by sending a function into `activeCamera`, you must use a `return` to send the result (here, the new camera)
- have you notice that we've used `_r.scene` instead of `scene`? That's need a quick explanation you can read below.

## \_r.scene

From the moment \_runtime take the hand on your 3d scene - just after the `scene` property in the `_r.launch()` - it starts working into this newly created scene: `_r.scene`.

This `_r.scene` will be reachable globally, which will be very useful for all your future scripts.

But how to be sure this `_r.scene` exists and is loaded? That where `_r.ready()` comes in.

## \_r.ready()

This `ready` function will help us to know that our \_runtime scene is loaded.

Usually, this is where your scripts will be called.

```html

<body>
    <script type="text/javascript">
        _r.launch({
            scene : "assets/cornellBox.babylon",
            activeCamera : "Camera"
        });

        _r.ready(function(){
            console.log("scene is loaded!");
            _r.scene.activeCamera.position.z = -2;
        });

    </script>
</body>

```

<br>

But before going deep into these `_r.scene` & `_r.ready()`, let's start first by [customizing our scene](../patching)!