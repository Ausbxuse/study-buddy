import { useState } from 'react';
import styles from './nav.module.css'
import Link from 'next/link'
import Image from 'next/image'
import { Sling as Hamburger } from 'hamburger-react'

export default function Nav({ children }) {
  const [showMobileNav, setShowMobileNav] = useState(false);
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
            <li><Link href="/discover">Discover</Link></li>
            <li><Link href="/studyHall">Study Hall</Link></li>
            <li><Link href="/login">Login</Link></li>
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
          <li><Link href="/discover">Discover</Link></li>
          <li><Link href="/studyhall">Study Hall</Link></li>
          <li><Link href="/login">Login/Signup</Link></li>
          <li><Link href="/account">Account</Link></li>
        </div>
      </div>

      <main>{children}</main>
    </>
  )
}
