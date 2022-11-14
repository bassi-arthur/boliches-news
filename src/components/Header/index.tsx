import { SingInButton } from "../SingInButton";
import styles from "./styles.module.scss";
import { ActiveLink } from "../ActiveLink";
import { UilBars } from '@iconscout/react-unicons'

export function Header() {

  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <a href="/">
          {/* <img src="/images/logo.svg" alt="nerd estranho" /> */}
          <h1>boliches.news</h1>
        </a>
        <nav>
          <ActiveLink activeClassName={styles.active} href="/">
            <a >Home</a>
          </ActiveLink>
          <ActiveLink activeClassName={styles.active} href="/posts" prefetch>
            <a>Posts</a>
          </ActiveLink>
          <ActiveLink activeClassName={styles.active} href="/calendario" prefetch>
            <a>Calendário</a>
          </ActiveLink>
        </nav>
      </div>
    </header>
  );
}
