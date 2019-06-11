---
title: "_r.patch"
layout: single
toc : true
permalink: /api/patch/
sidebar:
   nav: "docs"  
--- 

## Rules

- keywords are case-sensitive
- string values have to be quoted but not boolean & vector.

```javascript
"ambientColor": "#e0684b",
"alphaIndex": 1,
"isVisible": false
```

## Colors

You can use hexadecimal, RGB or predefined named colors:

```javascript
"ambientColor": "blue",
"ambientColor": "#e0684b",
"ambientColor": [0.17, 0.47, 0.61]
```

[Predefined named colors](https://github.com/babylon-runtime/_r/blob/master/src/color.ts#L54) are: red, green, blue, black, white, purple, magenta/pink, yellow, teal/cyan, gray/grey, random.

## Materials

### Name

You can access to a single material using its name:

```javascript
{
   "myMaterialName.000": {
      "ambientColor": "#e0684b"
   }
}
```

> Material **myMaterialName.000** will get its ambientColor set to **#e0684b**.

You can set up multiples properties on multiples elements:

```javascript
{
   "myMaterialName.000": {
      "diffuseColor": "gray",
      "ambientColor": "#e0684b",
      "emissiveColor": "#2c1111"
   }
}
```

### Asterisk (*)

You can access to any materials containing a keyword in their name, using `*`:

```javascript
{
   "*keyword*": {
      "ambientColor": "#e0684b"
   }
}
```

> Each material having **keyword** in its name will get its ambientColor set to **#e0684b**.

### Filters

You can add a filter to your selector to be sure working only on materials (useful if some other elements like meshes have identical naming).

[Available filters](https://github.com/babylon-runtime/_r/blob/master/src/Selector.ts#L88) are: mesh, light, material, multimaterial, texture, camera.

```javascript
{
   "*keyword*:material": {
      "ambientColor": "#e0684b"
   }
}
```

In case you're not using this filter and if the property doesn't exist on the element, it will still write on it (but not be read by BabylonJS). For example, without filter it's possible to write a new *ambientColor* property on a mesh having *#e0684b* value as a string.

## Selector

Patches use [selector syntax](../select/).

## Textures

You can access to a texture used by a material:

```javascript
{
   "myMaterialName.000": {
      "albedoTexture": {
         "wrapU": 4,
         "wrapV": 4
      }
   }
}
```

## Vectors

All vector properties can be defined:

```javascript
"position": {
   "x": 1,
   "y": 1,
   "z": 1
}
```

or only a few of them if needed:

```javascript
"position": {
   "x": 1
},
"rotation": {
   "x": 1,
   "z": 0.25
}
```
