const getUsers = async () => {
    const url = 'https://jsonplaceholder.typicode.com/users';
    const response = await fetch(url);
    return await response.json();
  };
  
  const render = (users) => {
    return users.map(({ name, username, email }) => 
      `<tr>
        <td>${name}</td>
        <td>${username}</td>
        <td>(${email})</td>
      </tr>`
    ).join('');
  };
  
  (async () => {
    const users = await getUsers();
    document.querySelector('#content').innerHTML = `<tbody>${render(users)}</tbody>`;
  })();