import _ from 'lodash'

function eventPrint (e: Event) {
    console.log(e, _.now())
}

// interface Event {
//     argument: any
// }

// interface myEvent extends Event {
//     arguments ?: any
// }

declare global {
    interface Event {
        arguments ?: any
    }
}

function rewrite (type: string) {
    type = type.toLowerCase()
    const origin = (window.history as any)[type]
    return function (...args: any[]) {
        const result = origin.apply(this, args)
        const e = new Event(type)
        e.arguments = args
        window.dispatchEvent(e)
        return result
    }
}

window.addEventListener('load', eventPrint)

window.addEventListener('beforeunload', eventPrint)

window.addEventListener('pageshow', eventPrint)

window.addEventListener('pagehide', eventPrint)

window.addEventListener('hashchange', eventPrint)

window.addEventListener('popstate', eventPrint)

// pushstate和replaceState不会触发popstate,所以需要自定义
window.history.pushState = rewrite('pushState')
window.history.pushState = rewrite('replaceState')
window.addEventListener('pushstate', eventPrint)
window.addEventListener('replaceState', eventPrint)

document.addEventListener('visibilitychange', eventPrint)
