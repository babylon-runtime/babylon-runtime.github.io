# \_runtime cheatsheet

Most common and useful commands.

## Launch

```javascript
 _r.launch({
    scene : "myScene.glb",
    activeCamera : "myCamera",
    patch : ["path/to/myFile.patch", "path/to/myFile2.patch"]
});
_r.ready(function() {
    console.log("myScene loaded");
})
```

## Patch

```javascript
_r.patch([{
    "element" :  {
        property : value
    }
}]);
```

```javascript
_r.patch("path/to/myFile.patch").then(function() {
    console.log("patch applied");
});
```

## Select

```javascript
_r.select('*:mesh').forEach(function(mesh) {
  console.log(mesh.name)
});
```

```javascript
_r.select("*:material").log("name");
```

## Animate

```javascript
_r.animate("myMesh:mesh", {
    rotation : {
        y : 0.5
    }
}, 1);
```

## Scene

```javascript
_r.scene.debugLayer.show({overlay: true, embedMode: true, enablePopup: true});
```

## Color

```javascript
_r.color("#ff0000");
```

## Router

```javascript
_r.router.trigger(_r.router.get());
```

```javascript
_r.router.on("/route-1", function() {
    console.log("user clicked on index.html#/route-1");
})
```

```javascript
_r.router.set("/route-2");
```

## Events

```javascript
_r.on("myCustomEvent", function() {
    console.log("myCustomEvent handler");
})
```

```javascript
_r.trigger("myCustomEvent");
```

```javascript
_r.off("myCustomEvent");
```

## User interactions

```javascript
_r.select("myMesh:mesh").on("OnPickTrigger", function() {
    console.log(this.name + " has be picked.");
}
```



## Templates

```html
<!DOCTYPE html>
<html>

<head>
    <title>Default BabylonJS _runtime page</title>
    <meta charset="utf-8" />

    <!-- BabylonJS -->
    <script src="https://cdn.babylonjs.com/babylon.js"></script>
    <script src="https://cdn.babylonjs.com/loaders/babylonjs.loaders.min.js"></script>

    <script src="https://code.jquery.com/pep/0.4.3/pep.js"></script>

    <!-- _runtime -->
    <script src="https://unpkg.com/babylon-runtime@latest/dist/_r.min.js"></script>

</head>

<body>
    <script type="text/javascript">
        _r.launch({
            scene: "myScene.glb",
            activeCamera: "Camera",
            patch : ["path/to/myFile.patch"]
        });
        _r.ready(function () {
            console.log("myScene loaded");
        });
    </script>
</body>

</html>
```

## Nota bene

- if a patch on a element seems to be not applied, check if the same element is patch elsewhere
- you get a `SyntaxError`: you probably forget a `,` somewhere in your patchs