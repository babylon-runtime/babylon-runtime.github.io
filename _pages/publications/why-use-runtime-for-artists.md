# Why use _runtime for artists

---

- add a level of simplicity
- help to gain time when you're not a dev
- [editor](http://editor.babylonjs.com/) limitation: you can export & reexport

---

## Behind the scene

When I (Vincent Lamy aka V!nc3r) first started to get my hands into webGL through Babylon.JS (BJS), while I was used to Unity3D engine, I'm not going to hide that I was a little frightened - but also intrigued: relatively new technology, raw javascript, no official graphic editor.

Actually there is an [editor](http://editor.babylonjs.com/) made by a [BJS user](https://github.com/julien-moreau), which is a great piece of work, but our workflow soon get into problematics: artists often need to export & re-export 3D scenes multiple times in a day, and unfortunatly by using the editor you're loosing all your wonderful modifications on the BJS side!

That's why, in 2016, my teamate (Fabien Levavasseur) had in mind to create a kind of overlay of BJS, named \_runtime: it allowed me to:

- export my scene from Blender
- tweak materials in BabylonJS
- make some modification on Blender
- re-export my scene from Blender
- still having my BJS tweaks applied!

We called this functionnality **patchs**.

## Time to \_run

