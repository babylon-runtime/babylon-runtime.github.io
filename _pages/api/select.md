---
title: "_r.select"
layout: single
toc : true
permalink: /api/select/
sidebar:
   nav: "docs"  
---

## Keywords

keyword | description
--- | ---
`*` | ignore all characters. It could be 0 or many.<br>(example: `*tree*`)
`:filterType` | ignore all but this type of element. Available filters:<br>`:material`, `:mesh`, `:light`, `:camera`<br>(example: `*:material`)
`,` | separate multiple search terms<br>(example: `*tree*, *leaves`)