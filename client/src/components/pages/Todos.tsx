import React, { useState } from 'react';
import useFetch from '../../hooks/useFetch';
import Loading from '../Loading';
import ErrorMessage from '../ErrorMessage';
import { useFilterContext } from '../../contexts/filtersContext';
import Card from '../layout/Card';
import Title from '../layout/Title';
import Paragraph from '../layout/Paragraph';
import { Todo } from '../../types/todo';
import SearchInput from '../layout/SearchInput';
import StatusFilterInput from '../layout/StatusFilterInput';
import Button from '../layout/Button';
import ArrowButton from '../layout/ArrowButton';
import TodoComponent from '../Todo';

const Todos: React.FC = () => {
  const { data: todos, error, isLoading } = useFetch<Todo[]>('todos', '/todos');
  const { query, filters } = useFilterContext();
  const [visibleTodosCount, setVisibleTodosCount] = useState(4);

  if (isLoading) return <Loading />;

  if (error instanceof Error) return <ErrorMessage message={error.message} />;

  const filteredTodos = todos
    ?.filter((todo: Todo) =>
      todo.title.toLowerCase().includes(query.toLowerCase()) ||
      todo.description.toLowerCase().includes(query.toLowerCase())
    )
    ?.filter((todo: Todo) =>
      filters.completed === undefined || filters.completed === '' ? true : todo.completed === filters.completed
    );

  const sortedTodos = filteredTodos?.sort((a: Todo, b: Todo) => {
    if (filters.sort === 'name') return a.title.localeCompare(b.title);
    return 0;
  });

  const visibleTodos = sortedTodos?.slice(0, visibleTodosCount);

  const loadMoreTodos = () => setVisibleTodosCount((prevCount) => prevCount + 4);

  return (
    <div className="p-4">
      <Card>
        <ArrowButton />
        <Title text="All Todos" />
        <Paragraph text="Select a todo to view its details:" />
      </Card>
      <SearchInput />
      <StatusFilterInput />
      {visibleTodos?.map((todo: Todo) => (
        <TodoComponent key={todo._id} todo={todo} />
      ))}
      {visibleTodosCount < (sortedTodos?.length || 0) && (
        <div className="flex justify-center mt-4">
          <Button onClick={loadMoreTodos}>Load more</Button>
        </div>
      )}
    </div>
  );
};

export default Todos;
