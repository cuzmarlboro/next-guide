import Head from "next/head";
import styles from "./list.module.css";
import { readFile } from "fs"; // readFile 是异步的，通过回调函数的方式拿到结果
import { promisify } from "util"; // promisify 可以把回调函数形式的异步方法转为返回promise的方法
import { join } from "path"; // join 方法可以拼接路径

const read = promisify(readFile); // 使用 promisify 对 readFile 进行改造

const List = ({ data }) => {
  return (
    <>
      {/* 可以定制原生head的所有东西（网页元数据）*/}
      <Head>
        <title>list page</title>
      </Head>
      <div className={styles.demo}>List</div>
      <div>{data}</div>
    </>
  );
};
export default List;

// 有数据的静态生成（静态渲染）
// 该函数是在构建的时候执行的，也就是说实在node的环境下执行的
// export const getStaticProps = async () => {
//   const data = await read(join(process.cwd(), "pages", "_app.js"), "utf-8"); // 获取_app.js文件内容
//   console.log(data); // 在node环境下输出，而不是浏览器
//   return {
//     props: { data },
//   };
// };

// 服务器端渲染
// 当客户端向服务端发生请求的时候，getServerSideProps都会执行一次
export const getServerSideProps = async (context) => {
  console.log(context.query); // 获取请求参数，比如http://localhost:3000/list?page=100，{page:100}
  const data = await read(join(process.cwd(), "pages", "_app.js"), "utf-8"); // 获取_app.js文件内容
  console.log("hello"); // 在node环境下输出，而不是浏览器
  return {
    props: { data },
  };
};
