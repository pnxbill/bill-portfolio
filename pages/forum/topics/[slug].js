import BaseLayout from '@/layouts/BaseLayout';
import { useGetTopicBySlug, useGetPostsByTopic, useGetUser, useCreatePost } from '../../../apollo/actions';
import { useRouter } from 'next/router';
import withApollo from '../../../hoc/withApollo';
import { getDataFromTree } from '@apollo/react-ssr';
import PostItem from '../../../components/forum/PostItem';
import Replier from '@/components/shared/Replier';
import { useState } from 'react';
import { toast } from 'react-toastify';

const useInitialData = () => {
  const router = useRouter();
  const { slug } = router.query;
  const { data } = useGetTopicBySlug({ variables: { slug } });
  const { data: dataPost } = useGetPostsByTopic({ variables: { slug } });
  const { data: dataUser } = useGetUser();
  const topic = data?.topicBySlug || {};
  const posts = dataPost?.postsByTopic || [];
  const user = dataUser?.user || null;
  return { topic, posts, user };
}

const PostsPage = () => {
  const { topic, posts, user } = useInitialData();

  return (
    <BaseLayout>
      <section className="section-title">
        <div className="px-2">
          <div className="pt-5 pb-4">
            <h1>{topic.title}</h1>
          </div>
        </div>
      </section>
      <Posts
        posts={posts}
        topic={topic}
        user={user}
      />

    </BaseLayout>
  )
}

const Posts = ({ posts, topic, user }) => {
  const [createPost, { error }] = useCreatePost();
  const [isReplierOpen, setReplierOpen] = useState(false);
  const [replyTo, setReplyTo] = useState(null);

  const handleCreatePost = async (reply, resetReplier) => {
    if (replyTo) {
      reply.parent = replyTo._id;
    }

    reply.topic = topic._id;
    await createPost({ variables: reply });
    resetReplier();
    setReplierOpen(false);
    toast.success('Post has been created', { autoClose: 2000 })
  }

  return (
    <section className="mb-5">
      <div className="fj-post-list">
        <PostItem
          post={topic}
          className="topic-post-lead"
        />
        {posts.map(post => (
          <div key={post._id} className="row">
            <div className="col-md-9">
              <PostItem
                post={post}
                canCreate={user !== null}
                onReply={() => {
                  setReplyTo(post?.user?.username || topic.title);
                  setReplierOpen(true);
                }}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="row mt-2 mx-0">
        <div className="col-md-9">
          <div className="posts-bottom">
            {user &&
              <div className="pt-2 pb-2">
                <button
                  className="btn btn-lg btn-outline-primary"
                  onClick={() => {
                    setReplyTo(topic.title);
                    setReplierOpen(true);
                  }}
                >
                  Create New Post
              </button>
              </div>
            }
          </div>
        </div>
      </div>
      <Replier
        isOpen={isReplierOpen}
        replyTo={replyTo}
        onSubmit={handleCreatePost}
        closeBtn={<a
          className="btn py-2 ttu gray-10"
          onClick={() => setReplierOpen(false)}
        >
          Cancel
        </a>
        }
      />
    </section>
  )
}

export default withApollo(PostsPage, { getDataFromTree });