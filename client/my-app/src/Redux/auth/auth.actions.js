import Swal from "sweetalert2"
import axios from "axios";
import { LOGIN_DEFAULT, LOGIN_ERROR, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT } from "./auth.types";
export const LogIn = (creds) => async (dispatch) => {
    dispatch({
        type: LOGIN_REQUEST
    });

    try {
        const { data } = await axios.post(`https://aquamarine-piranha-gear.cyclic.app/user/login`, creds);
        console.log(data);
       
        Swal.fire({
            icon: 'success',
            title:data.message
          })
          return dispatch({
            type: LOGIN_SUCCESS,
            payload: data,
        });
    }
    catch ({ response: { data: { message } } }) {
        console.log(message);
        Swal.fire({
            icon: 'error',
            title:message
          })
        return dispatch({
            type: LOGIN_ERROR,
            payload: message,
        });

    }
};

export const LogOut = () => ({ type: LOGOUT })
export const LogInDefault = () => ({ type: LOGIN_DEFAULT })