import React from 'react';
import axios from 'axios';
import { useQuery } from 'react-query';

interface Post {
    userId: number;
    id: number;
    title: string;
    body: string;
}

const fetchPosts = async (): Promise<Post[]> => {
    const { data } = await axios.get(
        'https://jsonplaceholder.typicode.com/posts'
    );
    return data;
};

const PostsList: React.FC = () => {
    const {
        data: posts,
        error,
        isLoading,
    } = useQuery<Post[]>('posts', fetchPosts);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {(error as Error).message}</div>;
    }

    return (
        <div>
            <h1>Posts</h1>
            <ul>
                {posts?.map((post) => (
                    <li key={post.id}>
                        <h2>{post.title}</h2>
                        <p>{post.body}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PostsList;
