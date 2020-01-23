---
title : Introduction 
layout : documentation
---
_r is a lightweight «write less, do more» BabylonJS library. The purpose of _r is to make BabylonJS much easier to use and maintain in the 3D workflow.

## Install

TODO

## Quick examples

### Launch
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
### Animate 
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
### Events
```js
_r.select("mesh1").on("OnPickTrigger", function() {
    console.log("pick on mesh1")
})
```
[Events in details]()
### Patch
```js
_r.select("*:mesh").patch({
    material : {
        diffuseColor : "blue"
    }
})
```

[Patch in details]()

### Util
_r is global so you can debug scene in the console easily.

#### All meshes names
```js 
_r.select("*:mesh").log('name') 
```
#### Visible meshes
```js 
_r.select("*:mesh[isVisible=true]")
```
#### Camera position
```js 
_r.select("Camera1").log("position")
```
[Selector in details]()
#### Get / Set Babylon properties
Get all meshes materials :
```js 
_r.select("*:mesh").attr("material")
```
Set meshes alpha
```js 
_r.select("bloc.000").attr("visibility", 0.5)
```

[Scene manipulation in details]()