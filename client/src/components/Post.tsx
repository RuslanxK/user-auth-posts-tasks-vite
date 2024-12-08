import React, { useState } from 'react';
import { PostProps } from '../types/post';
import PostCard from './layout/Card';
import { useNavigate } from 'react-router-dom';
import useDelete from '../hooks/useDelete';
import useEdit from '../hooks/useEdit';
import { FaTrash, FaEdit } from 'react-icons/fa';
import Modal from './layout/Model';
import Button from './layout/Button';
import { TitleInput, DescriptionInput } from './layout/Inputs';
import { useFormContext } from '../contexts/formContext';

const Post: React.FC<PostProps> = ({ post }) => {
  const navigate = useNavigate();
  const { title, setTitle, description, setDescription } = useFormContext();

  const deletePost = useDelete('posts');
  const editPost = useEdit<{ title: string; description: string }, PostProps>('posts');

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const openEditModal = () => {
    setTitle(post.title);
    setDescription(post.description);
    setIsEditModalOpen(true);
  };

  const handleDelete = () => {
    deletePost.mutate({ url: `/posts/${post._id}` });
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    editPost.mutate(
      {
        url: `/posts/${post._id}`,
        payload: { title, description },
      },
      {
        onSuccess: () => {
          setIsEditModalOpen(false);
        },
        onError: (error) => {
          console.error('Failed to update post:', error);
        },
      }
    );
  };

  const handleReadMore = () => {
    navigate(`/post/${post._id}`);
  };

  return (
    <>
      <PostCard>
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-gray-800">{post.title}</h2>
            <p className="mt-2 text-text">{post.description}</p>
            <p className="mt-4 text-sm text-gray-500 bg-background w-fit p-2 rounded-lg">
              Created on: {new Date(post.createdAt).toLocaleDateString()} at{' '}
              {new Date(post.createdAt).toLocaleTimeString()}
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <Button onClick={handleReadMore}>Read More</Button>
            <FaEdit
              size={20}
              className="text-blue-500 cursor-pointer"
              onClick={openEditModal}
            />
            <FaTrash
              size={20}
              className="text-red-500 cursor-pointer"
              onClick={handleDelete}
            />
          </div>
        </div>
      </PostCard>

      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
        <form onSubmit={handleEditSubmit}>
          <h2 className="text-xl font-semibold mb-4">Edit Post</h2>
          <TitleInput />
          <DescriptionInput />
          <Button type="submit" color="success">
            {editPost.isLoading ? 'Saving...' : 'Save Changes'}
          </Button>
        </form>
      </Modal>
    </>
  );
};

export default Post;
