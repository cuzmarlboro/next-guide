// 基于动态路由的静态页面生成
import { useRouter } from "next/router";

const Post = ({ data }) => {
  const router = useRouter();
  // router.isFallback 为ture代表正在静态生成，false代表已经生成完成
  if (router.isFallback) return <div>loading</div>;
  return (
    <div>
      <span>{data.id}</span>
      <span>{data.title}</span>
    </div>
  );
};
export default Post;

// 返回用户可以访问到的所有路由参数
export const getStaticPaths = async () => {
  return {
    paths: [{ params: { id: "1" } }, { params: { id: "2" } }],
    fallback: true, // 当用户访问的路由参数没有在该函数中返回时，是否显示404，false：显示，true：不显示
  };
};

// 返回路由参数所对应的具体的数据
// 当客户端当服务端发送请求的时候也会再执行一次该函数，不仅仅是在构建中执行，
// 当访问/post/3，会生成一个post/3.html的页面，因为3不在路由参数范围内，所以得重新生成!!!
export const getStaticProps = async ({ params }) => {
  const id = params.id;
  let data = null;
  switch (id) {
    case "1":
      data = { id, title: "Hello" };
      break;
    case "2":
      data = { id, title: "World" };
      break;
    case "3": // 当把fallback设为true的时候,访问/post/3，就不显示404，而是向服务端发送请求，再重新生成html返回给客户端
      data = { id, title: "hello world" };
      break;
    default:
      break;
  }
  return {
    props: { data },
  };
};
