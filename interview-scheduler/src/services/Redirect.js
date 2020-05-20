const Redirect = async (path) => {
  location.hash = `#${path}`;
}

export default Redirect;