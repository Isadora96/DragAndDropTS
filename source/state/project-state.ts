import { Project, ProjectStatus} from '../models/project-model';

type Listener<T> = (items: T[]) => void;

class State<T> {
    protected listeners: Listener<T>[] = [];

    addListener(listnerFunc: Listener<T>) {
        //listerFunc = (project) => {}
        this.listeners.push(listnerFunc);
    }
}
// Project State class
export class ProjectState extends State<Project> {
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
        this.updateListeners();
    }

    moveProject(projectId: string, newStatus: ProjectStatus){
        const project = this.projects.find(prj => prj.id === projectId);
        if(project && project.status !== newStatus) {
            project.status = newStatus;
            this.updateListeners();
        }
    }

    private updateListeners() {
        for(const listnerFunc of this.listeners) {
            //pass the array as a copy of the original array.
            listnerFunc(this.projects.slice()); // call the func (project) => {}
        }
    }
}

export const projectState = ProjectState.getIstance(); 
