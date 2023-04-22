import Layout from "@/components/Layout";
import Head from "next/head";
import ClientOnly from "@/components/ClientOnly";
import CourseManager from "@/components/CourseManager";
import CourseStepper from "@/components/CourseStepper";

export default function Admin() {
  return (
    <Layout>
      <Head>
        <title>Registrar Console</title>
      </Head>
      <main>
        <div>
          <h1 className="text-4xl mt-8 mb-8 text-center font-kanit">
            Manage Courses
          </h1>
          <ClientOnly>
            <CourseStepper />
          </ClientOnly>
        </div>
      </main>
    </Layout>
  );
}
