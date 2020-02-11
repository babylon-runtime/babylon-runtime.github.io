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

So let's create our first patch: we want `cornellBox.cornellBox.ground.000` material diffuseColor using `#3232C8` color value.

### Direct patching

In the launch function, just write:

```javascript
_r.launch({
    scene : "assets/cornellBox.babylon",
    activeCamera : "Camera",
    patch: [{
        "cornellBox.cornellBox.ground.000": {
            "diffuseColor": "#3232C8"
        }
    }]
});
```
That's it!

\_runtime will apply this patch just after loading the file and just before the first scene render.

<p class="codepen" data-height="265" data-theme-id="light" data-default-tab="js,result" data-user="BabylonRuntime" data-slug-hash="zbWpQZ" data-preview="true" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid black; margin: 1em 0; padding: 1em;" data-pen-title="_r.patch - 00">
  <span>See the Pen <a href="https://codepen.io/BabylonRuntime/pen/zbWpQZ/">
  _r.patch - 00</a> by Babylon Runtime (<a href="https://codepen.io/BabylonRuntime">@BabylonRuntime</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

*see [examples/first-steps/patching/00.html](https://github.com/babylon-runtime/_r.assets/blob/master/examples/first-steps/patching/00.html)*

But imaging dealing with dozens of materials: it will surely be more convenient if our patch can be saved in a separated file, if only for the readability.

It's quite possible of course.

### Patch in a file

- in your assets folder, create a new file named as you want, but using `.patch` extension. Here we've named it `visual-tweaks.patch`
- in your launch function, add the path to your patch using this way:

```javascript
_r.launch({
    scene : "assets/cornellBox.babylon",
    activeCamera : "Camera",
    patch: ["assets/visual-tweaks.patch"]
});
```

- in this patch file, write the same content we've used above:
 
```javascript
[
    {
        "cornellBox.cornellBox.ground.000": {
            "diffuseColor": "#3232C8"
        }
    }
]
```

The floor is now patched!

<p class="codepen" data-height="" data-theme-id="light" data-default-tab="js,result" data-user="BabylonRuntime" data-slug-hash="bZYGMJ" data-preview="true" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid black; margin: 1em 0; padding: 1em;" data-pen-title="_r.patch - 01">
  <span>See the Pen <a href="https://codepen.io/BabylonRuntime/pen/bZYGMJ/">
  _r.patch - 01</a> by Babylon Runtime (<a href="https://codepen.io/BabylonRuntime">@BabylonRuntime</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

*see [examples/first-steps/patching/01.html](https://github.com/babylon-runtime/_r.assets/blob/master/examples/first-steps/patching/01.html) using [visual-tweaks.patch](https://github.com/babylon-runtime/_r.assets/blob/master/examples/first-steps/patching/assets/visual-tweaks.patch)*

Do you also want to move the camera closer to objects?

As the camera name inside our .babylon file is `Camera`, just add these lines into patch:

```javascript
[
    {
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

*see [examples/first-steps/patching/02.html](https://github.com/babylon-runtime/_r.assets/blob/master/examples/first-steps/patching/02.html) using [visual-tweaks02.patch](https://github.com/babylon-runtime/_r.assets/blob/master/examples/first-steps/patching/assets/visual-tweaks02.patch)*

### Multiple patch files

You're obviously a very organized person, and you have in mind that it could be so great to write your patches in multiples files.

Taking our example, we could create `cameras.patch` and `materials.patch` files, and write in them the suitables patches we've made above.

Then just link these files in the `patch` property, as below:


```javascript
_r.launch({
    scene : "assets/cornellBox.babylon",
    activeCamera : "Camera",
    patch: [
        "assets/cameras.patch",
        "assets/materials.patch"
    ]
});
```

You have to know the `cameras.patch` will be applied first, then `materials.patch`, following the list order declaration.

That's mean if you have your `myMaterial` `alpha` value set to `0.5` in the first patch, but also set to `1` later in another patch, only the last value will be taken into account.

The same logic applies within a file itself by the way (from top of the file to the bottom).

<p class="codepen" data-height="265" data-theme-id="light" data-default-tab="js,result" data-user="BabylonRuntime" data-slug-hash="QomQzd" data-preview="true" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid black; margin: 1em 0; padding: 1em;" data-pen-title="_r.patch - 03">
  <span>See the Pen <a href="https://codepen.io/BabylonRuntime/pen/QomQzd/">
  _r.patch - 03</a> by Babylon Runtime (<a href="https://codepen.io/BabylonRuntime">@BabylonRuntime</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

*see [examples/first-steps/patching/03.html](https://github.com/babylon-runtime/_r.assets/blob/master/examples/first-steps/patching/02.html) using [cameras.patch](https://github.com/babylon-runtime/_r.assets/blob/master/examples/first-steps/patching/assets/cameras.patch) & [materials.patch](https://github.com/babylon-runtime/_r.assets/blob/master/examples/first-steps/patching/assets/materials.patch)*

<br>

Here comes the time to take a look about what is [this kind of data saving](../json).