import userActionTypes from "../user/user-action-types";
export const setCurrentUser = (user) => ({
    type: userActionTypes.SET_CURRENT_USER,
    payload: user,
});
