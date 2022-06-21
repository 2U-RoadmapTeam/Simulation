import NotebookData from '../data/notebook.json'

export const mapDataToTasks = (level) => {
    const protData = NotebookData.Notebook.Content.Protocol
    const pages = protData.Sequence

    let taskPages = []

    //Loop through pages, creating each TaskPage
    pages.forEach(page => {
        const tasksData = page.steps
        let tasks = []
        let i = 0;

        tasksData.forEach(task => {
            //Creating letter index
            const index = i

            //
            if (task.levels["l" + level].task !== "") {
                //Creates task objects and adds to tasks array

                tasks.push(new Task({
                    index: index,
                    levels: task.levels,
                    action: task.action,
                    notes: task.notes,
                    criteria: task.criteria,
                    complete: task.complete,
                    aria: task.aria
                }))


                i++
            }
        });
        //Creating new task page and adding to collection
        taskPages.push(new TaskPage({ instruction: page.label, tasks: tasks }))
    });

    setCurrentTask(taskPages)

    return taskPages
}

const setCurrentTask = (taskPages) => {
    let found = false
    if(taskPages.length > 0){

        for(let i = 0; i < taskPages.length; i++) {
            if(found){
                break;
            }
            if(!taskPages[i].complete){
                for(let j = 0; j < taskPages[i].tasks.length; i++){
                    if(!taskPages[i].tasks[j].complete){
                        taskPages[i].tasks[j].current = true;
                        found = true;
                        break;
                    } else {
                        taskPages[i].tasks[j].current = false;
                    }
                }
            }
        }
    }
}

export class Task {
    constructor(data) {
        this.index = data.index;
        this.levels = data.levels;
        this.action = data.action;
        //notes is an array
        this.notes = data.notes;
        this.criteria = data.criteria;
        this.complete = data.complete;
        this.current = false;
        this.aria = data.aria;
    }
}

export class TaskPage {
    constructor(data) {
        this.instruction = data.instruction;
        //tasks is an array
        this.tasks = data.tasks;
        this.complete = data.complete;
    }
}
