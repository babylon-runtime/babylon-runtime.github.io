---
title : Overview
layout : documentation
---


`_r` is a set of methods to write web applications rendered with BabylonJS. It is originally a wrapper for redundant BabylonJS tasks. 
* ```_r``` never modifies the BabylonJS objects
* ```_r``` is compatible with any existing code
* You can pick only what fits to your needs

<div class="uk-alert">
_runtime insure a **maintainable workflow between developers and 3D artists**:
* 3D artists should not have to write code
* developers should not have to tweak the materials
</div>

<div class="uk-alert">
_runtime can be used:
* as a standalone library to write your web app in a more **scripting friendly** way, 
* as a module to **build your own framework**.
</div>

Summary:
* [A set of methods for usual BabylonJS needs]()
* [Debug your existing app with _r]()
* [A framework to make games and 3D web app]()
* [Utilities (loading screen, gizmo, colors, etc)]()

# A set of methods for usual BabylonJS needs

The API is inspired by JQuery so if you know jQuery you can see _r as the jQuery for BabylonJS.
 
## Basic Examples
### Launching a scene

[![Edit _r.launch](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/rlaunch-g4wy9?fontsize=14&hidenavigation=1&theme=dark){:target="_blank"}
```js
_r.launch({
    scene : "https://models.babylonjs.com/CornellBox/cornellBox.babylon"
})

_r.ready(function() {
    // this will be call when the scene is downloaded and ready
    console.log(_r.scene); // _r.scene is available as a global variable
})
```
[Launch in details](./launch)
 
**It's 100% BABYLON.js**, ```_r.launch``` do what you would have to do to launch the babylon engine:
1. Create a canvas
2. Create an BABYLON.Engine
3. Use BABYLON.SceneLoader to load the scene

### Animations 

[![Edit _r.animate.basic](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/ranimatebasic-pb9kf?fontsize=14&hidenavigation=1&theme=dark){:target="_blank"}
```js
_r.select("bloc.000").animate({
    position : {
        x : 10
    }
}, 5); // duration in seconds

_r.select("bloc.000").animate({
    material : {
        diffuseColor : "red"
    }
}, 5)
```
[Animations in details]()

```_r.animate``` (inspired by the jQuery animation API) will create all the BABYLON.Animation, BABYLON.AnimationTypes, Animation key, etc for you.

## Scene manipulation

With ```_r.select``` you can retrieve nodes in the scene then batch operations:
```js
_r.select('material.0*').patch({
    alpha : 0.5,
    diffuseColor : red
})
```
Note the special character ```*``` that means in this context: *all elements in the scene with name starting by `material.0`*. 

It could be: ```material.01```,```material.0-whateverIwant.28```.

You can query the scene the same way you would query the DOM with JQuery:
```js
_r.select(":mesh[isVisible=true][opacity=1]").animate({
    'material' : {
        alpha : 0.5
    }
})
```

You can ```_r.select```: 
- scene
- cameras
- textures
- materials
- mesh 
- lights

[Selector in details]()

# Debug with \_runtime

Insert the \_runtime script in one of your existing app or look at this example:

There's no code wrote in \_r, but in the devtools console you can select elements from the scene directly:

\_r is very useful to debug BJS applications, for example if you would to inspect an object:

# A framework to make games and 3D realtime applications

## Patch files (could be seen as css for the babylon nodes)

Patching is a mechanism for splitting app into separate modules
```json
/// materials.patch
[{
    "mesh1" : {
        "material" : {
            "diffuseColor" : "blue",
            "diffuseTexture" : _r.load("")
        }
    }
}]
```
Patch has a simple syntax to read and maintain (similar as JSON). You can organize your patch files to fit your needs (by materials, features, interactions, etc).
```js
_r.patch('materials.patch').then(function() {
    // patch applied
});
```

Patch can also be applied at launch time: 
```js
_r.launch({
    scene : "https://models.babylonjs.com/CornellBox/cornellBox.babylon",
    patch : [
        "materials.patch",
        "cameras.patch",
        "lights.patch",
        "meshPicking.patch",
        "specialMaterial1.patch"
    ]
})
```
The same selector mechanisms as ```_r.select``` are availabled in patch files:
```js
{
":mesh[isVisible=true][opacity=1]": {
    material : {
        alpha : 0.5
        }   
    }
}
```

[Patch in details]()

## Assets management

You can load any assets with \_r.load:
```js
  _r.load(["https://www.babylonjs-playground.com/textures/grass.jpg", "https://models.babylonjs.com/CornellBox/cornellBox.babylon"]).then(function(result) {
            var texture = result[0];
            var assets = result[1];
            console.log(texture, assets);
        })
```
It's still BabylonJS behind, \_r.load use seamlessly BJS [AssetsManager](https://doc.babylonjs.com/api/classes/babylon.assetsmanager).

You can remove / add assets from the current scene
```js
    _r.select('mesh1, texture1').removeFromScene();
    _r.load("./cornellbox.babylon").then(function(assets) {
        _r.select(assets).addAllToScene();
    })
```

[Assets management in details]()

## Mesh events

Availables events (string versions of [ActionManager](https://doc.babylonjs.com/api/classes/babylon.actionmanager)): 
* OnDoublePickTrigger
* OnPickTrigger
* OnLeftPickTrigger
* OnRightPickTrigger
* OnCenterPickTrigger
* OnPickDownTrigger
* OnPickUpTrigger
* OnPickOutTrigger
* OnLongPressTrigger
* OnPointerOverTrigger
* OnPointerOutTrigger

```js
_r.select("mesh1").on("OnPickTrigger", function() {
    console.log("pick on mesh1")
})

_r.select("*mesh*").on("OnPickTrigger", function() {
    console.log("pick on " + this.name)
})
```


## Global Events
In a launch.js file:
```js
_r.launch({
    scene : "myScene.glb"
})

_r.ready(function() {
    _r.scene.createDefaultEnvironment();
    _r.scene.trigger('3D-ready');
})
```

Then in module.js:
```js
_r.on("3D-ready", function() {
    // scene has been loaded and rendering just started
});
```
[Events in details]()

# Utilities (loading screen, gizmo, colors, etc)

