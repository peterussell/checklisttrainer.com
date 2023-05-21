import { useUser } from "@auth0/nextjs-auth0/client";

import styles from "./NavBar.module.css";

export const NavBar = () => {
  const { user, error, isLoading } = useUser();

  const getAccountLink = (): React.ReactNode => {
    if (isLoading) return <p>Loading...</p>
    if (error) return <p>{error.message}</p>

    return user ? (
      <p>Logged in as {user.email} (<a href="/api/auth/logout">Log out</a>)</p>
    ) : (
      <p><a href="/api/auth/login">Log in</a></p>
    )
  };

  return (
    <div className={styles.navbarContainer}>
      <div>
        <h2 className={styles.sitename}>ChecklistTrainer</h2>
      </div>

      <div className={styles.links}>
        {getAccountLink()}
      </div>
      
    </div>
  )
};
