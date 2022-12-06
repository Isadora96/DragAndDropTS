import { Component } from './base-component';
import { autobind } from '../decorator/autobind';
import { Project, ProjectStatus } from '../models/project-model';
import { ProjectItem } from './project-item';
import { projectState } from '../state/project-state';
import { DragTarget } from '../models/drag-drop-interfaces';

export class ProjectList extends Component<HTMLDivElement, HTMLElement> implements DragTarget {
    assignedProjects: Project[];

    constructor(private type: 'active' | 'finished') {
        super('project-list', 'app', false, `${type}-projects`);
        this.assignedProjects = [];

        this.configure();
        this.renderContent();
    }

    private renderProjects() {
        const listEl = document.getElementById(`${this.type}-project-list`)! as HTMLUListElement;

        listEl.innerHTML = '';
        for(const prjItem of this.assignedProjects){
            new ProjectItem(this.element.querySelector('ul')!.id, prjItem);
        }
    }

    @autobind
    dragOverHandler(event: DragEvent): void {
        if(event.dataTransfer && event.dataTransfer.types[0] === 'text/plain') {
            event.preventDefault();
            const liEl = this.element.querySelector('ul')!;
            liEl.classList.add('droppable');
        }
    }

    @autobind
    dropHandler(event: DragEvent): void {
        const prjId = event.dataTransfer!.getData('text/plain');
        projectState.moveProject(prjId, this.type === 'active' ? ProjectStatus.Active : ProjectStatus.Finished);
    }

    @autobind
    dragLeaveHandler(_: DragEvent): void {
        const liEl = this.element.querySelector('ul')!;
        liEl.classList.remove('droppable');
    }

    configure(): void {
        this.element.addEventListener('dragover', this.dragOverHandler);
        this.element.addEventListener('dragleave', this.dragLeaveHandler);
        this.element.addEventListener('drop', this.dropHandler);

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
