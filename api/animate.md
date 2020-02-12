---
title : _r.animate 
layout : documentation
---

```js
_r.animate( elements, patch, options )
```
returns a [BABYLON.AnimationGroup](https://doc.babylonjs.com/api/classes/babylon.animationgroup){: target="_blank"}

```js
_r.animate("camera1", {
    position : { x : 0, y : 0, z : 0 },
    rotation : { x : 0, y : 0, z : 0 },
    fov : 0.1
}, 2); // in seconds
```

This animate camera1 *position*, *rotation* and *fov* to targetted values, in 2 seconds.

### Arguments 

{:.uk-table.uk-table-striped}
| argument | description |
|----------|-------------|
| elements | selector or object | 
| patch | properties to animate, with target value, using patch syntax |
| options | number (time in seconds) or object (list of options) 



## Options

```js
_r.animate("mesh1", 
    { 
        material : 
        { 
            alpha : 0 
        } 
    }, 
    {
        duration : 2, 
        easing : "easeInSine",
        complete : function() {
            console.log("animation complete");
        },
        loop : true 
    });
```

{:.uk-table.uk-table-striped}
| name | description |
|------|-------------|
| duration | duration in seconds, default = 0.4 |
| easing | string from [https://easings.net/](https://easings.net/){: target="_blank"}, default : none |
| complete | function called after animation completed |
| loop | true for a cycle animation, default = false

