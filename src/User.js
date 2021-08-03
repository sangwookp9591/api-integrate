import React, { useEffect } from 'react';
import { getUser, useUsersDispatch, useUsersState } from './UsersContext';
// import axios from 'axios';
// import useAsync from './useAsync';
// import { useAsync } from 'react-async';

// async function getUser(id) {
//   console.log('id', id);
//   const response = await axios.get(
//     // eslint-disable-next-line no-template-curly-in-string
//     `https://jsonplaceholder.typicode.com/users/${id}`,
//   );
//   return response.data;
// }
// function User({ id }) {
//     const [state] = useAsync(() => getUser(id), [id]); //id가 바뀔때마다 이함수를 호출하겠다.
//     const { loading, data: user, error } = state;

//     if (loading) return <div>로딩중...</div>;
//     if (error) return <div>에러가 발생했습니다.</div>;
//     if (!user) return null;

//     return (
//       <div>
//         <h2>{user.username}</h2>
//         <p>
//           <b>Email: </b>
//           {user.email}
//         </p>
//       </div>
//     );
//   }

// async function getUser({ id }) {
//   console.log('id', id);
//   const response = await axios.get(
//     // eslint-disable-next-line no-template-curly-in-string
//     `https://jsonplaceholder.typicode.com/users/${id}`,
//   );
//   return response.data;
// }
// function User({ id }) {
//   const {
//     data: user,
//     error,
//     isLoading,
//   } = useAsync({ promiseFn: getUser, id, watch: id }); //watch id라고 하게 되면 component가 랜더링될때는 getUser에 id를 넣어서 호출하고, id가 바뀌면 다시 useAsync를 호출하겠다는것.

//   if (isLoading) return <div>로딩중...</div>;
//   if (error) return <div>에러가 발생했습니다.</div>;
//   if (!user) return null;

//   return (
//     <div>
//       <h2>{user.username}</h2>
//       <p>
//         <b>Email: </b>
//         {user.email}
//       </p>
//     </div>
//   );
// }

function User({ id }) {
  const state = useUsersState();
  const dispatch = useUsersDispatch();
  const { loading, data: user, error } = state.user;

  //user는 처음 컴포넌트가 호출될때 렌더링되어야하기때문에 useEffect사용
  useEffect(() => {
    getUser(dispatch, id);
  }, [dispatch, id]);
  if (loading) return <div>로딩중...</div>;
  if (error) return <div>에러가 발생했습니다.</div>;
  if (!user) return null;

  return (
    <div>
      <h2>{user.username}</h2>
      <p>
        <b>Email: </b>
        {user.email}
      </p>
    </div>
  );
}

export default User;
