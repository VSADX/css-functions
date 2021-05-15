export const customFunctions = {
    /** 
     * @private
     * @type {[() => void]}
     */
    functions: [],
    /** 
     * @param {(str = "", is_new_style_sheet = false, style_sheet: HTMLStyleElement) => str} func 
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
 * WARN: **The cb function spec is not approved.**
 * - predicate provided parameters: failed approval
 * - predicate expected return: failed approval
 * - tuple objects must be converted to classes  
 *   
 * NOTES: *Create a class as an options object*
 * - provide class objects as predicate params
 * - add helper methods to class objects (see 1.1 css-functions.js)
 *   
 * @version ALPHA 1.2.0.0
 * @param {HTMLStyleElement} style 
 * @param {{regex: RegExp}} fn 
 * @param {number} start 
 */
function execute(style, fn, start) {
    const parts = fn.regex.exec(style.innerHTML.substr(start))
    if(!parts) return false

    const content = parts[3]
    const css_var = fn(content, { style, start, parts })
    
    const old_end = start + parts.index + parts[0].length 
    const insert = `${style.innerHTML.substr(0, start + parts.index)}var(${css_var});`
    
    style.innerHTML = `${insert}${style.innerHTML.substr(old_end)}`
    
    return insert.length
}
