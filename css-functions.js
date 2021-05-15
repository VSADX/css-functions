import { CssPointer } from "./css-helper-class.js"

export const customFunctions = {
    /** 
     * @private
     * @type {[() => void]}
     */
    functions: [],
    /** 
     * @param {(pointer: CssPointer) => void} func 
     * @param {string} optional_name
     * #param {boolean} global_or_parameterized 
     */
    add(func, optional_name = "") {
        func.regex = new RegExp(`(;|,|\\b)${optional_name || func.name}\\s*\\(\\s*(['"]?)(.+?)\\2\\s*\\)(;|,|!|\\b|$)`)
        this.functions.push(func)
    },
    run(doc = document) {
        doc.querySelectorAll("style.functions").forEach(style => {
            this.functions.forEach(fn => {
                do var start = execute(style, fn, start) 
                while(start)
            })
        })
    }
}
customFunctions.run()

/**
 * execute()
 * -
 * - look at a part of a stylesheet to see if a function is used in it.
 * - if found, run the function assoc.'d.
 * - use CSS var(--) pointers to allow for slotted / computed CSS values.
 *   
 * @version ALPHA 1.5.0.0
 * @param {HTMLStyleElement} style 
 * @param {{regex: RegExp}} fn 
 * @param {number} start 
 */
function execute(style, fn, start = 0) {
    const parts = fn.regex.exec(style.innerHTML.substr(start))
    if(!parts) return false

    const pointer = new CssPointer(style, parts, start)
    const {key, end, index} = pointer.private
    
    const result = fn(pointer)
    if(result) pointer.private.set(result)
    
    const insert = `${style.innerHTML.substr(0, index)}var(${key});`
    style.innerHTML = `${insert}${style.innerHTML.substr(end)}`
    return insert.length
}
