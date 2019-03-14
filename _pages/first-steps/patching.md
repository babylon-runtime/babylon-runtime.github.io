---
title: "Patching"
layout: single
toc : true
permalink: /first-steps/patching/
sidebar:
  nav: "docs"  
---

Now that you've seen [how to load your 3D file](../launch), it's time to unleash the power of \_runtime!

## What this is about?

From a 3D designer point of view there are always a lot of parameters - colors, channels intensities, reflection, refraction, etc - which needs to be customised by code. 
Code is great but it’s hard to understand and maintain for a 3D designers team.

With \_r you can use patch files to customise the scene. Patch are very easy to read/write text files that don't required any programming skills.

Here a quick example of a patch file content:

```javascript
[{
    "scene": {
        "ambientColor": "white",
        "clearColor": "#9CC1CE"
    }
}, {
    "cameraFPV.000": {
        "speed": 0.05,
        "fov": 1.1
    }
}]
```

By sending this patch to \_runtime, you avoid writting these javascript lines:

```javascript
scene.ambientColor = BABYLON.Color3.White();
scene.clearColor = BABYLON.Color3.FromHexString("#9CC1CE");
var cameraFPV = scene.getCameraByName("cameraFPV.000");
cameraFPV.speed = 0.05;
cameraFPV.fov = 1.1;
```

Patch looks like more readable than raw javascript isn't it?

## Blue is missing

Now our scene is exported and loaded, we just remember we should have set the floor to blue!

So let's create our first patch file:

- in your assets folder, create a new file named as you want, but using `.patch` extension. Here we've named it `visual-tweaks.patch`
- in your launch function, add the path to your patch using this way:

```javascript
_r.launch({
    scene : "assets/cornellBox.babylon",
    activeCamera : "Camera",
    patch: ["assets/visual-tweaks.patch"]
});
```

- take note of the floor material name (*cornellBox.cornellBox.ground.000*) and write in your patch file:
 
```javascript
[{
    "cornellBox.cornellBox.ground.000": {
        "diffuseColor": "#3232C8"
    }
}]
```

The floor is now patched!

<p class="codepen" data-height="" data-theme-id="light" data-default-tab="js,result" data-user="BabylonRuntime" data-slug-hash="bZYGMJ" data-preview="true" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid black; margin: 1em 0; padding: 1em;" data-pen-title="_r.patch - 01">
  <span>See the Pen <a href="https://codepen.io/BabylonRuntime/pen/bZYGMJ/">
  _r.patch - 01</a> by Babylon Runtime (<a href="https://codepen.io/BabylonRuntime">@BabylonRuntime</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

> see [examples/first-steps/patching/01.html](https://github.com/babylon-runtime/_r.assets/blob/master/examples/first-steps/patching/01.html) using [visual-tweaks.patch](https://github.com/babylon-runtime/_r.assets/blob/master/examples/first-steps/patching/assets/visual-tweaks.patch)

Want to move the camera closer to objects?

As the camera name inside our .babylon file is `Camera`, just add these lines into patch:

```javascript
[{
        "cornellBox.cornellBox.ground.000": {
            "diffuseColor": "#3232C8"
        }
    },
    {
        "Camera": {
            "position": {
                "z": -1
            }
        }
    }
]
```

<p class="codepen" data-height="" data-theme-id="light" data-default-tab="js,result" data-user="BabylonRuntime" data-slug-hash="ywPLEN" data-preview="true" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid black; margin: 1em 0; padding: 1em;" data-pen-title="_r.patch - 02">
  <span>See the Pen <a href="https://codepen.io/BabylonRuntime/pen/ywPLEN/">
  _r.patch - 02</a> by Babylon Runtime (<a href="https://codepen.io/BabylonRuntime">@BabylonRuntime</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

> see [examples/first-steps/patching/02.html](https://github.com/babylon-runtime/_r.assets/blob/master/examples/first-steps/patching/02.html) using [visual-tweaks02.patch](https://github.com/babylon-runtime/_r.assets/blob/master/examples/first-steps/patching/assets/visual-tweaks02.patch)

<br>

Here comes the time to take a look about what is [this kind of data saving](../json).