---
title : _r.load 
layout : documentation
---

```js
_r.load( file, patch )
```

This return a [BABYLON.AssetContainer](https://doc.babylonjs.com/api/classes/babylon.assetcontainer).

```javascript
_r.load(
    "file.gltf",
    [
        "/patches/patch1.patch",
        "/patches/patch2.patch",
    ]
).then(function (newAssets) {
    _r.select(newAssets).addToScene();
});
```

---

```js
_r.load.texture( file, patch )
```

This return a [BABYLON.Texture](https://doc.babylonjs.com/api/classes/babylon.texture).

```js
_r.load.texture("texture.jpg").then(function(texture){
    myMaterial.albedotexture = texture;
});
```

```js
_r.patch([{
    "materialName": {
        "lightmapTexture": function () {
            return _r.load.texture("lightmapName.jpg",{
                "vScale": -1,
                "coordinatesIndex": 1
            });
        }
    }
}]);
```

