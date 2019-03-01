---
title: "Materials & Textures"
layout: single
toc : true
permalink: /how-to-patch/textures-materials/
sidebar:
   nav: "docs"  
---

## Materials

You can access to a single material using its name:

```javascript
{
   "myMaterialName.000": {
      "ambientColor": "#2c789b"
   }
}
```
> material **myMaterialName.000** will get its ambientColor set to **#2c789b**

You can access to any materials using a keyword in their name, using `*`:

```javascript
{
   "*keyword*": {
      "ambientColor": "#2c789b"
   }
}
```
> each material having **keyword** in its name will get its ambientColor set to **#2c789b**

You can add a filter to your selector to be sure working only on materials (useful if some other elements like meshes have identical naming):

```javascript
{
   "*keyword*:material": {
      "ambientColor": "#2c789b"
   }
}
```
In case you're not using this filter, like previous example, the property will be write on the element but not be read by BabylonJS. For example, without filter it's possible to write a new *ambientColor* property on a mesh having *#2c789b* value as a string.

## Textures

You can access to a texture used by a material using:

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