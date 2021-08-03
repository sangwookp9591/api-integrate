import React, { createContext, useReducer, useContext } from 'react';
import axios from 'axios';
//1초기화
const initialState = {
  users: {
    loading: false,
    data: null,
    error: null,
  },
  user: {
    loading: false,
    data: null,
    error: null,
  },
};

//2.쉽게 설정하기 위한 함수생성
const loadingState = {
  loading: true,
  data: null,
  error: null,
};
//success 설정
const success = (data) => ({
  loading: false,
  data,
  error: null,
});

const error = (e) => ({
  loading: false,
  data: null,
  error: e,
});

//GET_USERS
//GET_USERS_SUCCESS
//GET_USERS_ERROR
//GET_USER
//GET_USER_SUCCESS
//GET_USER_ERROR

function usersReducer(state, action) {
  switch (action.type) {
    case 'GET_USERS':
      return {
        ...state,
        users: loadingState,
      };
    case 'GET_USERS_SUCCESS':
      return {
        ...state,
        users: success(action.data),
      };
    case 'GET_USERS_ERROR':
      return {
        ...state,
        users: error(action.error),
      };
    case 'GET_USER':
      return {
        ...state,
        users: loadingState,
      };
    case 'GET_USER_SUCCESS':
      return {
        ...state,
        users: success(action.data),
      };
    case 'GET_USER_ERROR':
      return {
        ...state,
        users: error(action.error),
      };
    default:
      throw new Error('Unhandeled action type', action.type);
  }
}
//4.context생성
const UsersStateContext = createContext(null);
const UsersDispatchContext = createContext(null);

export function UsersProvider({ children }) {
  const [state, dispatch] = useReducer(usersReducer, initialState);
  return (
    <UsersStateContext.Provider value={state}>
      <UsersDispatchContext.Provider value={dispatch}>
        {children}
      </UsersDispatchContext.Provider>
    </UsersStateContext.Provider>
  );
}
//state, dispatch를 좀더 쉽게 사용하기 위해서 생성
export function useUsersState() {
  const state = useContext(UsersStateContext);
  if (!state) {
    throw new Error('Cannot find UserProvider');
  }
  return state;
}

export function useUsersDispatch() {
  const dispatch = useContext(UsersDispatchContext);
  if (!dispatch) {
    throw new Error('Cannot find UserProvider');
  }
  return dispatch;
}

//5.api 요청 -> 이함수가 호출될때 action들을 dispatch하도록 만들어 놓은것이다.
export async function getUsers(dispatch) {
  //api 시작
  dispatch({
    type: 'GET_USERS',
  });

  try {
    const response = await axios.get(
      'https://jsonplaceholder.typicode.com/users',
    );
    dispatch({
      type: 'GET_USERS_SUCCESS',
      data: response.data,
    });
  } catch (e) {
    dispatch({
      type: 'GET_USERS_ERROR',
      error: e,
    });
  }
}

export async function getUser(dispatch, id) {
  console.log('id', id);
  //api 시작
  dispatch({
    type: 'GET_USER',
  });
  try {
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/users/${id}`,
    );
    dispatch({
      type: 'GET_USER_SUCCESS',
      data: response.data,
    });
  } catch (e) {
    dispatch({
      type: 'GET_USER_ERROR',
      error: e,
    });
  }
}
