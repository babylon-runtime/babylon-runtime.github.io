---
title: "JSON?"
layout: single
toc : true
permalink: /first-steps/json/
sidebar:
  nav: "docs"  
---

You may want to read the [wikipedia page](https://en.wikipedia.org/wiki/JSON) about JSON but basically it's just is a human-readable way to save data.

If you don't know anything about it, don't be scared. It may seem rough at first glance, but it's not :)

## Rules

All you have to know is that there is some rules about writing data in a JSON file:

  - all content contained in one patch must be write inside two square brackets `[...]`
  - to access an element (object, material, etc), you have to hold it between two braces `{...}` and write in them the element name enclosed by quotes `"elementName"`,
  - once you have select an element, you want to highlight some of its properties. So after `"elementName"`, add a colon and two braces `: {...}`, and write here the properties name enclosed by quotes `"propertyName"`:

```javascript
[
  {
    "elementName":
    {
      "propertyName": "propertyValue"
    }
  }
]
```

Note that according to your preferences, you could also format your patch as follows, it will act exactly the same:

```javascript
[{
    "elementName": {
        "propertyName": "propertyValue"
    }
}]
```

You will find on this doc' a bad pratice but pratical: comments inside JSON files, which are in theory not allowed!

But leaving a comment inside in your work could be very helpful, so let's close our eyes about that...


```javascript
[{
    "elementName": {
        "propertyName": "propertyValue" /* this comment should not be existing, but, you know... */
    }
}]
```

## Comma

If you have multiple properties for an element, each line must end with a comma but not the last:

```javascript
[{
    "elementName": {
        "propertyName": "propertyValue",
        "anotherPropertyName": "anotherPropertyValue",
        "yetAnotherOne": "yetAnotherOneValue" /* no comma here */
    }
}]
```

Same between multiple elements:

```javascript
[
  {
    "elementName":
    {
      "propertyName": "propertyValue",
      "anotherPropertyName": "anotherPropertyValue" /* no comma here */
    } /* nope, no comma here neither */
  }, /* here it is! */
  {
    "anotherElement":
    {
      "propertyName": "propertyValue",
      "anotherPropertyName": "anotherPropertyValue"
    }
  }
]
```

## Value types

Only text (string) values have to be bound by quotes, others like number or boolean can be write as it is:

```javascript
{
  "elementName": {
      "propertyName": "stringValue",
      "anotherPropertyName": 42,
      "yetAnotherOne": true
  }
}
```

## Properties using... properties

Suppose a property is composed of properties, like a color containing red, green & blue channels?

Too easy, same rules: open new braces `{...}`.

```javascript
[{
  "elementName": {
      "overcomplicatedColor": {
          "r": 0.123,
          "g": 0.666,
          "b": 1 /* that's right, no comma! */
      }, /* but don't forget this one */
      "easyProperty": true,
      "otherProperty": "#FF8EF0"
  }
}]
```

## Reading Direction

\_runtime will read a patch file from... start to end, yep.

So if a property appears multiple times in your patch, it is the last one which is taken into account:

```javascript
[{
    "elementName": {
        "myPropertyToTweak": 1, /* this is finally ignored... */
        "myPropertyToTweak": 42, /* ...'cause of this line */
        "coolThing": "white" /* this is finally ignored... */
    }
  },
  {
    "elementName": /* (same element as above) */
    {
      "coolThing": "black" /* ...'cause of this line */
    }
  }
]
```

> Here, elementName will get myPropertyToTweak = 42 and coolThing = black.

## Recap & Tips

### Recap

To resume, a patch is just a file containing a list, which can be represented by this scheme:

- first level, an array:

```javascript
[ ]
```

- second level, an array with element names we want to select:
 
```javascript
[
  { "elementName" } ,
  { "elementName" }
]
```

- third level, an array with our elements properties:

```javascript
[
  { "elementName": 
    { "propertyName" : "value" }
  } ,
  { "elementName":
    { "propertyName" : "value" , "anotherPropertyName" : "value" }
  }
]
```

### Tips

Here some tips depending of your favorite text editor to help formatting your patches (and/or code files in the meantime):

Code editor | Tips
--- | ---
[Atom](https://atom.io/) | install [atom-beautify](https://atom.io/packages/atom-beautify) package,<br>then go to Packages > Atom Beautify > Beautify
[Notepad++](https://notepad-plus-plus.org/) | install [JSToolNpp](http://www.sunjw.us/jstoolnpp/) plugin,<br>then go to Plugins > JSTool > JSFormat
[Visual Studio Code](https://code.visualstudio.com/) | install [Beautify](https://marketplace.visualstudio.com/items?itemName=HookyQR.beautify) extension,<br>then F1 > Beautify

<br>

Hooray, you're now a JSON master \o/ !

<br>

### Postscript

Technically speaking... patch datas **aren't** strictly using JSON format, but just its visual way of saving data. A patch file is more a javascript file readed like a css file, written as a json one. So let's say it's just a specific \_runtime convention ;)