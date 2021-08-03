import { useReducer, useEffect, useCallback } from 'react';
function reducer(state, action) {
  switch (action.type) {
    case 'LOADING':
      return {
        loading: true,
        data: null,
        error: null,
      };
    case 'SUCCESS':
      return {
        loading: false,
        data: action.data,
        error: null,
      };
    case 'ERROR':
      return {
        loading: false,
        data: null,
        error: action.error,
      };
    default:
      // eslint-disable-next-line no-template-curly-in-string
      throw new Error('Unhandled action type : ${action.type}');
  }
}

//custom hooks ,
export default function useAsync(callback, deps = [], skip = false) {
  //callback함수(api를 호출하는 함수), dependencies(useEffect 2 번째 파라미터에 들어가는 deps를 그대로사용)
  const [state, dispatch] = useReducer(reducer, {
    loading: false,
    data: null,
    error: null,
  });
  //useCallback을 통해서 새로만드는게 아니라 한번만들고 재사용 할 수 있다.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchData = useCallback(async () => {
    dispatch({ type: 'LOADING' });
    try {
      const data = await callback();
      dispatch({ type: 'SUCCESS', data });
    } catch (e) {
      dispatch({ type: 'ERRROR', error: e });
    }
  });
  //위에있는 deps가 비어있는 배열이기 때문에 컴포넌트가 처음 랜더링될때마다 fetchdata가 호출될 것이다. deps에 상태를 받아오면 특정api가 다시호출될것이다.
  useEffect(() => {
    if (skip) {
      return;
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
  //deps에 경고가 떳지만 우리는 파라미터를 받아온것을 그대로 넣고싶기때문에 eslint 경고를 무시해야한다.

  return [state, fetchData]; //상태, 특정요청을 다시 시작하는 함수를 바당와서 쓸수가 있다.
}
