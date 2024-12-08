import React from 'react';
import { useParams } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import Loading from '../Loading';
import ErrorMessage from '../ErrorMessage';
import ArrowButton from '../layout/ArrowButton';
import { Post } from '../../types/post';
import { useAuth } from '../../contexts/AuthContext';

const PostDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { token } = useAuth(); 
  const headers = { Authorization: `Bearer ${token}` };
  const { data: post, error, isLoading } = useFetch<Post>('posts', '/posts', id);

  if (isLoading) return <Loading />;
  if (error instanceof Error) return <ErrorMessage message={error.message} />;
  if (!post) return <p>No post found.</p>;

  return (
    <div className="p-4">
      <div className="mt-4 bg-white p-6 rounded-lg h-screen">
        <ArrowButton />
        <h1 className="text-2xl font-semibold mb-4">{post.title}</h1>
        <p className="text-gray-600">
          Created on: {new Date(post.createdAt).toLocaleDateString()}
        </p>
        <div className="mt-6 text-gray-800">{post.description}</div>
      </div>
    </div>
  );
};

export default PostDetails;
