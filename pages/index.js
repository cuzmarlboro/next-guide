/* eslint-disable jsx-a11y/alt-text */
import Link from "next/link";
import Head from "next/head";

const Home = () => {
  return (
    <>
      {/* 网页标题 */}
      <Head>
        <title>index page</title>
      </Head>
      <div>
        <div className="">Index</div>
        {/* 页面跳转 */}
        <Link href="/list">
          <a className="demo">jump to list</a>
        </Link>
        {/* public/images/world.jpg --> /images/world.jpg */}
        {/* <img src="/images/world.jpg" /> */}
      </div>
      {/* 方式一 */}
      <style>
        {`
          .demo{
            color:red
          }
        `}
      </style>
    </>
  );
};
export default Home;
