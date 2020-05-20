const GetUser = {
  userId: localStorage.getItem('userId'),
  name: localStorage.getItem('name'),
  email: localStorage.getItem('email'),
  token: localStorage.getItem('token'),
  username: localStorage.getItem('username'),
};

export default GetUser;