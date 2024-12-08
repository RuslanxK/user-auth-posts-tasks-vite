import React from 'react';
import { TodoProps } from '../types/todo';
import TodoCard from './layout/Card';
import Button from './layout/Button';
import useEdit from '../hooks/useEdit';

const Todo: React.FC<TodoProps> = ({ todo }) => {
  const { mutate, isLoading } = useEdit<{ completed: boolean }, void>('todos');

  const handleClick = () => {
    mutate({
      url: `/todos/${todo._id}`,
      payload: { completed: !todo.completed },
    });
  };

  return (
    <TodoCard>
      <div className="flex items-end justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-gray-800">{todo.title}</h2>
          <p className="mt-2 text-text">{todo.description}</p>
          <p className="mt-4 text-sm text-gray-500 bg-background w-fit p-2 rounded-lg">
            Created on: {new Date(todo.createdAt).toLocaleDateString()} at{' '}
            {new Date(todo.createdAt).toLocaleTimeString()}
          </p>
        </div>
        <div>
          <Button
            onClick={handleClick}
            disabled={isLoading}
            color={todo.completed ? 'success' : 'danger'}
          >
            {todo.completed ? 'Completed' : 'Complete'}
          </Button>
        </div>
      </div>
    </TodoCard>
  );
};

export default Todo;
