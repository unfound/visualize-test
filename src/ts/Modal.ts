export default class Modal {
    dom: HTMLDivElement
    private static modalNum = 0

    constructor () {
        Modal.modalNum++
        const dom = document.createElement('div')
        dom.classList.add('u-modal-mask')
        dom.classList.add('no-mask')
        dom.style.display = 'none'
        dom.style.zIndex = 1000 + Modal.modalNum + ''

        const container = document.createElement('div')
        container.classList.add('u-modal')
        container.style.height = '60px'
        container.textContent = '啦啦啦啦啦'

        dom.appendChild(container)
        document.body.appendChild(dom)
        this.dom = dom
    }

    show () {
        this.dom.style.display = 'block'
    }

    close () {
        this.dom.style.display = 'none'
    }

    destroy () {
        document.body.removeChild(this.dom)
        Modal.modalNum--
    }
}
