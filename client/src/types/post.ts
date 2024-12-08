export interface Post {
    _id: string;
    title: string;
    description: string
    createdAt: string
  }
  
  export interface PostProps {
    post: Post;
  }

  export interface PostCardProps {
    children: React.ReactNode;
    backgroundColor?: string; 
  }