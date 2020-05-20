const SetUser = async (user) => {
  const userId = user.id;
  const name = user.name;
  const email = user.email;
  const token = user.token;
  const username = user.username;

  localStorage.setItem('userId', userId);
  localStorage.setItem('name', name);
  localStorage.setItem('email', email);
  localStorage.setItem('token', token);
  localStorage.setItem('username', username);
}

export default SetUser;