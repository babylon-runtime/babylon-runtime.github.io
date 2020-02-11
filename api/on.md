---
title : _r.on 
layout : api
---

## Mesh pointer events

```js
_r.select("*:mesh").on("OnPickTrigger", function() {
    console.log(this.name + ' has be picked');
}
```

### Available events
* OnDoublePickTrigger
* OnPickTrigger
* OnLeftPickTrigger
* OnRightPickTrigger
* OnCenterPickTrigger
* OnPickDownTrigger
* OnPickUpTrigger
* OnPickOutTrigger
* OnLongPressTrigger
* OnPointerOverTrigger
* OnPointerOutTrigger

Specific handler

```js
function handler(e) {
    console.log(this.name + ' has be picked');
}
_r.select("*:mesh").on("OnPickTrigger", handler);
```

## Keyboard events

```js
_r.on("OnKeyDownTrigger", function(e) {
    console.log("OnKeyDownTrigger", e.sourceEvent.key, e.sourceEvent.code)
});

_r.on("OnKeyUpTrigger", function(e) {
     console.log("OnKeyUpTrigger", e.sourceEvent.key, e.sourceEvent.code)
});
```

e is 

e.sourceEvent is a [Keyboard Event](https://developer.mozilla.org/fr/docs/Web/API/KeyboardEvent)

e.sourceEvent.code contains the current key see [https://www.w3.org/TR/uievents-key/#key-attribute-value]([https://www.w3.org/TR/uievents-key/#key-attribute-value)

## Custom events

```js
_r.on("myCustomEvent", function() {
    console.log("myCustomEvent handler");
})
```
Attach an event handler function for one or more events.

### extra parameters

```js
_r.on("myCustomEvent", function(data) {
    console.log("myCustomEvent handler with extra parameter");
    console.log(data.hello); // will output "world" in the console
});
var myList = { hello : "world"};
_r.trigger("myCustomEvent", myList);
```