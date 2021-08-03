// import axios from 'axios';
import React, { useState } from 'react';
// import useAsync from './useAsync';
// import { useAsync } from 'react-async';
import User from './User';
import { getUsers, useUsersDispatch, useUsersState } from './UsersContext';

// "https://jsonplaceholder.typicode.com/users",
//useAsync를 사용할때 callback으로 넣어줄 함수
// async function getUsers() {
//   const response = await axios.get(
//     'https://jsonplaceholder.typicode.com/users',
//   );
//   return response.data;
// }
// function Users() {
//   const [state, refetch] = useAsync(getUsers, [], true); //비어있는값으면 컴포넌트가 처음 호출할때 슬값이라는 표현!! ,최초일때 어떤 실행으로 불러오고싶을때
//   const [userId, setUserId] = useState(null);
//   const { loading, data: users, error } = state;
//   if (loading) return <div>로딩중..</div>;
//   if (error) return <div>에러가 발생했습니다.</div>;
//   if (!users) return <button onClick={refetch}>불러오기</button>;

//   return (
//     <>
//       <ul>
//         {users.map((user) => (
//           <li
//             key={user.id}
//             onClick={() => {
//               setUserId(user.id);
//             }}
//           >
//             {user.username} ({user.name})
//           </li>
//         ))}
//       </ul>
//       <button onClick={refetch}>다시 불러오기</button>
//       {userId && <User id={userId} />}
//     </>
//   );
// }
// async function getUsers() {
//   const response = await axios.get(
//     'https://jsonplaceholder.typicode.com/users',
//   );
//   return response.data;
// }
// function Users() {
//   const {
//     data: users,
//     error,
//     isLoading,
//     reload,
//     run,
//   } = useAsync({ deferFn: getUsers /*promiseFn: getUsers*/ }); //reload는 위에서 사용했던 refetch
//   //skip가 같은 역할을 하려고하면 deferFn과 run을 추가해주면된다.
//   const [userId, setUserId] = useState(null);

//   if (isLoading) return <div>로딩중..</div>;
//   if (error) return <div>에러가 발생했습니다.</div>;
//   if (!users) return <button onClick={run}>불러오기</button>;

//   return (
//     <>
//       <ul>
//         {users.map((user) => (
//           <li
//             key={user.id}
//             onClick={() => {
//               setUserId(user.id);
//             }}
//           >
//             {user.username} ({user.name})
//           </li>
//         ))}
//       </ul>
//       <button onClick={reload}>다시 불러오기</button>
//       {userId && <User id={userId} />}
//     </>
//   );
// }

function Users() {
  const [userId, setUserId] = useState(null);
  const state = useUsersState();
  const dispatch = useUsersDispatch();

  const { loading, data: users, error } = state.users;

  const fetchData = () => {
    getUsers(dispatch);
  };
  if (loading) return <div>로딩중..</div>;
  if (error) return <div>에러가 발생했습니다.</div>;
  if (!users) return <button onClick={fetchData}>불러오기</button>;

  return (
    <>
      <ul>
        {users.map((user) => (
          <li
            key={user.id}
            onClick={() => {
              setUserId(user.id);
            }}
          >
            {user.username} ({user.name})
          </li>
        ))}
      </ul>
      <button onClick={fetchData}>다시 불러오기</button>
      {userId && <User id={userId} />}
    </>
  );
}
export default Users;
