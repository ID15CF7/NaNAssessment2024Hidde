"use client";
import Link from "next/link";
import { Navbar } from "flowbite-react";
import Image from "next/image";
import logo from "@/public/logo.png";
import styles from "./MainLayout.module.scss"
const MainLayout = ({ children }) => {
  return (
    <div className={`max-w-screen-xl mx-auto antialiased  ${styles.main}`}>
      <Navbar
        fluid
        rounded
      >
        <Navbar.Brand
          as={Link}
          href="https://notanumber.digital"
        >
          <Image
            width={128}
            height={32}
            src={logo}
            className="mr-3 "
            alt="Flowbite React Logo"
          />
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Navbar.Link
            as={Link}
            href="/"
          >
            Producten
          </Navbar.Link>
        </Navbar.Collapse>
      </Navbar>

      <main className="flex flex-col p-4 mt-10">{children}</main>
    </div>
  );
};

export default MainLayout;
