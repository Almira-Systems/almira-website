"use client";
import styles from "./header.module.scss";
import { LinkedInIcon } from "@/app/icons/linkedin";
import { SearchIcon } from "@/app/icons/search_icon";
import Link from "next/link";
import Image from "next/image";
import Dropdown from "./dropdown";
import { MenuIcon } from "lucide-react";
import Cart from "@/app/_components/cart";
import ProductSearch from "@/app/_components/product_search";

const AW_LOGO_URL =
  "https://www.ameriwater.com/wp-content/themes/ameriwater/assets/images/logo_registered.png";

const AW_TEL = "800 535 5585";
const AW_EMAIL = "info@ameriwater.com";

const Header = () => {
  return (
    <header className={styles.header}>
      <section>
        <Link href="/">
          <Image
            loading="eager"
            src={AW_LOGO_URL}
            alt="logo"
            width={400}
            height={86}
          />
        </Link>
        <div>
          <div className={styles.buttons}>
            <button
              name="linkedin"
              onClick={() =>
                window.open("https://www.linkedin.com/company/ameriwater/")
              }
            >
              <LinkedInIcon />
            </button>
            <button
              name="search"
              // onClick={() => {
              //   const productSearch = document.getElementById("product_search");
              //   productSearch?.focus();
              // }}
            >
              <SearchIcon />
            </button>
          </div>
          <div className={styles.contact}>
            <Link type="tel" href={`tel:${AW_TEL}`}>
              <b>T:</b> {AW_TEL}
            </Link>
            <Link type="email" href={`mailto:${AW_EMAIL}`}>
              <b>E:</b> {AW_EMAIL}
            </Link>
          </div>
        </div>
      </section>
      <nav>
        <Dropdown
          id="nav-dropdown"
          trigger={<MenuIcon color="#fff" />}
          className={styles.nav_dropdown}
          options={[
            {
              label: "All Products",
              value: "all_products",
              link: true,
              href: "#all",
            },
            {
              label: "Parts & Consumables",
              value: "parts_and_consumables",
              link: true,
              href: "/",
              wrap: false,
            },
          ]}
        />
        <ProductSearch />
        <Cart />
      </nav>
    </header>
  );
};

export default Header;
