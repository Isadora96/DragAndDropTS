const titleEl = document.getElementById('title') as HTMLInputElement;
const descriptionEl = document.getElementById('description') as HTMLInputElement;
const peopleEl = document.getElementById('people') as HTMLInputElement;
const isvalidEl = document.querySelectorAll('.is-valid') as NodeList;
const ulEl = document.querySelector('ul') as HTMLElement;
const check = document.querySelector('#check') as HTMLInputElement;

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

const projectForm = document.querySelector('form')!;
projectForm.addEventListener('submit', event => {
    event.preventDefault();
    const title = titleEl.value;
    const description = descriptionEl.value;
    const people = +peopleEl.value;
    const active = check.checked;

    if(!title && !description && !people){
        isvalidEl.forEach((el: any) => {
            el.textContent = 'Please provide a valid input value!!!'
        });
        return;
    }
    const newCourse = new Project(title, description, people, active);

    Object.values(newCourse).forEach((el: any) => {
        const li = document.createElement('li');
        li.innerHTML = el;
        ulEl.appendChild(li);
    })
    localStorage.setItem('items', JSON.stringify(newCourse));
    titleEl.value = ''
    descriptionEl.value = ''
    peopleEl.value = ''
    
})

let items = JSON.parse(localStorage.getItem('items')! as string);
if(items){
    Object.values(items).forEach((el: any) => {
        const li = document.createElement('li');
        li.innerHTML = el;
        ulEl.appendChild(li);
    })
}
