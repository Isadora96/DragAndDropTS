import { Component } from './base-component.js';
import { Validatable, validate } from '../util/validation.js';
import { autobind } from '../decorator/autobind.js';
import { projectState } from '../state/project-state.js';

export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
    titleEl: HTMLInputElement;
    descriptionEl:HTMLInputElement;
    peopleEl: HTMLInputElement;
    isvalidEl: NodeListOf<HTMLSpanElement>;

    constructor() {
        super('project-input', 'app', true, 'user-input');

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