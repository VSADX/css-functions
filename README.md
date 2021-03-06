# Add functions to CSS (an API)  
  
<br>  
  
This feature is coming to CSS.  It's part of the [CSS Houdini API](https://developer.mozilla.org/en-US/docs/Web/Houdini).  
It's not in browsers yet. This repo was inspired by it.
  
<br>  
  
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
  --semantic: false;
}
section {
  --semantic: true;
}
div p, section p {
  color: if(--semantic, black, red);
}
```
  
## How does it work?
🌌 **What are custom functions?**  
It's a `func()` just like `calc()` or `rgb()`, inside your CSS.  
    

🌄 **What does it do?**  
Custom functions have two important purposes.
1. It can help you write less complicated CSS.
2. It adds wholey new features to CSS.
When you use a custom function, the function generates additional 
CSS, small or large, as long as that custom function is defined in 
JS using this API. 
  
🌆 **How does it work?**  
This JavaScript library doesn't add any specific functions, but provides an API 
to allow you to create your own - or use others. By default, it only generates 
CSS, so running your custom functions won't create expensive JS payloads.  
It works by scanning your document for `<style>` elements that have `class="functions"`.
  
<br>  
  

## Why use custom functions in CSS?
  
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
  
## Writing a custom function for your CSS
**Import `customFunctions` then `.add(fn)` the new function.**
```js
import { customFunctions } from "css-functions.js"

customFunctions.add(pointer => {
  const color_choices = ["red","blue","green"]
  const num = Math.floor(Math.random() * color_choices.length)
  return color_choices[num]
}, "random-color")
```
This adds the `color: random-color();` function. It can be used 
anywhere in CSS that takes a color name.
  
**The `pointer` parameter.**
When you add a function, that code will run anytime you use the function in CSS!  
Your function will get passed one parameter. It's a `CssPointer` from the `css-helper-class.js` 
file.  
  
Take a look at the file, or download to see how it works.
  
## Writing advanced CSS functions *shouldn't be hard*.
When your function runs, the CssPointer has key details on your CSS where your function was called. 
Here's the properties:  
1. `.selector` like `.card header h3`
2. `.property` the property name where you used your function `font-size`
3. `.elements` the elements on the page that match the selector
4. `.params` a list of params passed to your function if `rgb(12, 200, 30)` then `["12", "200", "30"]`
5. `.placeholder` **not often needed** this is the generated CSS variable that will replace your function.
  
Notes: 
1. Must be inside a `<style class="functions">` element.
2. `CssPointer` `.apply` is for variables if `var()` is missing.
  
References:  
@/BobobUnicorn, Chrome labs  
