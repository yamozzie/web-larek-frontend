export class catalogView {
    constructor(protected container: HTMLElement) {}
    render(data: { items: HTMLElement[] }) {
        if (data) {
            this.container.append(...data.items)
        }
        return this.container
    }
}