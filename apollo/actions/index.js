import { GET_PORTFOLIOS, UPDATE_PORTFOLIO, DELETE_PORTFOLIO, CREATE_PORTFOLIO, SIGN_IN, GET_USER } from "../queries";
import { useQuery, useMutation, useLazyQuery } from "@apollo/react-hooks";



export const useGetPortfolio = () => useQuery(GET_PORTFOLIOS);
export const useUpdatePortfolio = () => useMutation(UPDATE_PORTFOLIO);
export const useDeletePortfolio = () => useMutation(DELETE_PORTFOLIO, {
  update(cache, { data: { deletePortfolio } }) {
    const { portfolios } = cache.readQuery({ query: GET_PORTFOLIOS });
    cache.writeQuery({
      query: GET_PORTFOLIOS,
      data: { portfolios: portfolios.filter(p => p._id !== deletePortfolio._id) }
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



// AUTH ACTIONS

export const useSignIn = () => useMutation(SIGN_IN, {
  update(cache, { data: { signIn } }) {
    cache.writeQuery({
      query: GET_USER,
      data: { user: signIn }
    })
  }
});
export const useLazyGetUser = () => useLazyQuery(GET_USER);