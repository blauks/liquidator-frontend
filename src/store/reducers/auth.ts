import React from 'react';

import * as API from './../../mitochondria';

type IUser = import('../../declarations/user').IUser;

// Action types
const LOGIN = 'LOGIN' as const;
const REGISTER = 'REGISTER' as const;
const LOGOUT = 'LOGOUT' as const;
const UPDATE_USER = 'UPDATE_USER' as const;
const SET_ACTIVE_COMPANY = 'SET_ACTIVE_COMPANY' as const;

export type AuthState = IUser & { selectedCompany?: number } | null;

export const initialState: AuthState = null;

/**
 * Actions
 */
const login = (args: IUser) => ({
  payload: args,
  type: LOGIN,
});

async function doLogin(
  email: string,
  password: string,
  dispatch: React.Dispatch<ICreatedAction>
) {
  const resp = await API.login(email, password);
  dispatch(login(resp));
}

const register = (args: IUser) => ({
  payload: args,
  type: REGISTER,
});

async function doRegister(
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  dispatch: React.Dispatch<ICreatedAction>
) {
  const resp = await API.register({
    email,
    first_name: firstName,
    last_name: lastName,
    password,
  });
  dispatch(register(resp));
}

const logout = () => ({
  type: LOGOUT,
});
const doLogout = (dispatch: React.Dispatch<ICreatedAction>) => {
  API.logout();
  dispatch(logout());
};

type UpdateUser = Omit<IUser, 'companies'>;
const updateUser = (user: UpdateUser) => ({
  payload: user,
  type: UPDATE_USER,
});
async function doUpdateUser(
  user: UpdateUser,
  dispatch: React.Dispatch<ICreatedAction>
) {
  await API.updateUser(user);
  dispatch(updateUser(user));
}

async function doDeleteUser(dispatch: React.Dispatch<ICreatedAction>) {
  await API.deleteUser();
  dispatch(logout());
}

const doSetUser = async (
  userId: number,
  dispatch: React.Dispatch<ICreatedAction>
) => {
  const user = await API.getUserById(userId);
  dispatch(login(user));
};

const setActiveCompany = (id: number) => ({
  payload: id,
  type: SET_ACTIVE_COMPANY,
});

const doSetActiveCompany = (
  id: number,
  dispatch: React.Dispatch<ICreatedAction>
) => {
  dispatch(setActiveCompany(id));
};

/**
 * Under here you will find action creators, the reducer, and created action creators.
 */

export const AuthActionCreators = {
  login,
  logout,
  register,
  setActiveCompany,
  updateUser,
};

export const AuthActions = {
  doDeleteUser,
  doLogin,
  doLogout,
  doRegister,
  doSetActiveCompany,
  doSetUser,
  doUpdateUser,
};

// the return types of all the elements in ActionCreators
// !! DO NOT TOUCH !!
export type ICreatedAction = ReturnType<
  typeof AuthActionCreators[keyof typeof AuthActionCreators]
>;

export const authReducer = (
  state: AuthState,
  action: ICreatedAction
): AuthState => {
  switch (action.type) {
    case LOGIN:
      const firstCompany = action.payload.companies[0];
      return {
        ...action.payload,
        selectedCompany: (firstCompany && firstCompany.company_id) || undefined,
      };
    case REGISTER:
      return action.payload;
    case LOGOUT:
      return null;
    case UPDATE_USER:
      return { ...state, ...action.payload, companies: state!.companies };
    case SET_ACTIVE_COMPANY:
      return { ...state!, selectedCompany: action.payload };
  }

  return state;
};
