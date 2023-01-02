export enum ItemStatus {
  open = "open",
  inProgress = "in progress",
  review = "review",
  completed = "done",
}

interface IBaseEntity {
  createdAt: Date;
  _id: string;
}

export interface IItem {
  text: string;
  id: number;
  status: ItemStatus;
}

export interface ITasksColumn {
  name: string;
  id: string;
  items: ITask[];
}

//
export interface IUser extends IBaseEntity {
  email: string;
  password: string;
}

//
export interface IProject extends IBaseEntity {
  name: string;
  columns: IColumn[];
  tasksCount: number;
}

//
export interface IColumn extends IBaseEntity {
  name: string;
  project: IProject;
  tasks: ITask[];
}

//
export interface ITask extends IBaseEntity {
  text: string;
  deadline: Date;
  column: string;
  index: number;
  completed: boolean;
}

//
export interface IEvent extends IBaseEntity {
  name: string;
  date: string;
  time: string;
}
