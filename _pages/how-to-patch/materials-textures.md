---
title: "Materials & Textures"
layout: single
toc : true
permalink: /how-to-patch/materials-textures/
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
> Material **myMaterialName.000** will get its ambientColor set to **#2c789b**.

You can access to any materials containing a keyword in their name, using `*`:

```javascript
{
   "*keyword*": {
      "ambientColor": "#2c789b"
   }
}
```
> Each material having **keyword** in its name will get its ambientColor set to **#2c789b**.

You can add a filter to your selector to be sure working only on materials (useful if some other elements like meshes have identical naming):

```javascript
{
   "*keyword*:material": {
      "ambientColor": "#2c789b"
   }
}
```
In case you're not using this filter, like previous example, the property will be write on the element but not be read by BabylonJS. For example, without filter it's possible to write a new *ambientColor* property on a mesh having *#2c789b* value as a string.

You can of course set up multiples properties on multiples elements:

```javascript
{
   "*keyword*:material": {
      "diffuseColor": "gray",
      "ambientColor": "#2c789b",
      "emissiveColor": "#2c1111"
   }
}
```
> Each material having **keyword** in its name will get these values.

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