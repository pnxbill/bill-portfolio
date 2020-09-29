import BaseLayout from '@/layouts/BaseLayout';
import { useGetTopicsByCategory } from '@/apollo/actions';
import { useRouter } from 'next/router';
import withApollo from '../../../hoc/withApollo';
import { getDataFromTree } from '@apollo/react-ssr';

const Topics = () => {
  const { slug } = useRouter().query;
  const { data } = useGetTopicsByCategory({ variables: { slug } });

  const topicsByCategory = (data && data.topicsByCategory) || [];

  return (
    <BaseLayout>
      <section className="section-title">
        <div className="px-2">
          <div className="pt-5 pb-4">
            <h1>Select a topic</h1>
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
        <div className='reply-controls'>
          <div className="reply-area">
            <div className="reply-to">
              Reply To: <span className="text ml-2">User 1</span>
            </div>
            <div className="fj-editor-input">
              <input
                name="title"
                placeholder="Topic title"
                type="text"></input>
            </div>
            <div className="fj-editor">
              <div className="fj-editor-textarea-wrapper">
                <textarea
                  name="content"
                  placeholder="Type here">
                </textarea>
              </div>
              <div className="fj-editor-preview-wrapper">
                <div className="preview">
                  <p></p>
                </div>
              </div>
            </div>
            <div className="submit-area">
              <div className="send mr-auto">
                <button
                  href="#"
                  className="btn btn-main bg-blue py-2 ttu">Reply</button>
                <a className="btn py-2 ttu gray-10">Cancel</a>
              </div>
              <div>
                <a className="btn py-2 ttu gray-10">hide preview</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </BaseLayout>
  )
}

export default withApollo(Topics, { getDataFromTree });