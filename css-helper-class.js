function match_any(string, chars = [""], fn = "".indexOf) {
    const [matcher, index] = chars.map(letter => 
            [letter, fn.call(string, letter)])
        .sort((a, b) => 
            b[1] - a[1])[0]
    return index + matcher.length
}

export class CssPointer {
    /**
     * @version ALPHA 1.1.0.0
     * @param {string} content 
     * @param {HTMLStyleElement} style 
     * @param {RegExpExecArray} parts 
     * @param {number} start 
     * @param {Document} doc 
     */
    constructor(style, parts, start, doc = document) {
        /** @private */
        this.private = {
            style_text: style.innerHTML,
            index: start + parts.index,
            key: `--css-${Math.random() * 1e9 | 0}`,
            content: parts[3], 
            end: start + parts.index + parts[0].length,
            
            set(val) {
                this.doc.documentElement.style.setProperty(this.key, val)
            },

            style, parts, start, doc
        }
    }
    get placeholder() {
        return this.private.key
    }
    get params() {
        return this.private.content.split(",").map(str => str.trim())
    }
    get selector() {
        const end = this.private.style_text.lastIndexOf("{", this.private.index)
        const looking_start = this.private.style_text.substr(0, end)
        const start = match_any(looking_start, ["}", "*/"], "".lastIndexOf)
        
        return this.private.style_text.substring(start, end).trim()
    }
    get property() {
        const end = this.private.style_text.substr(0, this.private.index).lastIndexOf(":")
        const looking_start = this.private.style_text.substr(0, this.private.index)
        const start = match_any(looking_start, ["{", "*/", ";", "\n"], "".lastIndexOf)
        
        return this.private.style_text.substring(start, end).trim()
    }
    get elements() {
        return this.private.doc.querySelectorAll(this.selector)
    }
    apply(lookup_key = "", values = [""], matcher = () => {}) {
        const discovered = {}

        this.elements.forEach(el => {
            const val = getComputedStyle(el).getPropertyValue(lookup_key).trim()
            if(discovered[val]) return
            else discovered[val] = true

            values.forEach((v, i) => matcher(v, i, val, this.placeholder))
        })
    }
}
