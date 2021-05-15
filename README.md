# CSS Functions  
Add custom functions to your CSS. Add to the built-in list of var(), rgba(), or calc().  
  
This feature is coming to CSS. It's part of the [CSS Houdini API](https://developer.mozilla.org/en-US/docs/Web/Houdini). 
It's not in browsers yet. This repo was inspired by it.
  
**Custom functions look like this:**
```html
<style class="functions">
  body {
    background: random-color();
  }
</style>
```
  
**You can give them params:**
```css
div > p {
  font-size: rand(.8em, 1em, 1.2em);
}
```
  
**Functions will be able to use variables:**
```css
div {
  --morning: false;
}
section {
  --morning: true;
}
div p, section p {
  color: if(--morning, red, blue);
}
```
  
## Why use `custom functions` in CSS?
  
Using CSS selectors to set HTML attributes:
```css
a {
  /** sets target="_blank" on all <a> elements */
  --target: aria("_blank");
  --role: aria("button");
}
```
  
Edit HTML to turn text into spans to animate:
```css
.spooky {
  --delay: animate-letters(.5, 4);
}
.spooky > span {
  animation: spook-text 4s ease-in-out var(--delay) infinite;
}
```
  
Add many media queries options in one line:
```css
body {
  --sizes: width(720px, 1080px);
}
nav {
  display: grid;
  grid-template-columns: switch(--sizes, 
    1fr,                /** 0px - 720px */
    1fr 1fr 1fr,        /** 720px - 1080px */
    1fr 1fr 1fr 1fr);   /** +1080px */
}
```
  
  
## Notes
1. Must be inside a `<style class="functions">` element.
2. `CssPointer` `.apply` is for variables if `var()` is missing.
  
References:  
@/BobobUnicorn, Chrome labs  
