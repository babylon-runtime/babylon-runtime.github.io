---
title : _r.trigger 
layout : documentation
---


## Custom events

Any event handlers attached with .on() or one of its shortcut methods are triggered when the corresponding event occurs. They can be fired manually, however, with the .trigger() method.

```js
_r.trigger("myCustomEvent");
_r.trigger("myCustomEvent", data);
```

Events are available by elements:

```js
_r.select("mesh1").trigger("myCustomEvent");
```

