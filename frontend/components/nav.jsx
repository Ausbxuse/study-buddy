import { useState } from 'react';
import styles from './nav.module.css'
import Link from 'next/link'
import Image from 'next/image'
import { Sling as Hamburger } from 'hamburger-react'

export default function Nav({ children }) {
  const [showMobileNav, setShowMobileNav] = useState(false);
  const loginToggle = () => {
    if(getCookie("login") == "true"){
      return;
    }else{
      return <li><Link href="/login">Login/Signup</Link></li>
    }
  }
  const loginToggle2 = () => {
    if(getCookie("login") == "true"){
      return;
    }else{
      return <li><Link href="/login">Login</Link></li>
    }
  }
  const loginToggle3 = () => {
    if(getCookie("login") == "true"){
      return <li><Link href="/discover">Discover</Link></li>;
    }else{
      return;
    }
  }
  const loginToggle4 = () => {
    if(getCookie("login") == "true"){
      return <li><Link href="/discover">Discover</Link></li>;
    }else{
      return;
    }
  }
  return (
    <>
      <div className={styles.headerContainer}>
        <div className={styles.topHint}></div>
        <nav className={styles.navContainer}>
          <ul className={styles.navItems}>

            <Link href="/">
              <span className={`mb-3 text-2xl font-semibold text-white dark:text-black `}>Study Buddy</span>
            </Link>

            <li><Link href="/">Home</Link></li>
            {loginToggle3()}
            <li><Link href="/studyHall">Study Hall</Link></li>
            {loginToggle2()}
          </ul>
          <div className={styles.mobileNav}>
            <Link href="/">
              {/*              
              <Image
                src="/snappy-logo.png"
                className={styles.logo}
                width={36}
                height={36}
              /> 
              */}
            </Link>
            <Link href="/" className={styles.name}>
              Home
            </Link>
            {
              <Hamburger toggled={showMobileNav} toggle={setShowMobileNav} />
            }
          </div>
        </nav>
        <div className={!showMobileNav ? styles.mobileNavList : styles.mobileNavListActive}>
          {loginToggle4()}
          <li><Link href="/studyhall">Study Hall</Link></li>
          {loginToggle()}
          <li><Link href="/account">Account</Link></li>
        </div>
      </div>

      <main>{children}</main>
    </>
  )
}
function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i <ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}