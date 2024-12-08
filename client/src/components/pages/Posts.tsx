import React, { useState } from 'react';
import useFetch from '../../hooks/useFetch';
import Post from '../Post';
import Loading from '../Loading';
import ErrorMessage from '../ErrorMessage';
import { useFilterContext } from '../../contexts/filtersContext';
import Card from '../layout/Card';
import Title from '../layout/Title';
import Paragraph from '../layout/Paragraph';
import { Post as PostType } from '../../types/post';
import SearchInput from '../layout/SearchInput';
import DateInput from '../layout/DateInput';
import { isSameDay } from '../../utils/dateUtils';
import Button from '../layout/Button';
import ArrowButton from '../layout/ArrowButton';
import FixedButton from '../layout/FixedButton';
import Modal from '../layout/Model';
import { TitleInput, DescriptionInput } from '../layout/Inputs';
import { useFormContext } from '../../contexts/formContext';
import useAdd from '../../hooks/useAdd';

const Posts: React.FC = () => {
  const { data: posts, error, isLoading } = useFetch<PostType[]>('posts', '/posts');
  const { query, filters } = useFilterContext();
  const { title, description, setTitle, setDescription } = useFormContext();
  const [visiblePostsCount, setVisiblePostsCount] = useState(4);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const addPost = useAdd<{ title: string; description: string }, PostType>('posts');

  const openAddPostModal = () => {
    setTitle('');
    setDescription('');
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addPost.mutate(
      { url: '/posts', payload: { title, description } },
      {
        onSuccess: () => {
          setTitle('');
          setDescription('');
          setIsModalOpen(false);
        },
        onError: (error) => {
          console.error('Failed to create post:', error);
        },
      }
    );
  };

  if (isLoading) return <Loading />;
  if (error instanceof Error) return <ErrorMessage message={error.message} />;

  const filteredPosts = posts
    ?.filter((post: PostType) =>
      post.title.toLowerCase().includes(query.toLowerCase())
    )
    ?.filter((post: PostType) =>
      !filters.date || isSameDay(post.createdAt, filters.date)
    );

  const sortedPosts = filteredPosts?.sort((a: PostType, b: PostType) => {
    if (filters.sort === 'name') return a.title.localeCompare(b.title);
    if (filters.sort === 'date')
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    return 0;
  });

  const visiblePosts = sortedPosts?.slice(0, visiblePostsCount);
  const loadMorePosts = () => setVisiblePostsCount((prevCount) => prevCount + 4);

  return (
    <div className="p-4">
      <Card>
        <ArrowButton />
        <Title text="All Posts" />
        <Paragraph text="Select a post to view its details:" />
      </Card>
      <SearchInput />
      <DateInput />
      {visiblePosts?.map((post: PostType) => (
        <Post key={post._id} post={post} />
      ))}

      {visiblePostsCount < (sortedPosts?.length || 0) && (
        <div className="flex justify-center mt-4">
          <Button onClick={loadMorePosts}>Load more</Button>
        </div>
      )}

      <FixedButton onClick={openAddPostModal} />
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <form onSubmit={handleSubmit}>
          <Title text="Create Post" />
          <TitleInput />
          <DescriptionInput />
          <Button type="submit" color="success">
            {addPost.isLoading ? 'Loading...' : 'Submit'}
          </Button>
        </form>
      </Modal>
    </div>
  );
};

export default Posts;
