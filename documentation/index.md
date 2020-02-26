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

# Getting started

Have a look at this example 

 <iframe
        src="https://codesandbox.io/embed/github/babylon-runtime/babylon-runtime.github.io/tree/master/examples/getting-started?autoresize=1&fontsize=14&hidenavigation=1&theme=dark"
        style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
        title="getting-started"
        allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb"
        sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin" ></iframe>
     
 - **line 8 & 9**: insert babylon and _r
 - **line 11**: launch the cornellbox scene with_r.launch. By default it will create everything for you (engine, canvas, etc) but you could have defined them before calling [_r.launch](/api/launch).
 - **line 15**: _r.ready is used to know when everything is ready after a [_r.launch](/api/launch) (scene is downloaded, rendering started)
 - **line 17-18-19**: You can access [_r.scene](/api/scene), [_r.engine](/api/engine), [_r.canvas](/api/canvas) everywhere
 
Open the Sandbox then open the console (or your browser's console)  and copy/paste this:
```javascript
_r.select("*").log('name')
```
This will output all the object's name from the scene (meshes, materials, lights, cameras, textures). 
With [_r.select](/api/select) you can query the scene graph, for example you could query only the meshes:
```js
// this will output only the meshes names
_r.select("*:mesh").log('name')
```
Or filter only the objects starting with **cornellBox** (note the \* character)
```js
// this will output only the object name starting with 'cornellbox':
_r.select("cornellBox*").log('name')
```

[_r.select](/api/select) has a lot of features, for example you can make [animations](/api/animate). 
<iframe
     src="https://codesandbox.io/embed/github/babylon-runtime/babylon-runtime.github.io/tree/master/examples/basic-animation?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="getting-started"
     allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb"
     sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>

You will have to write a lot of code if you want the same result in pure BABYLON...**but it's still BABYLON under the hood**.

{:.uk-alert}
<div>
*\_r*{:._r} automates tasks by generating BABYLON code.
</div>
 
_r.animate analyzes parameters to:
- create a [AnimationGroup](https://doc.babylonjs.com/api/classes/babylon.animationgroup) with one or more [Animation](https://doc.babylonjs.com/api/classes/babylon.animation) set with the correct keys, types, etc. 
- play the [AnimationGroup](https://doc.babylonjs.com/api/classes/babylon.animationgroup)
- return the [AnimationGroup](https://doc.babylonjs.com/api/classes/babylon.animationgroup)

So it's compatible with your existing code.

{:.uk-alert}
<div>
You can use *\_r*{:._r} everywhere in existing code.
</div>

Each *\_r*{:._r} feature can be use standalone. For example you can use [_r.animate](/api/animate) without [_r.launch](/api/launch) and [_r.ready](/api/ready). 

{:.uk-alert}
<div>
You can pick only the features you want and paste it in your existing code.
</div>

# Patch files 

**Patching is a mechanism for splitting app into separate modules**. Patch could be seen as stylesheet (CSS) for the scene... with much powerful capabilities.

```json 
// materials.patch
[{
    "mesh1, mesh2, mesh3" : {
        "material" : {
            "diffuseColor" : "blue",
        }
    }
}]
```
Patch has a simple syntax to read and maintain (similar as JSON). You can organize your patch files to fit your needs (by materials, features, interactions, etc).

**3D artists write patch files** (it's still code, but with a very simple syntax), developers applied them when needed:
```js
_r.patch('materials.patch').then(function() {
    // patch applied
});
```

Patch can also be applied at launch time: 
```javascript
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

Patch are easy to read and maintain, you just have to refer to the BABYLON documentation to find the property you want to set.

You can make a lot of things with patch:
- Execute functions
- Handling app events & user interactions
- Make dynamic lightmaps assignments
- Show / Hide the loading screen
- Use Promise to make sequentiel patch

See [_r.patch](/api/patch) for more informations

You can even [make your own patch plugin](/api/patch/#write-your-own-patch-plugins), to create a new patch property. This allow developers to encapsulate features and let the 3D artists use them in a simple way.

# Assets management

You don't want to preload all the assets before start the rendering because it will take to much time (10 seconds is about the limit to keep the user). 

{:.uk-alert}
<div>
[_r.load](/api/load) import your assets dynamically in a very simple way. 
</div>

**[_r.load](/api/load) does not add the imported nodes to the current scene** (so you can launch background loading). Nodes should be added with ```_r.select(asset).addAllToScene()```;

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

Again it's BABYLON behind, _r.load is just a wrapper around [AssetsManager](https://doc.babylonjs.com/api/classes/babylon.assetsmanager) and [SceneLoader](https://doc.babylonjs.com/api/classes/babylon.sceneloader).

# Mesh events

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
# Global Events

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

Events API :
- [_r.on](/api/on)
- [_r.one](/api/one)
- [_r.off](/api/off)
- [_r.trigger](/api/trigger)

# Loading screen
There's a lot of question about custom loading screen in the babylon forum so we made a very simple API to wrap the Custom loading screen.
 
Create your loading screen in a separate html page then:
* use ```_r.loadingScreen.iframe("loading-screen.html")``` to initialize the loading screen
* ```_r.loadingScreen.isVisible = true``` / ```_r.loadingScreen.isVisible = false``` to show / hide the loading screen.

{:.uk-alert}
<div> 
Use _r.loadingScreen.iframe to declare your loading Screen and it will be used by BABYLON instead of the default one.
</div>

To show/hide the loading screen you can use the BABYLON way of doing it, however we recommend the use of the ```isVisible``` parameter witch resolve some problems with the native BABYLON loader (like displaying/hiding while animation is still in progress) 

See [_r.loadingScreen]() for more details.

# Routes

A Javascript router is a key component in most frontend frameworks. It is the piece of software in charge to organize the states of the application, switching between different views. 

{:.uk-alert}
<div> 
The router will be in charge of simulating transitions between views by watching changes on the URL.
</div>
When the document is reloaded or the URL is modified somehow, it will detect that change and render the view that is associated with the new URL.

```js
// change the current route when user click on hotspot-1
_r.select("hotspot-1").on("OnPickTrigger", function() {
    _r.router.set('/hotspot/hotspot-1');
});

// handling the route (could be in another file / module)
_r.router.on('/hotspot/hotspot-1', function() {
    console.log("http://localhost/index.html/#/hotspot/hotspot-1")
});

_r.router.on(function() {
   console.log("called each time a route is set")
});
```

See [_r.route](/api/route) for more informations.


# App skeleton with Patch / assets / events 

With patch, assets, events and routes you have a solid skeleton to make your 3D app development much easier. 

[Here is a complete demo of how you could organize your code]()

# Some utilities you may also need

## Activate camera

```js
_r.activateCamera('CameraName')
```
[_r.activateCamera](/api/activateCamera) will [detachControl](https://doc.babylonjs.com/api/classes/babylon.camera#detachcontrol), set the active camera by name, then [attachControl](https://doc.babylonjs.com/api/classes/babylon.camera#attachcontrol) to the canvas.


## Wireframe, Gizmo, Normals

```js
_r.select('mesh1').show.wireframe();
_r.select('mesh1').show.normals();
_r.select('mesh1').show.gizmo();
```

```js
_r.select('mesh1').hide.wireframe();
_r.select('mesh1').hide.normals();
_r.select('mesh1').hide.gizmo();
```

## Colors

[_r.color](/api/color) convert something to [Color3](https://doc.babylonjs.com/api/classes/babylon.color3)
```js
_r.color("#ff0000");
_r.color({ r : 1, g : 0, b : 0 });
_r.color("red");
_r.color("rgb(255, 0, 0)");
_r.color([1, 0, 0]);
```

## Data

You can associate data with elements in a way that is safe from circular references.

For example you can manage a custom state for objects.
 
```js
_r.select('mesh1').data('initial-position', { x : 10, y : 10, z : 10});

// then restore the state when picking the mesh for example
_r.select('mesh1').on("OnPickTrigger", function() {
    var initialPosition = _r.select('mesh1').data('initial-position');
    _r.select('mesh1').attr('position', initialPosition);
})
```

See [_r.data](/api/data)

## is 

[_r.is](/api/is) is a namespace to test object type.

```js
if(_r.is.Mesh(obj1)) {
    console.log("obj1 is a mesh")
}

if(_r.is.Number(obj1)) {
    console.log("obj1 is a number")
}
```


