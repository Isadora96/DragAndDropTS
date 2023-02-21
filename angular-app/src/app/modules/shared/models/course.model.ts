export class Course {
    constructor(
        public title: string,
        public description: string,
        public people: number
    ) {}
}

export class CourseUpdate {
    constructor(
        public id: string,
        public title: string,
        public description: string,
        public people: number,
        public status: string
    ) {}
}