const Redirect = (path) => {
  location.hash = `#${path}`;
}

export default Redirect;