# Using \_runtime in an existing scene

We will take as an example a scene you may have seen before, the one I've made for a tutorial about Blender to BabylonJS, including lightmaps management: [From Blender to BabylonJS workflow](https://nothing-is-3d.com/data/medias/folio/3drealtime/lightmaps-workflow-tutorial/demo.html).

![thumbnail](converting-existing-scene-to-runtime/thumbnail.jpg)

*Note that this scene is in standard workflow, not PBR*

[Here a download link](https://github.com/babylon-runtime/_r.assets/raw/master/converting-existing-scene-to-runtime/converting-existing-scene-to-runtime.zip), containing:

- **original** folder: the raw BabylonJS scene, ready to be edited by you
- **converted** folder: full converted scene to \_runtime

Also, don't forget to point a [local webserver](https://www.nothing-is-3d.com/article28/use-a-local-webserver) into your unzipped folder. Notice that this scene was made on BJS [v3.3.0](https://github.com/BabylonJS/Babylon.js/tree/master/dist/previous%20releases/3.3) and Blender [2.79](https://download.blender.org/release/Blender2.79/) (with the now [deprecated](https://github.com/BabylonJS/BlenderExporter/tree/master/deprecated) .babylon exporter v5.6).

Of course, we'll also need to get the [last version of \_runtime](https://github.com/babylon-runtime/_r/releases/latest). You can notice I've already linked it line 9 of `index.html`:

```javascript
<script src="js/babylon.js"></script>
<script src="js/pep.min.js"></script>
<script src="js/_r.min.js"></script>
```
*Ready to go!*

In case you want to show the Inspector, uncomment the `scene.debugLayer.show();` part (lines 134 & 135).

<iframe
     src="https://codesandbox.io/embed/github/babylon-runtime/_r.assets/tree/master/converting-existing-scene-to-runtime/original?fontsize=12&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="babylonjs-with-runtime"
     allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb"
     sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
   ></iframe>

## Patch...works!

At this time, which is not even yet the beginning, you already are able to use \_runtime! In your browser console, try to copy-paste this command line:

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

Notice that in this exercice we will do a full convertion of our scene, which is already tweaked and finalized, but in other existing projects you can just keep them as they are and just call \_runtime when needed.

Example, if we insert this patch inside our `SceneLoader.Append` line 129:

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
*This will give the exact same result as we got when using the command line into the browser console. (don't forget to remove this \_r.patch before continuing this tutorial). Check line 147 on the CodeSandbox below.*

[![Edit convert-scene-first-try-with-patch-ef2p5](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/convert-scene-first-try-with-patch-ef2p5?fontsize=12&hidenavigation=1&theme=dark)

So, let's start to convert the easiest part: mesh & material tweaking (line 117 to 145). We just have to convert  `scene.getMaterialByName("scene_BJS.lampFabric01.000")` as a \_runtime selector `{"scene_BJS.lampFabric01.000":{ [...] }}`.

Here I like to use the `*` char, to ease the patch reading: `{"*lampFabric01.*":{ [...] }}`. This `*` will already allow some versatility in our workflow:

- the old .babylon exporter was adding a prefix (using .babylon file name) to the materials, using the `*` as suffix on the \_r selector, we don't care any more what exporter you're using (names can be `scene_BJS.lampFabric` or `lampFabric`, they both will be taken into account).
- the `.000` suffix can be instantly broke on Blender if the cgartist make a material duplication (turning into `.001`). Again, the `*` as suffix don't pay attention any longer to this part

Now the properties: `.diffuseColor = BABYLON.Color3.Black();` will become `diffuseColor : "black",`.

Try to convert all the tweaks inside a `_r.patch`, pay attention to `,`! Once materials are done, why not also include collisions meshes?

Below the result, check line 116 on the CodeSandbox:

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

[![Edit convert-scene-tweaks-as-patch-zew4r](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/convert-scene-tweaks-as-patch-zew4r?fontsize=12&hidenavigation=1&theme=dark)

Notice that \_r allows you to place comments inside the patches.

And why not putting this inside a dedicated file, for more clarity? We can create a `/patches/` folder inside `/assets/` and name our patch file the way we want (except the extension), here `tweaks.patch`:

```javascript
/** END OF LIGHTMAP ASSIGNATION PROCESS **/

_r.patch(["assets/patches/tweaks.patch"]);

/* tools */
```
*Better.*

Actually, we can also patch our camera using a camera.patch for example, and, let's be crazy, also our scene. Keep for now the camera raw BJS creation (line 36):

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

[![Edit convert-scene-multiple-patch-files](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/convert-scene-multiple-patch-files-20pz3?fontsize=12&hidenavigation=1&theme=dark)

## Simplify the loading

We're just going to get rid of most of the code, using `_r.launch()`. The only code inside `<body>` tag that we'll keep untouched - for now - will be the lightmap assignation processing.

As even the canvas and engine renderloop can be handled by \_runtime, steps will be:

- delete `<canvas>` tags
- delete all engine and scene creation
- replace `SceneLoader.Append()` with `_r.launch()`
- use `_r.ready()` to be able to use our lightmap javascript
- as we'll loose our scene variable: replace `scene` by `_r.scene` 

Note that it's also possible to keep using your canvas or engine, in case you want custom [EngineOptions](https://doc.babylonjs.com/api/classes/babylon.engine#constructor) for example.

As we're not using a camera stored into the .babylon, but a created one from scratch, we need to include its creation inside our cameras.patch, then make it current activeCamera in our `_r.ready()`.

To do that, we'll use the "execute" patch functionnality before the camera patch properties we've already made:

```javascript
[{
        "exec": function () {
            // we can do the code we want here
            new BABYLON.ArcRotateCamera(
                "arcRotateCamera",
                5.5,
                1.2,
                3.75,
                new BABYLON.Vector3(-0.8, 0.75, 0.8),
                _r.scene // don't forget the _r as prefix
            );
        }
    },
    {
        "arcRotateCamera": {
            alpha: 5.5,
            beta: 1.2,
            [...]
```
*camera is created, then patched*

So here the new structure:

<iframe
     src="https://codesandbox.io/embed/convert-scene-using-launch-cct37?fontsize=12&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="convert-scene-using-launch"
     allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb"
     sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
   ></iframe>

Notice the loss of `#canvas` css which is now useless (\_runtime automatically create a canvas with these parameters).

## Get our hands dirty

Time to see how to deal with lightmaps.

In my original tutorial, my javascript code was as simple as possible, to allow people to understand it as much as possible. But this had the inconvenient to assign the texture file even if it was still not downloaded! In raw javascript we need to play with the [onLoad](https://doc.babylonjs.com/api/classes/babylon.texture#constructor) callback, but this is tricky to explain and understand when you're not a dev ([here a playground](https://www.babylonjs-playground.com/#4AJ16M#15) using this callback).

\_runtime will here be useful for us by loading and creating the lightmap texture and only then patching our targets materials and assigning them the right lightmap.

*(clone materials, texture creation, looping inside materials inside our meshes selector)*

## Adding few features

- *custom loading screen*
- *interactions* (light on/off => disable lightmaps? or using a new set)

---

don't forget to update the download zip