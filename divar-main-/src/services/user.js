/* import api from "configs/api";

const getProfile = () => {
  api.get("user/whoami").then((res) => res || false);
};
export { getProfile };
 */
//بهم ارور  Profile  میداد که اینجوری رفع شد تا جلسه350ببینیم چی میشه
import api from "configs/api";

const getProfile = async () => {
  const response = await api.get("user/whoami");
  return response || false;
};

const getPosts = () => api.get("post/my");
const getAllPosts = () => api.get("");

export { getProfile, getPosts, getAllPosts };
