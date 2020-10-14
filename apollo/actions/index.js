import { GET_PORTFOLIOS, UPDATE_PORTFOLIO, DELETE_PORTFOLIO, CREATE_PORTFOLIO, SIGN_IN, GET_USER, SIGN_OUT, GET_USER_PORTFOLIOS, GET_PORTFOLIO, GET_CATEGORIES, FORUM_CATEGORIES, TOPICS_BY_CATEGORY, CREATE_TOPIC, TOPIC_BY_SLUG, POSTS_BY_TOPIC } from "../queries";
import { useQuery, useMutation, useLazyQuery } from "@apollo/react-hooks";


// START PORTFOLIO ACTIONS
export const useGetPortfolios = () => useQuery(GET_PORTFOLIOS);
export const useGetPortfolio = (options) => useQuery(GET_PORTFOLIO, options);
export const useGetUserPortfolios = () => useQuery(GET_USER_PORTFOLIOS);
export const useUpdatePortfolio = () => useMutation(UPDATE_PORTFOLIO);
export const useDeletePortfolio = () => useMutation(DELETE_PORTFOLIO, {
  update(cache, { data: { deletePortfolio } }) {
    const { userPortfolios } = cache.readQuery({ query: GET_USER_PORTFOLIOS });
    const { portfolios } = cache.readQuery({ query: GET_PORTFOLIOS });

    cache.writeQuery({
      query: GET_USER_PORTFOLIOS,
      data: { userPortfolios: userPortfolios.filter(p => p._id !== deletePortfolio._id) }
    });
    cache.writeQuery({
      query: GET_PORTFOLIOS,
      data: { portfolios: portfolios.filter(p => p._id !== deletePortfolio._id) }
    });
  }
});
export const useCreatePortfolio = () => useMutation(CREATE_PORTFOLIO, {
  update(cache, { data: { createPortfolio } }) {
    const { portfolios } = cache.readQuery({ query: GET_PORTFOLIOS });
    const { userPortfolios } = cache.readQuery({ query: GET_USER_PORTFOLIOS });
    cache.writeQuery({
      query: GET_PORTFOLIOS,
      data: { portfolios: [...portfolios, createPortfolio] }
    });
    cache.writeQuery({
      query: GET_USER_PORTFOLIOS,
      data: { userPortfolios: [...userPortfolios, createPortfolio] }
    })
  }
});

// END PORTFOLIO ACTIONS



// START AUTH ACTIONS

export const useSignIn = () => useMutation(SIGN_IN, {
  update(cache, { data: { signIn } }) {
    cache.writeQuery({
      query: GET_USER,
      data: { user: signIn }
    })
  }
});

export const useSignOut = () => useMutation(SIGN_OUT);

export const useGetUser = () => useQuery(GET_USER);
export const useLazyGetUser = () => useLazyQuery(GET_USER);


// END AUTH ACTIONS

// START FORUM ACTIONS

export const useGetCategories = () => useQuery(FORUM_CATEGORIES);

export const useGetTopicsByCategory = (options) => useQuery(TOPICS_BY_CATEGORY, options);

export const useGetTopicBySlug = (options) => useQuery(TOPIC_BY_SLUG, options);

export const useCreateTopic = () => useMutation(CREATE_TOPIC, {
  update(cache, { data: { createTopic } }) {
    try {
      const { topicsByCategory } = cache.readQuery({
        query: TOPICS_BY_CATEGORY, variables: {
          slug: createTopic.forumCategory.slug
        }
      });
      cache.writeQuery({
        query: TOPICS_BY_CATEGORY,
        data: { topicsByCategory: [...topicsByCategory, createTopic] },
        variables: {
          slug: createTopic.forumCategory.slug
        }
      });
    } catch (e) { console.log(e) }
  }
})

export const useGetPostsByTopic = options => useQuery(POSTS_BY_TOPIC, options);
// END FORUM ACTIONS