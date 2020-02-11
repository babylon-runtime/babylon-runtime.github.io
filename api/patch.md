---
title : _r.patch 
layout : api
---

```js
_r.patch( elements, patch )
```

* elements : String 
```js
_r.patch("mesh1, mesh2", {
    isVisible : false
});
```
* elements : Object
```js
_r.patch(material1, {
    diffuseColor : "red"
});
```

```js
_r.patch( patch )
```

```js
_r.patch([{
    "mesh1" :  {
        isVisible : false
    },
    "material01" : {
        diffuseColor : "red"
    }
}]);
```

```js
_r.patch( patchFile )
```

```js
_r.patch("test.patch").then(function() {
    console.log("done");
});
```

```js
_r.select( selector, patch )
```
 
```js
_r.select("mesh1").patch({
     isVisible : false
});
```

## Each patch property can be a function

```js
_r.patch({
    "Sphere1" : {
        position : {
            x : 40
        },
        material : function() {
            var material = new BABYLON.StandardMaterial("texture1", _r.scene);
            _r.patch(material,
                { wireframe : true }
            );
            return material
        }
    }
})
```

## You can exec function inside patch files

```js
_r.patch([
    {
        "exec" : function() {
            new BABYLON.StandardMaterial("texture1", _r.scene);
        }   
    },
    {
        "texture1" : {
            wireframe : true
        }       
    }
])
```

## Asynchronous operations in patches

If you want to wait for an async. operation before executing the rest of the patch you can return a Promise:

```js
_r.select("plane").patch({
    material : {
        diffuseTexture : function() {
            return new Promise(function(resolve, reject) {
                var texture = new BABYLON.Texture("https://www.babylonjs-playground.com/textures/grass.jpg", _r.scene);
                texture.onLoadObservable.add(function() {
                    resolve(texture);
                })
            })
        },
        backFaceCulling: false   
    }
})
```

...And property backFaceCulling will be set to false after the texture is loaded.

Note that in this case you could use _r.downloadTexture / _r.downloadCubeTexture since it returns Promise

```js
_r.select("plane").patch({
    material : {
        diffuseTexture : function() {
            return _r.downloadTexture("https://www.babylonjs-playground.com/textures/grass.jpg"); 
        },
        backFaceCulling: false   
    }
})
```

or more directly

```js
_r.select("plane").patch({
    material : {
        diffuseTexture : _r.downloadTexture("https://www.babylonjs-playground.com/textures/grass.jpg"),
        backFaceCulling: false   
    }
})
```

## Waiting for an asynchronous patch to complete

```js
_r.select("plane").patch({
    material : {
        diffuseTexture : _r.downloadTexture("https://www.babylonjs-playground.com/textures/grass.jpg"),
        backFaceCulling: false   
    }
}).then(function() {
    console.log("patch completed, texture is downloaded")
});
```

## Each property's function have parents as context in parameters

In this example if there's 2 spheres in the scene, **sphere1** and **sphere2**:

```js
_r.patch([{
    "sphere*" : {
        material : function(mesh) {
            return new BABYLON.StandardMaterial('material.' + mesh.name, _r.scene);
        }
    }
}])
```

material's function will be called for each sphere, passing the current sphere in the function arguments (**mesh** in this example).

### Each ancestor is available in the function arguments. 

```js
_r.patch([{
    "sphere1" : {
        material :  {
            diffuseTexture : function(material, mesh) {
                return new BABYLON.Texture(mesh.name + '.' + material.name + '.png');
            }   
        }
    }
}])
```

The diffuseTexture function has 2 arguments, the first one for the parent (the material), and the second for the parent of the material (the mesh).

## Events

### Mesh pointer events

You can create a [mesh pointer event](https://github.com/babylon-runtime/_r/blob/master/api/mesh%20pointer%20events.md) using patchs:

```js
_r.patch([{
    "sphere1:mesh": {
        "on": {
            "OnPickUpTrigger": function () {
                console.log("user just click on the mesh");
            }
        }
    }
}]);
```

### Custom events

You can assign a [custom event](https://github.com/babylon-runtime/_r/blob/master/api/custom%20events.md) to handle different states:

```js
_r.patch([{
        "sphere1:mesh": {
            "on": {
                "status-1": {
                    material: {
                        diffuseColor: "red"
                    }
                },
                "status-2": {
                    material: {
                        diffuseColor: "blue"
                    }
                }
            }
        }
    },
    {
        "cube*:mesh": {
            "on": {
                "status-1": {
                    material: {
                        diffuseColor: "green"
                    }
                },
                "status-2": {
                    material: {
                        diffuseColor: "yellow"
                    }
                }
            }
        }
    }
]);

_r.select("*:mesh").trigger("status-2");
```

## Write your own patch plugins

There's build in plugins available in patches

### Hex Colors

```js
_r.select("*material").patch({
    material : {
        diffuseColor : "#dd00dd"
    }       
})
```

### property for all childs from a property that is an Array or a MultiMaterial

```js
_r.patch([
{
    "*:multiMaterial" : {
        "*" : {
            "diffuseColor" : "#dd00dd"
        }          
    }
}
]);
```

### You can create your own plugin for patches.

For example let create a PBR patch plugin:

```js
_r.patch.registerPlugin({
    test(element, source, property) {
        return property === "pbr";
    },
    resolve(element, source, property) {
        element.material = new BABYLON.PBRMaterial("", _r.scene);
        return _r.select(element.material).patch(source[property]);
    }
});
```

Then you have the pbr property available in patches:

```js
_r.select("sphere1, ground1").patch({
    pbr : {
        microSurface : 0.96,
        albedoColor : {
            r : 0.206,
            g : 0.94,
            b : 1
        },
        reflectivityColor : {
            r : 0.003,
            g : 0.003,
            b : 0.003
        }
    }
});
```
PBR material is automatically created and assigned to sphere1 and ground1.