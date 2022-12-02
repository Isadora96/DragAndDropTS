enum ProjectStatus { Active, Finished }

class Project {
    constructor(
        public id: string, 
        public title: string,
        public description: string,
        public people: number,
        public status: ProjectStatus
    ) {}
}

type Listener<T> = (items: T[]) => void;

class State<T> {
    protected listeners: Listener<T>[] = [];

    addListener(listnerFunc: Listener<T>) {
        //listerFunc = (project) => {}
        this.listeners.push(listnerFunc);
    }
}
// Project State class
class ProjectState extends State<Project> {
    private projects: Project[] = [];
    private static instance: ProjectState;

    private constructor () { super() }

    static getIstance() {
        if(this.instance) { return this.instance;}
        this.instance = new ProjectState();
        return this.instance;
    }

    addProject(title: string, description: string, numOfPeople: number) {
        const newProject = new Project(
            Math.random().toString(),
            title,
            description,
            numOfPeople,
            ProjectStatus.Active
        );
        this.projects.push(newProject);
        for(const listnerFunc of this.listeners) {
            //pass the array as a copy of the original array.
            listnerFunc(this.projects.slice()); // call the func (project) => {}
        }
    }
}

const projectState = ProjectState.getIstance(); 

//decorator is a func
function autobind(target: any, methodName: any, descriptor: PropertyDescriptor) {
    //target = ProjectInput Class
    //methodName = 'submitHandler'
    //descriptor = object
    //descriptor.value = function submitHandler(event) { event.preventDefault(); console.log(this.titleEl.value); }

    const originalMethod = descriptor.value;
    const adjDescriptor: PropertyDescriptor = {
        configurable: true,
        get() {
            //boundFn = function submitHandler() { [native code] }
            //this = ProjectInput clsss
            const boundFn = originalMethod.bind(this);
            return boundFn;
        }
    };
    return adjDescriptor;
}

interface Validatable {
    value: string | number;
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number;
}

function validate(validatableInput: Validatable) {
    let isValid = true;
    if(validatableInput.required) {
        isValid = isValid && validatableInput.value.toString().trim().length !== 0;
    }

    //!= null check both undefined and null values
    if(validatableInput.minLength != null && typeof validatableInput.value === 'string') {
        isValid = isValid && validatableInput.value.length >= validatableInput.minLength;
    }

    if(validatableInput.maxLength != null && typeof validatableInput.value === 'string') {
        isValid = isValid && validatableInput.value.length <= validatableInput.maxLength;
    }

    if(validatableInput.min != null && typeof validatableInput.value === 'number') {
        isValid = isValid && validatableInput.value >= validatableInput.min;
    }

    if(validatableInput.max != null && typeof validatableInput.value === 'number') {
        isValid = isValid && validatableInput.value <= validatableInput.max;
    }

    return isValid;
}

//Component -> abstract classes can't be iniate
abstract class Component<T extends HTMLElement, U extends HTMLElement> {
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
        this.hostElement = document.querySelector(hostElementId)! as T; 

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

class ProjectInput extends Component<HTMLDivElement , HTMLFormElement> {
    titleEl: HTMLInputElement;
    descriptionEl:HTMLInputElement;
    peopleEl: HTMLInputElement;
    isvalidEl: NodeListOf<HTMLSpanElement>;

    constructor() {
        super('project-input', '#app', true, 'user-input');

        this.titleEl = this.element.querySelector('#title') as HTMLInputElement;
        this.descriptionEl = this.element.querySelector('#description') as HTMLInputElement;
        this.peopleEl = this.element.querySelector('#people') as HTMLInputElement;
        this.isvalidEl = this.element.querySelectorAll('span') as NodeListOf<HTMLSpanElement>;

        this.configure();
    }

    configure() {
        this.element.addEventListener("submit", this.submitHandler);
    }

    renderContent(): void {}

    private gatherUserInput(): [string, string, number] | void {
        const enteredTitle = this.titleEl.value;
        const enteredDescription = this.descriptionEl.value;
        const enteredPeople = this.peopleEl.value;
        const isvalid = this.isvalidEl;

        const titleValidatable: Validatable = {
            value: enteredTitle,
            required: true,
            minLength: 3
        };

        const descriptionValidatable: Validatable = {
            value: enteredDescription,
            required: true,
            minLength: 5
        };

        const peopleValidatable: Validatable = {
            value: enteredPeople,
            required: true,
            min: 1,
            max: 5
        };

        if(!validate(titleValidatable) || !validate(descriptionValidatable) || !validate(peopleValidatable))
        {
            isvalid.forEach((el) => {
                if(el.getAttribute('id') === 'titleSpan' && enteredTitle.length === 0) {
                    el.innerHTML = 'Invalid input, please try again!!!';
                }else if(el.getAttribute('id') === 'titleSpan' && enteredTitle.length < 5) {
                    el.innerHTML = 'Text must have at least 5 letters!!!';
                }else if(el.getAttribute('id') === 'descriptionSpan' && enteredDescription.length === 0) {
                    el.innerHTML = 'Invalid input, please try again!!!';
                }else if(el.getAttribute('id') === 'descriptionSpan' && enteredDescription.length < 5) {
                    el.innerHTML = 'Text must have at least 5 letters!!!';
                } else if(el.getAttribute('id') === 'peopleSpan' && +enteredPeople < 1) {
                    el.innerHTML = 'You need at least 1 person!!!';
                } else {
                    el.innerHTML = '';
                }
            });
            return;
        } else {
            isvalid.forEach((el) => el.innerHTML = '');
            return [enteredTitle, enteredDescription, +enteredPeople];
        }
    }

    private clearInputs() {
        this.titleEl.value = '';
        this.descriptionEl.value = '';
        this.peopleEl.value = '';
    }

    @autobind
    private submitHandler(event :Event) {
        event.preventDefault();
        const userInput = this.gatherUserInput();
        if(Array.isArray(userInput)) {
            const [title, desc, people] = userInput;
            projectState.addProject(title, desc, people)
            localStorage.setItem('items', JSON.stringify(userInput));
            this.clearInputs();
        }
    }

}

class ProjectList extends Component<HTMLDivElement, HTMLElement> {
    assignedProjects: Project[];

    constructor(private type: 'active' | 'finished') {
        super('project-list', '#app', false, `${type}-projects`);
        this.assignedProjects = [];

        this.configure();
        this.renderContent();
    }

    private renderProjects() {
        const listEl = document.getElementById(`${this.type}-project-list`)! as HTMLUListElement;

        listEl.innerHTML = '';
        for(const prjItem of this.assignedProjects){
            const newProjItem = Object.entries(prjItem).filter(key => key[0] !== 'id' && key[0] !== 'status');
            newProjItem.forEach((el: any) => {
                    const liEl = document.createElement('li')! as HTMLLIElement;
                    liEl.innerHTML = el[1];
                    listEl?.appendChild(liEl);
            })
        }
    }

    configure(): void {
        projectState.addListener((project: any[]) => {
            const relevantProjects = project.filter(proj => {
                if(this.type === 'active'){
                    return proj.status === ProjectStatus.Active
                }
                return proj.status === ProjectStatus.Finished
            })
            //project = this.projects
            this.assignedProjects = relevantProjects;
            this.renderProjects();
        })
    }

    renderContent() {
        const listId = `${this.type}-project-list`;
        this.element.querySelector('ul')!.id = listId;
        this.element.querySelector('h2')!.textContent = this.type.toUpperCase() + ' PROJECTS';
    }

}

const prjInput = new ProjectInput();
const activePrjList = new ProjectList('active');
const finishedPrjList = new ProjectList('finished');
