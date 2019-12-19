# Why artists should use _runtime

![runtime-for-artists-chapo](why-use-runtime-for-artists/runtime-for-artists-chapo.jpg)

## Behind the scene

When I (Vincent Lamy, aka [V!nc3r](https://forum.babylonjs.com/u/Vinc3r/summary)) first started to get my hands into webGL through Babylon.JS (BJS), while I was used to Unity3D engine I'm not going to hide that I was a little frightened - but also intrigued: relatively new technology, raw javascript, no official graphic editor, no PBR, no lighting engine...

Actually there is an [editor](http://editor.babylonjs.com/) made by a [BJS user](https://github.com/julien-moreau), which is a great piece of work but our workflow soon get into problematics: artists often need to export & re-export 3D scenes multiple times in a day, and unfortunatly by using the editor you're loosing all your wonderful modifications on the BJS side! Plus as a team we need to work at the same time on our applications.

That's why, in 2016, my teamate (Fabien Le Vavasseur aka [sharp](https://forum.babylonjs.com/u/sharp/summary)) had in mind to create a kind of overlay of BJS, named \_runtime, to help me speed up my tasks and not be restrict by my javascript skills.

This tool allowed me this kind of efficient worklow:

1. Export my scene from Blender (or any 3D modeler),
2. Tweak materials and interactions in BabylonJS,
3. Come back to Blender to make some modifications then re-export my scene to BJS...
4. ... and not loosing any of my tweaks!

We called this functionnality **patchs**.

![starting-bjs](why-use-runtime-for-artists/starting-bjs.jpg)

> one of my firsts tries using BabylonJS

## Time to \_run

So, why an artist would like \_runtime? Because it will not only avoid you to loose some of your tweaks, but also make more easy to write, read and maintain your application.

If we take as example the need to tweak albedoColor and roughness for all materials using *woods* in their names, and also to enable collisions on all meshes with *\_coll* in their names (cameras also of course):

raw javascript:
```javascript
scene.materials.forEach(function(mtl){
    if(mtl.name.indexOf("woods") != -1){
        mtl.albedoColor = new BABYLON.Color3.FromHexString("#ffe1b2");
        mtl.roughness = 0.8;
    }
});
scene.meshes.forEach(function(msh){
    if(msh.name.indexOf("_coll") != -1){
        msh.checkCollisions = true;
    }
});
scene.cameras.forEach(function(cam){
    cam.checkCollisions = true;
});
```
\_runtime:
```javascript
{
    "*woods*":{
        albedoColor: "#ffe1b2",
        roughness: 0.8
    }
},
{
    "*_coll*, *:camera":{
        checkCollisions: true
    }
}
```

> notice the "\*" char which means "no matter what character you found here"

If you're not very comfortable with code, as most artists are, you probably already understand how \_runtime could benefit to you.

I often had to deal with hundred of materials, and be able to patch one particular or a bunch of them in a short time is enjoyable. Plus when you work with other artists, they can quickly find and modify an existing patch (a simple Ctrl+F and you're ready to go).

![hundreds-of-materials](why-use-runtime-for-artists/hundreds-of-materials.png)

> an example with hundreds of materials

## Launch & See

And what about just load a 3D model? Let's take an example using this [cornellBox scene](https://github.com/babylon-runtime/_r.assets/blob/master/cornellBox/exports/glb/cornellBox.glb).

Using classic workflow, you will get this basic html setup:

```javascript
<body>
    <canvas id='canvas'></canvas>
    <script type="text/javascript">
        var canvas = document.getElementById("canvas");
        var engine = new BABYLON.Engine(canvas, true);
        var scene = new BABYLON.Scene(engine);
 		// default camera, waiting to use the imported one
        scene.createDefaultCamera();
		// we need an env map as we are in PBR
        scene.createDefaultEnvironment({
            createGround: false,
            createSkybox: false
        });

        BABYLON.SceneLoader.Append(
            "",
            "cornellBox.glb",
            scene,
            function () {
                var camera = scene.getCameraByName("Camera");
                camera.attachControl(canvas, true);
                // activating imported camera
                scene.activeCamera = camera;
            });

        engine.runRenderLoop(function () {
            scene.render();
        });

        window.addEventListener("resize", function () {
            engine.resize();
        });
    </script>
</body>
```

As for \_runtime, you just have to use the `_r.launch` function:

```javascript
<body>
    <script type="text/javascript">
        _r.launch({
            scene: "cornellBox.glb",
            // activating imported camera
            activeCamera: "Camera",
            beforeFirstRender: function () {
                // we need an env map as we are in PBR
                _r.scene.createDefaultEnvironment({
                    createGround: false,
                    createSkybox: false
                });
            }
        });
    </script>
</body>
```

![first-launch-01](why-use-runtime-for-artists/first-launch-01.png)

> yep, it works!

Now, how to patch our scene? Easiest way to do it is to call patch during launch. Try to guess what's each patch are doing:

```javascript
_r.launch({
    scene: "cornellBox.glb",
    // activating imported camera
    activeCamera: "Camera",
    patch: [{
            "*.wall01.*": {
                albedoColor: "red"
            }
        }, {
            "*.wall02.*": {
                albedoColor: "green"
            }
        }, {
            "suzanne.000": {
                metallic: 1,
                roughness: 0.15
            }
        },
        {
            "_r.000, bjs-logo.000": {
                unlit: true,
                disableLighting: true
            }
        },
        {
            "Camera": {
                speed: 0.1,
                minZ: 0.01
            }
        }
    ],
    beforeFirstRender: function () {
        // uncomment below to launch the Inspector
        // _r.scene.debugLayer.show();

        // we need an env map as we are in PBR
        _r.scene.createDefaultEnvironment({
            createGround: false,
            createSkybox: false
        });
    }
});
```

![launch-02](why-use-runtime-for-artists/launch-02.png)

For comparaison, the raw javascript:

```javascript
BABYLON.SceneLoader.Append(
    "",
    "cornellBox.glb",
    scene,
    function (cornellBox) {
        var camera = cornellBox.getCameraByName("Camera");
        camera.speed = 0.1;
        camera.minZ = 0.01;
        camera.attachControl(canvas, true);
        // activating imported camera
        scene.activeCamera = camera;

        var wall01Mtl = cornellBox.getMaterialByName("cornellBox.wall01.000");
        wall01Mtl.albedoColor = BABYLON.Color3.Red();

        var wall02Mtl = cornellBox.getMaterialByName("cornellBox.wall02.000");
        wall02Mtl.albedoColor = BABYLON.Color3.Green();

        var suzanneMtl = cornellBox.getMaterialByName("suzanne.000");
        suzanneMtl.metallic = 1;
        suzanneMtl.roughness = 0.15;

        cornellBox.materials.forEach(function (mtl) {
            if ((mtl.name.indexOf("_r") != -1) ||
                (mtl.name.indexOf("logo") != -1)) {
                mtl.unlit = true;
                mtl.disableLighting = true;
            }
        });

        // uncomment below to launch the Inspector
        // scene.debugLayer.show();
    });
```

