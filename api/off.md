---
title : _r.off  
layout : api
---

## Mesh pointer events

All handlers
```js
_r.select("*:mesh").off("OnPickTrigger");
```
Specific handler
```js
function handler(e) {
    console.log(this.name + ' has be picked');
}
// assigning
_r.select("*:mesh").on("OnPickTrigger", handler);
// unassigning
_r.select("*:mesh").off("OnPickTrigger", handler);
```

## Custom Events

Remove all event handler.
```js
_r.off("myCustomEvent"); // stop listening to myCustomEvent
```

Remove a specific handler
```js
var handler1 = function() {
    console.log("myCustomEvent handler1")
}
var handler2 = function() {
    console.log("myCustomEvent handler2")
}
_r.on("myCustomEvent", handler1);
_r.on("myCustomEvent", handler2);
_r.trigger("myCustomEvent");
_r.off("myCustomEvent", handler1);
_r.trigger("myCustomEvent"); // and handler1 won't be called
```
