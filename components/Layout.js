import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <main className="flex flex-col h-screen">
        <div>{children}</div>
      </main>
      <Footer />
    </>
  );
};
export default Layout;
