//Component -> abstract classes can't be iniate
export abstract class Component<T extends HTMLElement, U extends HTMLElement> {
    templateElement: HTMLTemplateElement;
    hostElement: T;
    element: U;

    constructor(
        templateId: string,
        hostElementId: string,
        inserAtStart: boolean,
        newElementId?: string
    ) {
        this.templateElement = document.getElementById(templateId)! as HTMLTemplateElement;
        this.hostElement = document.getElementById(hostElementId)! as T; 

        const importedNode = document.importNode(this.templateElement.content, true);

        this.element = importedNode.firstElementChild as U;
        if(newElementId) {
            this.element.id = newElementId;
        }

        this.attach(inserAtStart);
    }

    private attach(inserAtBeginning: boolean) {
        this.hostElement.insertAdjacentElement(inserAtBeginning ? 'afterbegin' : 'beforeend', this.element);
    }

    //force the other class to add this method
    abstract configure(): void;
    abstract renderContent(): void;
}
