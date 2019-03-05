---
title: "Colors & Vector"
layout: single
toc : true
permalink: /how-to-patch/colors-vectors/
sidebar:
   nav: "docs"  
---

## Colors

You can use predefined named colors, hexadecimal or RGB values:

```javascript
"ambientColor": "blue",
"ambientColor": "#2c789b",
"ambientColor": [0.17, 0.47, 0.61]
```

Predefined named colors list is: white, black, yellow, blue, red, green


## Vectors

All vector properties can be defined:

```javascript
"position": {
   "x": 1,
   "y": 1,
   "z": 1
}
```

or only one component:

```javascript
"position": {
   "x": 1
}
```