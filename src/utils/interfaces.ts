export interface UserProp {
  id: string;
  createdAt: number;
  name: string;
  email: string | null | undefined;
  phoneNumber: string | null | undefined;
}

export interface GroupProp {
  id: string;
  name: string;
  members: string[];
}

export interface ListProp {
  id: string;
  createdAt: number;
  name: string;
  icon: string;
  color: string;
  group: string;
  author: string;
}

export interface MembersProp {
  id: string;
  role: MemberRole;
  data?: UserProp;
}

export interface TaskProp {
  id: string;
  createdAt: number;
  name: string;
  description: string;
  // date: string;
  // time: string;
  status: "active" | "overdue" | "complete";
  list: string;
  group: string;
}

export interface ProgressProp {
  id: string;
  createdAt: number;
  user: UserProp;
  description: string;
  task: string;
}

type MemberRole = "admin" | "editor" | "member";
