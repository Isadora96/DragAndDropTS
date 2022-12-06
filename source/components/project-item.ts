import { Component } from './base-component.js';
import { autobind } from '../decorator/autobind.js';
import { Project } from '../models/project-model.js';
import { Draggable } from '../models/drag-drop-interfaces.js';

export class ProjectItem extends Component<HTMLUListElement, HTMLLIElement> implements Draggable {
    private project: Project;

    get persons() {
        if(this.project.people === 1) {
            return '1 person';
        }
        return `${this.project.people} persons`;
    }
    constructor(hostId: string, project: Project) {
        super('single-project', hostId, false, project.id);
        this.project = project;

        this.configure();
        this.renderContent();
    }

    configure(): void {
        this.element.addEventListener('dragstart', this.dragStartHandler);
    }

    renderContent(): void {
        this.element.querySelector('h2')!.textContent = this.project.title;
        this.element.querySelector('h3')!.textContent = this.persons + ' assigned';
        this.element.querySelector('p')!.textContent = this.project.description;
    }

    @autobind
    dragStartHandler(event: DragEvent): void {
        event.dataTransfer!.setData('text/plain', this.project.id);
        event.dataTransfer!.effectAllowed = 'move';
    }

    dragEndHandler(_: DragEvent): void {
        
    }
}