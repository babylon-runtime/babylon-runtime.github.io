---
title : _r.color 
layout : documentation
---

```js
_r.color( element )
```

Convert something to a [BABYLON.Color3](https://doc.babylonjs.com/api/classes/babylon.color3).

```js
_r.color("#ff0000");
_r.color({ r : 1, g : 0, b : 0 });
_r.color("red");
_r.color("rgb(255, 0, 0)");
_r.color([1, 0, 0]);
```

Color keywords list: `red`, `green`, `blue`, `black`, `white`, `purple`, `magenta` / `pink`, `yellow`, `teal` / `cyan`, `gray` / `grey`, `random`.