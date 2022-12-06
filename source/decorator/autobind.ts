//decorator is a func
export function autobind(_: any, _1: any, descriptor: PropertyDescriptor) {
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