import Head from "next/head";
import Layout from "../components/Layout";
import ClientOnly from "../components/ClientOnly";
import Courses from "../components/Courses";

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>Course Catalog</title>
      </Head>
      <main>
        <div>
          <h1 className="text-4xl mt-8 mb-8 text-center">Course Catalog</h1>
          <ClientOnly>
            <Courses />
          </ClientOnly>
        </div>
      </main>
    </Layout>
  );
}
