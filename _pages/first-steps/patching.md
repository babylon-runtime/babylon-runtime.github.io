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
var cameraFPV = scene.getCameraByName("cameraFree.000");
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
    assets : "assets/",
    scene : "cornellBox.babylon",
    activeCamera : "Camera",
    patch: "assets/visual-tweaks.patch"
});
```

