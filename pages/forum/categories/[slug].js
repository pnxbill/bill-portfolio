import BaseLayout from '@/layouts/BaseLayout';
import { useGetTopicsByCategory, useGetUser } from '@/apollo/actions';
import { useRouter } from 'next/router';
import withApollo from '../../../hoc/withApollo';
import { getDataFromTree } from '@apollo/react-ssr';
import Replier from '@/components/shared/Replier';
import { useState } from 'react';

const Topics = () => {
  const [isReplierOpen, setReplierOpen] = useState(false);
  const { slug } = useRouter().query;
  const { data } = useGetTopicsByCategory({ variables: { slug } });
  const { data: dataUser } = useGetUser();
  const user = dataUser?.user;

  const topicsByCategory = (data && data.topicsByCategory) || [];

  return (
    <BaseLayout>
      <section className="section-title">
        <div className="px-2">
          <div className="pt-5 pb-4">
            <h1>Select a topic</h1>
            {user &&
              <button className="btn btn-primary" onClick={() => setReplierOpen(true)}>
                Create Topic
              </button>
            }
          </div>
        </div>
      </section>
      <section className="fj-topic-list">
        <table className="table table-hover ">
          <thead>
            <tr>
              <th scope="col">Topic</th>
              <th scope="col">Category</th>
              <th scope="col">Author</th>
              {/* <th scope="col">Replies</th> */}
            </tr>
          </thead>
          <tbody>
            {topicsByCategory.map(topic => (
              <tr key={topic._id}>
                <th>{topic.title}</th>
                <td className="category">{topic.forumCategory.title}</td>
                <td>{topic.user.username}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      <Replier isOpen={isReplierOpen} />
    </BaseLayout>
  )
}

export default withApollo(Topics, { getDataFromTree });