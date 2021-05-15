# CSS Functions  
Add custom functions to your CSS. Add to the built-in list of var(), rgba(), or calc().  
  
This feature is coming to CSS. It's part of the [CSS Houdini API](https://developer.mozilla.org/en-US/docs/Web/Houdini). 
It's not in browsers yet. This repo was inspireed by it.
  
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
  font-size: pick(.8em, 1em, 1.2em);
}
```
  
**Functions will be able to use variables:**
```css
div {
  --num: false;
}
section {
  --num: true;
}
div p, section p {
  color: if(--num, red, blue);
}
```
  
## Notes
1. Must be inside a `<style class="functions">` element.
2. `CssPointer` `.apply` is for variables if `var()` is missing.
  
References:  
@/BobobUnicorn, Chrome labs  
