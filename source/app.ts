class ProjectInput {
    templateElement: HTMLTemplateElement;
    hostElement: HTMLDivElement;
    element: HTMLFormElement;
    titleEl: HTMLInputElement;
    descriptionEl:HTMLInputElement;
    peopleEl: HTMLInputElement;

    constructor() {
        this.templateElement = document.getElementById('project-input')! as HTMLTemplateElement;
        this.hostElement = document.getElementById('app')! as HTMLDivElement;

        const importedNode = document.importNode(this.templateElement.content, true);

        this.element = importedNode.firstElementChild as HTMLFormElement;
        this.element.id = 'user-input';

        this.titleEl = this.element.querySelector('#title') as HTMLInputElement;
        this.descriptionEl = this.element.querySelector('#description') as HTMLInputElement;
        this.peopleEl = this.element.querySelector('#people') as HTMLInputElement;

        this.configure();
        this.attach();
    }

    private submitHandler(event :Event) {
        event.preventDefault();
        console.log(this.titleEl.value);
    }
    private configure() {
        //bind to the class
        this.element.addEventListener("submit", this.submitHandler.bind(this));
    }

    private attach() {
        this.hostElement.insertAdjacentElement('afterbegin', this.element);

    }
}

class ProjectInput2 {
    templateElement: HTMLTemplateElement;
    hostElement: HTMLFormElement;
    element: HTMLLIElement;

    constructor() {
        this.templateElement = document.getElementById('single-project')! as HTMLTemplateElement;
        this.hostElement = document.querySelector('form')! as HTMLFormElement;

        const importedNode = document.importNode(this.templateElement.content, true);

        this.element = importedNode.firstElementChild as HTMLLIElement;
        this.attach();
    }

    private attach() {
        this.hostElement.insertAdjacentElement('afterend', this.element);

    }
}

class Project {
    title: string;
    description: string;
    people: number;
    active: boolean;

    constructor (t: string, d: string, p: number, a: boolean) {
        this.title = t;
        this.description = d;
        this.people = p;
        this.active = a;
    }
}

const prjInput = new ProjectInput();






