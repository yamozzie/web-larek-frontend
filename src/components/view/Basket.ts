export class BasketView {
    constructor(protected container: HTMLElement) {}
    render(data: { items: HTMLElement[] }) {
        if (data) {
            this.container.replaceChildren(...data.items)
        }
        return this.container
    }
}