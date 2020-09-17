import BaseLayout from '@/layouts/BaseLayout';
import { useGetCategories } from '@/apollo/actions';
import withApollo from '../../../hoc/withApollo';
import { getDataFromTree } from '@apollo/react-ssr';
import Link from 'next/link';

const ForumCategories = () => {

  const { data } = useGetCategories();

  const forumCategories = data?.forumCategories || [];

  return (
    <BaseLayout>
      <section className="section-title">
        <div className="px-2">
          <div className="pt-5 pb-4">
            <h1>Categories</h1>
          </div>
        </div>
      </section>
      <section className="fj-category-list">
        <div className="row">
          {forumCategories.map(cat => (
            <div key={cat.slug} className="col-md-4">
              <div className="fj-category-container">
                <Link
                  href="/forum/categories/[slug]"
                  as={`/forum/categories/${cat.slug}`}
                >
                  <a className="fj-category subtle-shadow no-border">
                    {
                      // <div className="category-icon">
                      //   <img src="images/pen.png" />
                      // </div>
                    }
                    <div className="category-information">
                      <div className="heading gray-90">
                        {cat.title}
                      </div>
                      <div className="description">
                        {cat.subTitle}
                      </div>
                    </div>
                  </a>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </BaseLayout>
  )
}

export default withApollo(ForumCategories, { getDataFromTree });