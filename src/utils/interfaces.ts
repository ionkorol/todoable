export interface UserProp {
  id: string;
  createdAt: string;
  name: string;
  email: string;
  groups: string;
  selectedGroup: string;
}

export interface TaskProp {
  id: string;
  createdAt: number;
  name: string;
  description: string;
  // date: string;
  // time: string;
  list: string;
  status: "active" | "overdue" | "complete";
  progress: TaskProgressProp[];
}

export interface TaskProgressProp {
  id: string;
  createdAt: number;
  user: UserProp;
  description: string;
}

export interface ListProp {
  id: string;
  createdAt: number;
  name: string;
  group: string;
  tasks: TaskProp[];
}

export interface GroupProp {
  id: string;
  name: string;
  members: UserProp[];
  lists: ListProp[];
}
