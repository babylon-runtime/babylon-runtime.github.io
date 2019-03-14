---
title: "Ready?"
layout: single
toc : true
permalink: /going-further/ready/
sidebar:
   nav: "docs"  
---

We now have a fully BabylonJS patched scene, loaded.

But what if we want enhance this scene using tweaks that have to be made only once the scene is ready?

Of course \_runtime can help us, using the `_r.ready()` function:

```html

<body>
    <script type="text/javascript">
        _r.launch({
            assets : "assets/",
            scene : "cornellBox.babylon",
            activeCamera : "Camera",
            patch: ["assets/visual-tweaks.patch"]
        });

        _r.ready(function(){
            console.log("scene is loaded & patched!")
        });

    </script>
</body>

```