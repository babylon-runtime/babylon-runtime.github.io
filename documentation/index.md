---
title : Getting Started 
layout : documentation
---
_r make writing applications and game made with BABYLON more easiest, it's basically a set of functions to wrap some BABYLON codes.

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
 
It's 100% BABYLON.js, _r.launch do what you would have to do to launch the babylon engine :
1. Create a canvas
2. Create an BABYLON.Engine
3. Use BABYLON.SceneLoader to load the scene
4. Call _r.ready

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

_r.animate (inspired by the jQuery animation API) will create all the BABYLON.Animation, BABYLON.AnimationTypes, Animation key, etc for you.

## A framework to make games and 3D RT application
_r provide utilities for a maintainable workflow between developers and 3D artists 
* 3D artists should not have to write code 
* developers should not have to tweak the materials (textures)

### Patch files (could be seen as CSS for the Scene)

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
Patch has a simple syntax to read and maintain (~JSON). You can organize your patch files to fit your needs (by materials, by features, by interactions, etc).
```js
_r.patch('materials.patch').then(function() {
    // patch applied
});
```

Patch can also be applied before rendering 
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
[Patch in details]()

### Scene manipulation

With _r.select you can select nodes in the scene then bulk operations on them :
```js
_r.select('material.0*').patch({
    alpha : 0.5,
    diffuseColor : red
})
```
Note the special character ```*``` that mean in this context all nodes objets in the scene with the attribute name starting by *material.0". 
It could be : ```material.01```,```material.0XY```

You can query the scene the same way you would query the DOM with Jquery :
```js
_r.select(":mesh[isVisible=true][opacity=1]").animate({
    'material' : {
        alpha : 0.5
    }
})
```

You can select everything with _r.select : scene, cameras, textures, materials, mesh and lights.

The same selector mechanisms is available in patch files :
```js
{
":mesh[isVisible=true][opacity=1]": {
    material : {
        alpha : 0.5
        }   
    }
}
```
[Selector in details]()

## Pick only the features you need

You can pick only what you need, for example : you don't have to use _r.launch to use _r.select; and you can use _r.animate everywhere in your existing code.

### Debug with _r

insert the runtime script in one of your existing app or look at this example :

There's no code wrote in _r, but in the devtools console you can select elements from the scene directly  :

_r is very usefull to debug application, for example if you would to inspect an object :


### Assets management

You can load any assets with _r.load
```js
  _r.load(["https://www.babylonjs-playground.com/textures/grass.jpg", "https://models.babylonjs.com/CornellBox/cornellBox.babylon"]).then(function(result) {
            var texture = result[0];
            var assets = result[1];
            console.log(texture, assets);
        })
```
It's still BABYLON behind (BABYLON.Scene.AssetManager && BABYLON.Scene.TaskManager)

You can remove / add assets from the current scene
```js
    _r.select('mesh1, texture1').removeFromScene();
    _r.load("./cornellbox.babylon").then(function(assets) {
        _r.select(assets).addAllToScene();
    })
```

[Assets management in details]()

### Mesh events

Availables events (string versions of BABYLON.MeshEvents): 
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


### Global Events
In a launch.js file :
```js
_r.launch({
    scene : ""
})

_r.ready(function() {
    _r.scene.createDefaultEnvironment
    _r.scene.trigger('3D-ready')
})
```

Then in module.js :
```js
_r.on("3D-ready", function() {
    // scene has been loaded and rendering just started
});
```
[Events in details]()







