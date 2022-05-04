import { FETCH_ALL , REGISTER_FAIL, SET_MESSAGE} from "./types";

import UserService from "../services/user.service";

export const getPublicContent = () => (dispatch) => {
  return UserService.getPublicContent().then(
    (response) => {
      dispatch({
        type: FETCH_ALL,
      });

      dispatch({
        type: FETCH_ALL,
        payload: response
      });
     // console.log(response)

      return Promise.resolve();
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: REGISTER_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

