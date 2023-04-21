import Header from "./Header";
import Footer from "./Footer";
import React, { useState } from "react";

export const SideMenuContext = React.createContext();

const Layout = ({ children }) => {
  const [sideMenuOpen, setSideMenuOpen] = useState(false);

  const toggleMenu = () => {
    setSideMenuOpen(!sideMenuOpen);
  };
  return (
    <SideMenuContext.Provider value={{ sideMenuOpen, toggleMenu }}>
      <Header />
      <main className="flex flex-col h-screen">
        <div>{children}</div>
      </main>
      <Footer />
    </SideMenuContext.Provider>
  );
};
export default Layout;
