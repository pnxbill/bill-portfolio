import BaseLayout from '@/layouts/BaseLayout';
import { useGetTopicBySlug, useGetPostsByTopic } from '../../../apollo/actions';
import { useRouter } from 'next/router';
import withApollo from '../../../hoc/withApollo';
import { getDataFromTree } from '@apollo/react-ssr';
import PostItem from '../../../components/forum/PostItem';

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
              <PostItem post={post} />
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default withApollo(PostsPage, { getDataFromTree });