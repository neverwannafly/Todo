import Notice from "../views/components/Notice.js";

const IssueNotice = async (content, color) => {
  const notice = document.getElementById('notice-root');
  notice.innerHTML = await Notice.render(content, color);
  await Notice.postRender();
  console.log("in");
}

export default IssueNotice;