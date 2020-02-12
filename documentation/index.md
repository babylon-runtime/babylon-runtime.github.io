---
title : Overview
layout : documentation
---

*\_r*{:._r}untime is a set of methods to write web applications rendered with BabylonJS. It is originally a wrapper for redundant BabylonJS tasks. 
The API design is inspired by JQuery so if you know jQuery you can see *\_r*{:._r} as the jQuery for BabylonJS.

It can be used:
- as a standalone library to write your web app in a more **scripting friendly** way, 
- as a module to **build your own framework**.


*\_r*{:._r}untime insure a **maintainable workflow between developers and 3D artists**:
- 3D artists should not have to write code
- developers should not have to tweak the materials

## Getting started

Have a look at this example 

<iframe
     src="https://codesandbox.io/embed/github/babylon-runtime/babylon-runtime.github.io/tree/master/examples/getting-started?autoresize=1&fontsize=14&hidenavigation=1&theme=dark&view=editor"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="getting-started"
     allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb"
     sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>
     
 - **line 8 & 9** : insert babylon and _r
 - **line 11** : launch the cornellbox scene with_r.launch. By default it will create everything for you (engine, canvas, renderloop) but you could have defined them before calling _r.launch.
 - **line 15** : _r.ready is used to know when everything is ready after a _r.launch (scene is downloaded, rendering started)
 - **line 17-18-19** : You can access _r.scene, _r.engine, _r.canvas everywhere
 
Open the Sandbox then open the console (or your browser's console)  and copy/paste this :
```js
_r.select("*").log('name')
```
This will output all the object's name from the scene (meshes, materials, lights, cameras, textures). 
With _r.select you can query the scene graph, for example you could query only the meshes :
```js
// this will output only the meshes names
_r.select("*:mesh").log('name')
```
Or filter only the objects starting with **cornellBox** (note the \* character)
```js
// this will output only the object name starting with 'cornellbox' :
_r.select("cornellBox*").log('name')
```

Now you understood the basic principles of _r.select you can make animations 
<iframe
     src="https://codesandbox.io/embed/github/babylon-runtime/babylon-runtime.github.io/tree/master/examples/basic-animation?fontsize=14&hidenavigation=1&theme=dark&view=editor"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="getting-started"
     allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb"
     sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>

You will have to write a lot of code if you want the same result in pure BABYLON...**but it's still BABYLON under the hood**.

{:.uk-alert}
<div>
*\_r*{:._r} automates things by generating BABYLON code.
</div>
 
_r.animate analyzes parameters to :
- create a BABYLON.AnimationGroup with one or more BABYLON.Animation set with the correct keys, types, etc. 
- play the BABYLON.AnimationGroup 
- return the BABYLON.AnimationGroup

So it's compatible with your existing code.

{:.uk-alert}
<div>
You can use *\_r*{:._r} everywhere in existing code.
</div>

Each _r feature can be use standalone. For example you can use _r.animate without _r.launch and _r.ready. 

{:.uk-alert}
<div>
You can pick only the features you want and paste it in your existing code.
</div>

## Patch files 

**Patching is a mechanism for splitting app into separate modules**.Patch could be seen as css for the scene...with much powerfull capabilities.

```json
/// materials.patch
[{
    "mesh1" : {
        "material" : {
            "diffuseColor" : "blue",
        }
    }
}]
```
Patch has a simple syntax to read and maintain (similar as JSON). You can organize your patch files to fit your needs (by materials, features, interactions, etc).

**3D artists write patch files** (it's still code, but with a very simple syntax), developers applied them when needed :
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

Patch are easy to read, and easy to maintain, you just have to refer to the BABYLON documentation to find the property you want to set.

You can make a lot of things with patch :
- Execute functions
- Handling app events
- Make dynamic lightmaps assignemnts
- Interact with the loading screen
- Use Promise

You can even make your own patch plugin, to create a new patch property for example...But it's out of this gettings start. To know more about patches :
- [??]()

## Assets management

You don't want to preload all the assets before start the rendering because it will take to much time (10 seconds is about the limit to keep the user). 

{:.uk-alert}
<div>
_r.load import your assets dynamically in a very simple way. 
</div>

**_r.load does not add the imported nodes to the current scene** (so you can launch background loading). Nodes should be added with ```_r.select(asset).addAllToScene()```;

```js
// Scene
_r.load("https://models.babylonjs.com/CornellBox/cornellBox.babylon")
    .then(function(assets) {
    
    })
// Images

// Texture

// CubeTexture

// Material

// PBR

// scripts

// css
```


Again it's BABYLON behind, _r.load is just a wrapper around [AssetsManager](https://doc.babylonjs.com/api/classes/babylon.assetsmanager) and BABYLON.SceneLoader.


## Mesh events

{:.uk-alert}
<div>
_r let you use the BABYLON.ActionManager with a simple and flexible events pattern.
</div>

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

{:.uk-alert}
<div>
Global events let you establish a communication protocol between the different part of your source code (modules).
</div>

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

## Loading screen
There's a lot of question about custom loading screen in the babylon forum so we made a very simple API to wrap the Custom loading screen.
 
Create your loading screen in a separate html page then :
* use ```_r.loadingScreen.iframe("loading-screen.html")``` to initialize the loading screen
* ```_r.loadingScreen.isVisible = true``` / ```_r.loadingScreen.isVisible = false``` to show / hide the loading screen.

{:.uk-alert}
<div> 
Use _r.loadingScreen.iframe to declare your loading Screen and it will be used by BABYLON instead of the default one.
</div>

To show/hide the loading screen you can use the BABYLON way of doing it, however we recommend the use of the isVisible parameter witch resolve some problems with the native BABYLON loader (like displaying/hiding while animation is still in progress) 

## Routes

A Javascript router is a key component in most frontend frameworks. It is the piece of software in charge to organize the states of the application, switching between different views. 

{:.uk-alert}
<div> 
The router will be in charge of simulating transitions between views by watching changes on the URL.
</div>
When the document is reloaded or the URL is modified somehow, it will detect that change and render the view that is associated with the new URL.


## App skeleton with Patch / assets / events 

With patch, assets, events and routes you have a solid skeleton to make your 3D app development much easier. 

Here is a complete demo of how you could organize your code :

## Some utilities you may also need

### _r.color

### _r.data

### _r.is



