import { GET_PORTFOLIOS, UPDATE_PORTFOLIO, DELETE_PORTFOLIO, CREATE_PORTFOLIO, SIGN_IN, GET_USER, SIGN_OUT, GET_USER_PORTFOLIOS } from "../queries";
import { useQuery, useMutation, useLazyQuery } from "@apollo/react-hooks";


// START PORTFOLIO ACTIONS
export const useGetPortfolio = () => useQuery(GET_PORTFOLIOS);
export const useGetUserPortfolios = () => useQuery(GET_USER_PORTFOLIOS);
export const useUpdatePortfolio = () => useMutation(UPDATE_PORTFOLIO);
export const useDeletePortfolio = () => useMutation(DELETE_PORTFOLIO, {
  update(cache, { data: { deletePortfolio } }) {
    const { userPortfolios } = cache.readQuery({ query: GET_USER_PORTFOLIOS });

    cache.writeQuery({
      query: GET_USER_PORTFOLIOS,
      data: { userPortfolios: userPortfolios.filter(p => p._id !== deletePortfolio._id) }
    });
  }
});
export const useCreatePortfolio = () => useMutation(CREATE_PORTFOLIO, {
  update(cache, { data: { createPortfolio } }) {
    const { portfolios } = cache.readQuery({ query: GET_PORTFOLIOS });
    cache.writeQuery({
      query: GET_PORTFOLIOS,
      data: { portfolios: [...portfolios, createPortfolio] }
    });
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