import BaseLayout from '@/layouts/BaseLayout';
import { useGetTopicBySlug, useGetPostsByTopic } from '../../../apollo/actions';
import { useRouter } from 'next/router';
import withApollo from '../../../hoc/withApollo';
import { getDataFromTree } from '@apollo/react-ssr';
import PostItem from '../../../components/forum/PostItem';
import Replier from '@/components/shared/Replier';
import { useState } from 'react';

const useInitialData = () => {
  const router = useRouter();
  const { slug } = router.query;
  const { data } = useGetTopicBySlug({ variables: { slug } });
  const { data: dataPost } = useGetPostsByTopic({ variables: { slug } });
  const topic = data?.topicBySlug || {};
  const posts = dataPost?.postsByTopic || [];
  return { topic, posts };
}

const PostsPage = () => {
  const { topic, posts } = useInitialData();

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
      />

    </BaseLayout>
  )
}

const Posts = ({ posts, topic }) => {
  const [isReplierOpen, setReplierOpen] = useState(false);
  const [replyTo, setReplyTo] = useState("");

  return (
    <section>
      <div className="fj-post-list">
        <PostItem
          post={topic}
          className="topic-post-lead"
        />
        {posts.map(post => (
          <div key={post._id} className="row">
            <div className="col-md-9">
              <PostItem post={post} onReply={() => {
                setReplyTo(post?.user?.username);
                setReplierOpen(true);
              }} />
            </div>
          </div>
        ))}
      </div>
      <Replier
        isOpen={isReplierOpen}
        replyTo={replyTo}
        onSubmit={() => { }}
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