# Using \_runtime in an existing scene

We will take as an example a scene you may have seen before, the one I've made for a tutorial about Blender to BabylonJS, including lightmaps management: [From Blender to BabylonJS workflow](https://nothing-is-3d.com/article27/from-blender-to-babylonjs).

![thumbnail](converting-existing-scene-to-runtime/thumbnail.jpg)

*Note that this scene is in standard workflow, not PBR.*

[Here a download link](https://github.com/babylon-runtime/_r.assets/raw/master/converting-existing-scene-to-runtime/converting-existing-scene-to-runtime.zip) for this tutorial, containing:

- **original** folder: the raw BabylonJS scene, ready to be edited by you
- **converted** folder: full converted scene to \_runtime, allowing cheating if you're feeling lost

You can also simply play with codesandboxes you'll find among this tutorial.

Also, don't forget to point a [local webserver](https://www.nothing-is-3d.com/article28/use-a-local-webserver) into your unzipped folder. Notice that this scene was made on BJS [v3.3.0](https://github.com/BabylonJS/Babylon.js/tree/master/dist/previous%20releases/3.3) and Blender [2.79](https://download.blender.org/release/Blender2.79/) (with the now [deprecated](https://github.com/BabylonJS/BlenderExporter/tree/master/deprecated) .babylon exporter v5.6).

Of course, we'll also need to get the [last version of \_runtime](https://github.com/babylon-runtime/_r/releases/latest). You can notice I've already linked it line 9 of `index.html`:

```javascript
<script src="js/babylon.js"></script>
<script src="js/pep.min.js"></script>
<script src="js/_r.min.js"></script>
```
*Ready to go!*

In case you want to show the (old v3) Inspector, uncomment the `scene.debugLayer.show();` part (lines 117 & 118).

<iframe
     src="https://codesandbox.io/embed/github/babylon-runtime/_r.assets/tree/master/converting-existing-scene-to-runtime/original?codemirror=1&highlights=117,118&fontsize=12&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="babylonjs-with-runtime"
     allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb"
     sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
   ></iframe>

## Patch... works!

At this time, which is not even yet the beginning, you already are able to use \_runtime! In your browser or in codesanbox console, try to copy-paste this command line:

```javascript
_r.patch([
    {
        "*lamp*:material":{
            "emissiveTexture": null,
            "ambientColor": "red"
        }
    }
]);
```

If you've already took a look on [the documentation](https://babylon-runtime.github.io/), you probably guessed the result this patch is giving us:

![testing-patch](converting-existing-scene-to-runtime/testing-patch.gif)
*Patch patching. (just reload the page to cancel)*

Notice that in this exercice we will do a full conversion of our scene, which is already tweaked and finalized, but in other existing projects you can just keep them as they are and just call \_runtime when needed.

Example, if we insert this patch inside our `SceneLoader.Append` line 130:

```javascript
var books01 = scene.getMaterialByName("scene_BJS.books01.000");
books01.invertNormalMapX = true;

_r.patch([{
    "*lamp*:material": {
        "emissiveTexture": null,
        "ambientColor": "red"
    }
}]);
```
*This will give the exact same result as we got when using the command line into the browser console. (don't forget to remove this \_r.patch before continuing this tutorial). Check line 130 on the CodeSandbox below.*

[![Edit convert-scene-first-try-with-patch-ef2p5](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/embed/convert-scene-first-try-with-patch-ef2p5?codemirror=1&highlights=130,131,132,133,134,135,136,137&fontsize=12&hidenavigation=1&theme=dark)

So, let's start to convert the easiest part: mesh & material tweaking (line 95 to 128). We just have to convert  `scene.getMaterialByName("scene_BJS.lampFabric01.000")` as a \_runtime selector `{"scene_BJS.lampFabric01.000":{ [...] }}`.

Here I like to use the `*` char, to ease the patch reading: `{"*lampFabric01.*":{ [...] }}`. This `*` will already allow some versatility in our workflow:

- the old .babylon exporter was adding a prefix (using .babylon file name) to the materials, using the `*` as suffix on the \_r selector, we don't care any more what exporter you're using (names can be `scene_BJS.lampFabric` or `lampFabric`, they both will be taken into account).
- the `.000` suffix can be instantly broke on Blender if the cgartist make a material duplication (turning into `.001`). Again, the `*` as suffix don't pay attention any longer to this part

Now the properties: `.diffuseColor = BABYLON.Color3.Black();` will become `diffuseColor : "black",`.

Try to convert all the tweaks inside a `_r.patch`, pay attention to `,`! Once materials are done, why not also include collisions meshes?

Below the result, check line 95 on the CodeSandbox:

```javascript
/** END OF LIGHTMAP ASSIGNATION PROCESS **/

_r.patch([

    /* mesh tweaking */

    {
        "_collisions": {
            "isVisible": false
        }
    },

    /* material tweaking */

    {
        "*lampFabric01.*": {
            "diffuseColor": "black",
            "ambientColor": "black",
            "emissiveColor": [0.47, 0.28,
                0.07
            ], // in combination with emissiveTexture
            "useEmissiveAsIllumination": true // we want light to burn
        }
    },
    {
        "*lampBulb01.*": {
            "emissiveColor": "#ffffff"
        }
    },
    {
        "*lampMetal01.*": {
            "diffuseColor": "black",
            "ambientColor": "#222222",
            "specularColor": [0.88, 0.59, 0.41],
            "specularPower": 80
        }
    },
    {
        "*holdout.*": {
            "disableLighting": true
        }
    }, {
        "*floor01.*, *books01.*": {
            "invertNormalMapX": true
        }
    }
]);

/* tools */
```

[![Edit convert-scene-tweaks-as-patch-zew4r](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/embed/convert-scene-tweaks-as-patch-zew4r?codemirror=1&highlights=95&fontsize=12&hidenavigation=1&theme=dark)

Notice that \_r allows you to place comments inside the patches.

And why not putting this inside a dedicated file, for more clarity? We can create a `/patches/` folder inside `/assets/` and name our patch file the way we want (except the extension), here `tweaks.patch`:

```javascript
/** END OF LIGHTMAP ASSIGNATION PROCESS **/

_r.patch(["assets/patches/tweaks.patch"]);

/* tools */
```
*Better.*

Actually, we can also patch our camera using a camera.patch for example, and, let's be crazy, also our scene. Keep for now the camera raw BJS creation:

```javascript
var arcRotCam = new BABYLON.ArcRotateCamera(
    "arcRotateCamera",
    5.5,
    1.2,
    3.75,
    new BABYLON.Vector3(-0.8, 0.75, 0.8),
    scene
);
arcRotCam.attachControl(canvas, true);
```

[![Edit convert-scene-multiple-patch-files](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/embed/convert-scene-multiple-patch-files-20pz3?codemirror=1&highlights=19,81,82,83,84,85&fontsize=12&hidenavigation=1&theme=dark)

*Raw camera creation on line 19, _r.patch line 80.*

## Simplify the loading

We're just going to get rid of most of the code, using `_r.launch()`. The only code inside `<script>` tag that we'll keep untouched - for now - will be the lightmap assignation processing.

As even the canvas and engine renderloop can be handled by \_runtime, steps will be:

- delete `<canvas>` tags
- delete all engine and scene creation
- replace `SceneLoader.Append()` with `_r.launch()`
- use `_r.ready()` to be able to use our lightmap javascript
- as we'll loose our js scene variable: replace `scene` by `_r.scene` 

Note that it's also possible to keep using your canvas or engine, in case you want custom [EngineOptions](https://doc.babylonjs.com/api/classes/babylon.engine#constructor) for example.

As we're not using a camera stored into the .babylon, but a created one from scratch, we need to include its creation inside our cameras.patch, then make it current activeCamera.

To do that, we'll use the "execute" patch functionnality before the camera patch properties we've already made:

```javascript
[{
        "exec": function () {
            // we can do the code we want here
            new BABYLON.ArcRotateCamera(
                "arcRotateCamera",
                1, 1, 1, BABYLON.Vector3.Zero(),
                _r.scene); // don't forget the _r as prefix
            );
        }
    },
    {
        "arcRotateCamera": {
            alpha: 5.5,
            beta: 1.2,
            [...],
    }
},
{
    "exec": function(){
        // now activating the camera
        _r.activateCamera("arcRotateCamera");
    }
}]
```
*Camera is created, then patched, then activating.*

So here the new structure:

<iframe
     src="https://codesandbox.io/embed/convert-scene-using-launch-cct37?codemirror=1&fontsize=12&hidenavigation=1&theme=dark&runonclick=1"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="convert-scene-using-launch"
     allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb"
     sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
   ></iframe>

Notice the loss of `#canvas` css which is now useless in `css/styles.css` (\_runtime automatically create a canvas with these parameters).

## Get our hands dirty

Time to see how to deal with lightmaps.

In my original tutorial, my javascript code was as simple as possible, to allow people to understand it as much as possible. But this had the inconvenient to assign the texture file even if it was still not downloaded! In raw javascript we need to play with the [onLoad](https://doc.babylonjs.com/api/classes/babylon.texture#constructor) callback, but this is tricky to explain and understand when you're not a dev ([here a playground](https://www.babylonjs-playground.com/#4AJ16M#15) using this callback).

\_runtime will here be useful for us by loading and creating the lightmap texture and only then patching our targets materials and assigning them the right lightmap. We're going to see two ways:

- easy way: write a patch for each lightmapped mesh, loading directly texture into lightmapTexture channel. Great when you just have a few mesh, annoying when there're hundred.
- advanced way: more flexible with large number of meshes, we'll use raw javascript. You'll see we'll still gain a lot of lines by the help of \_r.

### Easy way, using patches

We can start by creating a patch dedicated to lightmaps which I named in a very original way `lightmaps.patch`. As our lightmaps should be assigned by mesh, it would be more logical to use mesh names selector, but first, just give a try on materials.

![material-list](converting-existing-scene-to-runtime/material-list.png)

*Our materials list.*

Instead of writing each names, we can invoke the power of `*`!

```js
"*wall*:material, *floor*:material": { // all our wallz.000 materials are selected
```

And now, [loading the texture](https://babylon-runtime.github.io/api/load):

```js
"lightmapTexture": _r.load.texture("assets/lightmaps/wallz.000_LM.jpg", {
                "coordinatesIndex": 1
            }),
"useLightmapAsShadowmap": true
```

Notice that we also take the opportunity to assign UV2 channel on the fly. Don't forget to tell BJS we want shadowmap. If you're using another test scene as .glb, you may need to patch vScale to -1 also.

We should now have our lightmaps:

<iframe
     src="https://codesandbox.io/embed/convert-scene-lightmaps-eg709?codemirror=1&fontsize=12&hidenavigation=1&module=%2Fassets%2Fpatches%2Flightmaps.patch&theme=dark&runonclick=1"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="convert-scene-lightmaps-using-patch-materials"
     allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb"
     sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
   ></iframe>

But listing all our materials is a little boring. Using meshes names like in the [raw BabylonJS tutorial scene](https://www.nothing-is-3d.com/article27/from-blender-to-babylonjs#tocBJSSideLightmaps) is a little more convenient, however maybe a bit more tricky to understand because we'll cycle through our mesh materials & submaterials directly into the patch.

For this we have the ability to use kind-of special keywords/selectors: `material` and `subMaterials`. As we're using here .babylon format, meshes can use submaterials (in case of .glTF, one mesh = one material).

```js
{
    "*meshName*:mesh": {
        material:{ // current mesh material
            subMaterials:{ // cycle through subMaterials also (.babylon format)
                "*":{ // for each subMaterials
                    "lightmapTexture": _r.load.texture(...)
```

You've probably note the `"*"`, which is a special case here: `subMaterials` send a javascript array, so in case you want only the first element of subMaterials list, you can ask for `0: {}`. Here, `*` just tell `I want all elements`, as in selector, but that's not a selector! Writing `*paper*` to just get wallpaper material will not work.

[![Edit convert-scene-lightmaps-using-patch-meshes](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/embed/convert-scene-lightmaps-using-patch-meshes-01-wkljm?codemirror=1&highlights=5,6,7&fontsize=12&hidenavigation=1&module=%2Fassets%2Fpatches%2Flightmaps.patch&theme=dark)

But what if a mesh doesn't have submaterials? Here the lightmap will not be assigned right?

Right. Solution is simple: patch also materials:

```js
{
    "*meshName*:mesh": {
        material:{ // current mesh material
            "lightmapTexture": _r.load.texture(...), // lightmap if material,
            "useLightmapAsShadowmap": true
            subMaterials:{ // cycle through subMaterials also (.babylon format)
                "*":{ // for each subMaterials
                    "lightmapTexture": _r.load.texture(...)
```

[![Edit convert-scene-lightmaps-using-patch-meshes](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/embed/convert-scene-lightmaps-using-patch-meshes-02-s4lj2?codemirror=1&highlights=5,6,10,11,12&fontsize=12&hidenavigation=1&module=%2Fassets%2Fpatches%2Flightmaps.patch&theme=dark)

But why do I want an advanced way here, if it's already work as patch? Actually, for performance reason, it's not a great idea to use _r.load for each material on a mesh, especially if there's a lot: this increase textures number as it create a new element at each call. Patch way for this need is probably not the best practice.

That's why we need to go further.

### Advanced way, mix of javascript & \_r

Sometimes, for particular operations, you'll not avoid using raw javascript.

The lightmap logic here will start by navigating through our lightmapped meshes, so we need a list containing meshes names ([ReTiCo Blender addon](https://github.com/Vinc3r/ReTiCo/wiki/Meshes) could help ;) ).

If you've tried the easy way above, don't forget to remove the call to lightmaps.patch.

Once we have our names, we can cycle through them and:

1. load the lightmap (using the current mesh name)
2. once loaded, assign the lightmap on the current mesh material
    - if mesh have multimaterial, cycle through multimaterials to assign lightmap

\_r will help you thanks to `_r.select()` and `_r.load.texture()`.

For readibility, we can put lightmap code in a dedicated file. We will call lightmap function on the \_r.ready.

That's what we have in index.html:

```js
<script src="js/_r.min.js"></script>
<script src="js/lightmaps.js"></script>
```

```js
_r.ready(function() {
    /** LIGHTMAP ASSIGNATION PROCESS **/

    const lightmappedMeshes = ["furnitures.000", "wallz.000"]; // lightmapped meshes
    assignLightmapsToMeshes(lightmappedMeshes);
```

And the lightmaps.js file:

```js
function assignLightmapsToMeshes(lightmappedMeshes) {
  lightmappedMeshes.forEach(function(currentMeshName) {
    // we first load the texture, based on name convention
    _r.load
      .texture("assets/lightmaps/" + currentMeshName + "_LM.jpg", {
        coordinatesIndex: 1 // let's patch so it use UV2
      })
      .then(function(lightmap) {
        // now the texture is ready, we can assign it
        _r.select("*" + currentMeshName + "*:mesh").forEach(function(
          currentMesh
        ) {
          const material = currentMesh.material;
          // in case of multimat, we have to cycle through it
          if (material.getClassName() === "MultiMaterial") {
            material.subMaterials.forEach(function(subMaterial) {
              subMaterial.lightmapTexture = lightmap;
            });
          } else {
            // if classic material, just assign the lightmap
            material.lightmapTexture = lightmap;
          }
        });
      });
  });
}
```

[![Edit convert-scene-lightmaps-using-javascript](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/embed/convert-scene-lightmaps-using-javascript-01-grvv3?codemirror=1&highlights=2,4,10,17,21&fontsize=12&hidenavigation=1&module=%2Fjs%2Flightmaps.js&theme=dark)

Oops, it seems we forgot to set `useLightmapAsShadowmap` as true. You can add it to the javascript code, or in the already existing tweaks.patch.

And that's all, our scene is now fully converted!

<iframe
     src="https://codesandbox.io/embed/convert-scene-lightmaps-using-javascript-02-6089o?codemirror=1&fontsize=12&hidenavigation=1&theme=dark&highlights=9,31,39&runonclick=1"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="convert-scene-lightmaps-using-javascript-02"
     allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb"
     sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
   ></iframe>

Note that this lightmap script can be easily adapted on any scenes, here an example with [the CornellBox scene as .glb](https://github.com/BabylonJS/MeshesLibrary/tree/master/CornellBox):

<iframe
     src="https://codesandbox.io/embed/convert-scene-lightmap-script-to-another-scene-ci3og?codemirror=1&highlights=34,39&fontsize=12&hidenavigation=1&theme=dark&runonclick=1"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="convert-scene-lightmap-script-to-another-scene"
     allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb"
     sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
   ></iframe>

## Adding few features

Now we have fully integrated \_runtime, maybe we want to go further to add some functionnality? Note that this new features could also be added without having to convert the scene at all.
We'll start by something which is a bit painful to customize in raw BJS, named...

### Custom loading screen

Don't forget to check the [\_r API](https://babylon-runtime.github.io/api/loading-screen) if needed.

First, we will simply create and design our loadingscreen, by using a dedicated html file. Near index.html, create an basic html5 page, here named `loadingScreen.html`. To keep things readable, we can also create a css file for this loadingscreen (here in `/css/loadingScreen.css`) and linked it in our html.

As we have our html file, during the design process we can show only loadingscreen just by ask it through the url!

[![Edit convert-scene-add-loading-01](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/convert-scene-add-loading-01-uzlpz?fontsize=12&hidenavigation=1&initialpath=loadingScreen.html&module=%2FloadingScreen.html&theme=dark)

*As example on my local webserver, my url is `http://localhost:8082/converted/loadingScreen.html`.*

Now, do whatever design you want, just don't use class and id names found in the \_r API, which are reserved by \_runtime. Here is my beautiful design:

<iframe
     src="https://codesandbox.io/embed/convert-scene-add-loading-02-ryinb?fontsize=12&hidenavigation=1&initialpath=loadingScreen.html&module=%2FloadingScreen.html&theme=dark&previewwindow=browser"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="convert-scene-add-loading-02"
     allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb"
     sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
   ></iframe>

Time to link it in our app!

It seems too easy, as we just have to declare our html file, and copy-paste some css properties.

To tell \_runtime you have a custom loadingscreen, just put `_r.loadingScreen.iframe("loadingScreen.html");` before `_r.launch()`.
Now we have to use some css so as to make loading iframe visible. In loadingScreen.css, copy-paste this bits of code:

```css
.runtime-loadingScreen {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 999;
    margin: 0;
    padding: 0;
    opacity: 0;
    border: none;
    transition: opacity 1s;
}

.runtime-loadingScreen.visible {
    opacity: 1;
}
```

Also, don't forget to link this css in index.html too:

<iframe
     src="https://codesandbox.io/embed/convert-scene-add-loading-03-9uveu?codemirror=1&highlights=11,16&fontsize=12&hidenavigation=1&theme=dark&runonclick=1"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="convert-scene-add-loading-03"
     allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb"
     sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
   ></iframe>

But, it feels like we miss something, like... percents!

Here we'll use the `progress` property in `_r.launch()`, in combination with class naming inside loadingScreen.html.

In `_r.launch()`, add this overcomplicated mathematical operation:

```js
progress: function (evt) {
    var progress = parseInt(Math.abs((100 * evt.loaded) / evt.total));
    _r.loadingScreen.progress = progress;
}
```

This `_r.loadingScreen.progress` will automatically overwrite `runtime-loading-progress` class content in loadingscreen iframe. So in my example, I'm going to create a span using this class inside my `loadingContent` div:

<iframe
     src="https://codesandbox.io/embed/convert-scene-add-loading-04-nqgd8?codemirror=1&module=%2FloadingScreen.html&highlights=14&fontsize=12&hidenavigation=1&theme=dark&runonclick=1"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="convert-scene-add-loading-03"
     allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb"
     sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
   ></iframe>

Tips: your browser probably allow you to fake slow network through its console, here in Firefox & Chrome:

![fake-slow-network](converting-existing-scene-to-runtime/fake-slow-network.jpg)

You'll find more advanced features on the API.

### User interactions

Level up! It could be great to turn on & off this lamp by clicking on it right? We'll use [\_r events](https://babylon-runtime.github.io/api/on) for that. Note that we can also set events via [patches](https://babylon-runtime.github.io/api/patch), but I've made the choice to do full scripting here.

We're going to:

- preload both lightmaps set (on/off) and modify our lightmap script so as to tell it which set we want
- load pickable mesh (I've created a separated file for it)

- add OnPickTrigger event on lamp (actually, on the invisible mesh over the lamp)
- save lamp status (on/off)
- change lightmaps set and adapt & tweak materials depending of the lamp status

If you've download the zip, you'll find `_interactions.glb` file into `converted/assets/` folder. Lightmaps "off" set is on `converted/assets/lightmaps/`, using `_LM-off` suffix.

So create `interactions.js` in your `/js/` folder, don't forget to reference it in `index.html`.

I've put the `_r.load` into a `_r.ready` to be sure our scene is already on da place. As I've used glTF file, you'll notice that I'm doing some basic fix to handle the different axys convention:

```js
_r.ready(function() {
  _r.load("assets/_interactions.glb").then(function(assets) {
    var interactionsRoot = _r.select(assets).select("__root__")[0]; // on BJS v3, gltf root is a Mesh Class (TransformNode on BJS v4)
    interactionsRoot.name = "__interactions__";
    interactionsRoot.rotate(
      new BABYLON.Vector3(0, 1, 0),
      BABYLON.Tools.ToRadians(180)
    ); // as gltf use another axys convention, we have to rotate it from 180°
```

*Tips: if you don't remember a mesh name, you can quickly get a list in the console using \_r.select("\*:mesh").log("name")*

Next step is easy: adding new assets to the scene and patch them. We don't want this pickable mesh to be visible, but we can't set isVisible to false: this will make it... not pickable! So we'll use visibility = 0 instead.

All that's left now is adding an interaction:

```js
_r.ready(function() {
    [...]
	_r.select("_interact-lamp.000:mesh").on("OnPickTrigger", function() {
      clickOnLamp();
    });
  });
});

function clickOnLamp() {
  console.log("yep yep yep, you've clicked on the lamp!");
}
```
![pickable-mesh](converting-existing-scene-to-runtime/pickable-mesh.gif)

<iframe
     src="https://codesandbox.io/embed/convert-scene-add-interactions-01-ds0ed?codemirror=1&highlights=13,14,15&expanddevtools=1&fontsize=12&hidenavigation=1&module=%2Fjs%2Finteractions.js&theme=dark&runonclick=1"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="convert-scene-add-interactions-01"
     allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb"
     sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
   ></iframe>

*Yeah, console.log everywhere!*

Now a more tricky part: we have to modify our lightmap script so as to tell him which lightmap set we want. As it's not the purpose of this part (which is telling you how to add interactions), I will give you the demo as it is, but here the logic:

- we need lightmap list readable from everywhere (global variable)
- we need preload lightmaps and only then launch our lightmap assignation script
    - lightmap loading still use mesh name list, but also a suffix (`""` [default lightmaps] and `"-off"`)
    - lightmap script will not anymore use `_r.load`
- we need our lamp status readable from everywhere (global variable)

Modify parts are `_r.ready` in index.html, lightmaps.js and interactions.js:

<iframe
     src="https://codesandbox.io/embed/convert-scene-add-interactions-01-lg09v?codemirror=1&fontsize=12&hidenavigation=1&module=%2Fjs%2Finteractions.js&theme=dark&runonclick=1"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="convert-scene-add-interactions-02"
     allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb"
     sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
   ></iframe>

## \_runtime everywhere!

I think I give you enough leads to follow for this scene, feel free to share your tests and experiments! You can contact us by [visiting this page](https://babylon-runtime.github.io/help/).

I hope this tutorial helps you to understand how to kindly integrate \_r in your workflow. As I already said, you can already use it without doing any transformation on an existing project (to select some meshes, to patch some elements and so on), in the same way as using jQuery actually.

