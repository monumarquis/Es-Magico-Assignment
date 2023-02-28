import axios from "axios";
import { USER_PROFILE_ERROR, USER_PROFILE_REQUEST, USER_PROFILE_SUCCESS } from "./userprofile.types";
export const getUserProfile = () => async (dispatch) => {
    dispatch({
        type: USER_PROFILE_REQUEST
    });
    const config = {
        headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`
        }
    }
    try {
        const { data } = await axios.get(`http://localhost:8001/user/getProfile`,config);
        console.log(data);
          return dispatch({
            type: USER_PROFILE_SUCCESS,
            payload: data,
        });
    }
    catch ({ response: { data: { message } } }) {
        console.log(message);
        return dispatch({
            type: USER_PROFILE_ERROR,
            payload: message,
        });

    }
};
