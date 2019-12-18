# Why use _runtime for artists

---

NOTA BENE

- add a level of simplicity
- help to gain time when you're not a dev

---

![runtime-for-artists-chapo](why-use-runtime-for-artists/runtime-for-artists-chapo.jpg)

## Behind the scene

When I (Vincent Lamy aka [V!nc3r](https://forum.babylonjs.com/u/Vinc3r/summary)) first started to get my hands into webGL through Babylon.JS (BJS), while I was used to Unity3D engine, I'm not going to hide that I was a little frightened - but also intrigued: relatively new technology, raw javascript, no official graphic editor, no PBR, no lighting engine...

Actually there is an [editor](http://editor.babylonjs.com/) made by a [BJS user](https://github.com/julien-moreau), which is a great piece of work, but our workflow soon get into professional problematics: artists often need to export & re-export 3D scenes multiple times in a day, and unfortunatly by using the editor you're loosing all your wonderful modifications on the BJS side! Plus as a team we need to work at the same time on our applications. Add to this that the Inspector did not exist at the time ([Sébastien]( https://forum.babylonjs.com/u/devaxeon/summary) Montlibert had to code an explorer for me).

That's why, in 2016, my teamate (Fabien Le Vavasseur aka [sharp](https://forum.babylonjs.com/u/sharp/summary)) had in mind to create a kind of overlay of BJS, named \_runtime, to help me speed up my tasks and not be restrict by my javascript skills.

This tool allowed me this kind of efficient worklow:

1. export my scene from Blender
2. tweak materials and interactions in BabylonJS
3. make some modifications on Blender
4. re-export my scene from Blender...
5. ... and not loosing any of my BJS tweaks!

We called this functionnality **patchs**.

![starting-bjs](why-use-runtime-for-artists/starting-bjs.jpg)

> one of my firsts tries using BabylonJS

## Time to \_run

So, why an artist would like \_runtime? Because it will not only avoid you to loose some of your tweaks, but also make more easy to write read and maintain your application.

Take a look at the example above:

The goal is to tweak albedoColor and roughness for all materials using *woods* in their names, and also to enable collisions on all meshes with *\_coll* in their names (and cameras of course).

raw javascript:
```javascript
scene.materials.forEach(function(mtl){
    if(mtl.name.indexOf("woods")){
        mtl.albedoColor = new BABYLON.Color3.FromHexString("#ffe1b2");
        mtl.roughness = 0.8;
    }
});
scene.meshes.forEach(function(msh){
    if(msh.name.indexOf("_coll")){
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
        "albedoColor": "#ffe1b2",
        "roughness": 0.8
    }
},
{
    "*_coll*, *:camera":{
        "checkCollisions": true
    }
}
```

> notice the \* char which means "no matter what character you found here"

If you're not very comfortable with code, as most artists are, you probably already understand how \_runtime could benefit to you.