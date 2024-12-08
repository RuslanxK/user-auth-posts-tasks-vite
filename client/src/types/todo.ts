export interface Todo {
    _id: string;
    title: string;
    description: string;
    createdAt: string;
    updatedAt?: string;
    completed: boolean
  }
  

  export interface TodoProps {
    todo: {
      _id: string;
      title: string;
      description: string;
      completed: boolean
      createdAt: string;
    };
  }
  