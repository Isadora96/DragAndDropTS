class ProjectInput {
    templateElement: HTMLTemplateElement;
    hostElement: HTMLDivElement;
    element: HTMLFormElement;

    constructor() {
        this.templateElement = document.getElementById('project-input')! as HTMLTemplateElement;
        this.hostElement = document.getElementById('app')! as HTMLDivElement;

        const importedNode = document.importNode(this.templateElement.content, true);

        this.element = importedNode.firstElementChild as HTMLFormElement;
        this.attach();
    }

    private attach() {
        this.hostElement.insertAdjacentElement('afterbegin', this.element);

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
const titleEl = prjInput.element.querySelector('#title') as HTMLInputElement;
const descriptionEl = prjInput.element.querySelector('#description') as HTMLInputElement;
const peopleEl = prjInput.element.querySelector('#people') as HTMLInputElement;
const isvalidEl = prjInput.element.querySelector('.is-valid') as unknown as NodeList;
const ulEl = prjInput.element.querySelector('ul') as HTMLElement;
const check = prjInput.element.querySelector('#check') as HTMLInputElement;

prjInput.element.addEventListener('submit', event => {
    event.preventDefault();
    const title = titleEl.value;
    const description = descriptionEl.value;
    const people = +peopleEl.value;
    const active = check.checked;

    // if(!title && !description && !people){
    //     isvalidEl.forEach((el: any) => {
    //         el.textContent = 'Please provide a valid input value!!!'
    //     });
    //     return;
    // }
    const newCourse = new Project(title, description, people, active);

    // Object.values(newCourse).forEach((el: any) => {
    //     const li = prjInput.element.querySelector('li')! as HTMLLIElement;
    //     const ht = prjInput.element.querySelector('#single-project') as HTMLTemplateElement;
    //     li.innerHTML = el;
    //     ht.appendChild(li);
    // })
    // localStorage.setItem('items', JSON.stringify(newCourse));
    // titleEl.value = ''
    // descriptionEl.value = ''
    // peopleEl.value = ''
    
})

// let items = JSON.parse(localStorage.getItem('items')! as string);
// if(items){
//     Object.values(items).forEach((el: any) => {
//         const li = document.createElement('li');
//         li.innerHTML = el;
//         ulEl.appendChild(li);
//     })
// }



