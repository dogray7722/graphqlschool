import Header from "./Header";
import Footer from "./Footer";
import React, { useState, createContext } from "react";

export const SideMenuContext = createContext({
  sideMenuOpen: false,
  toggleMenu: () => {},
});

export default function Layout({ children }) {
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
}
