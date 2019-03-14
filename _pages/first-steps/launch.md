---
title: "Loading a file"
layout: single
toc : true
permalink: /first-steps/launch/
sidebar:
  nav: "docs"  
---

You've probably just seen [how to setup](../../#launch) your project. But what is this `launch` function and how to use it?

We're going to use this [cornell box example](https://github.com/babylon-runtime/_r.assets/tree/master/cornellBox) scene, where you can already find BabylonJS compatible exported files, especially the .babylon using standard materials. Download [this example using this link](https://github.com/babylon-runtime/_r.assets/releases/download/v1.0/cornellBox.zip).

Let's start from the beginning:
- Create a dedicated folder for your project. A good thing should to be able to run your project inside a local webserver (on Windows, [EasyPhp](https://www.easyphp.org/) is easy to use). Note that Firefox allow local javascript execution even without webserver.
- Create a new file called `index.html`
- Create a folder named, for example, `assets` and copy inside the files from the `cornellBox\exports\babylon-standard\` folder in the .zip
- In our examples we will link online version of babylon.js & \_r.js instead of download them locally
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
    <script src="https://unpkg.com/babylon-runtime/dist/_r.js"></script>
</head>
<body>
    <script type="text/javascript">
        _r.launch({
            assets : "assets/",
            scene : "cornellBox.babylon",
            activeCamera : "Camera"
        });
    </script>
</body>
</html>
```

You should now already have your first 3D scene loaded using \_runtime!

So what's just append?

By calling the `_r.launch()` function, \_runtime creates in background for us:

- the html5 canvas (using some default parameters)
- an instance of BabylonJS engine
- a new scene

Then, we have few parameters in this `launch` function to set:

| property | value |
| --- | --- |
| assets | The path where you've exported your scene. |
| scene | Scene filename. |
| activeCamera | The name of your camera included in your scene file. We will see later how to load a scene that does not contain a camera. |

<p class="codepen" data-height="" data-theme-id="light" data-default-tab="js,result" data-user="BabylonRuntime" data-slug-hash="VRrwxQ" data-preview="true" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid black; margin: 1em 0; padding: 1em;" data-pen-title="_r.launch - 01">
  <span>See the Pen <a href="https://codepen.io/BabylonRuntime/pen/VRrwxQ/">
  _r.launch - 01</a> by Babylon Runtime (<a href="https://codepen.io/BabylonRuntime">@BabylonRuntime</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

> see [examples/first-steps/launch/01.html](https://github.com/babylon-runtime/_r.assets/blob/master/babylon-runtime.github.io/examples/first-steps/launch/01.html)

We're now able to start [customizing our scene](../patching).