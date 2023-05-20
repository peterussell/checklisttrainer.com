import { Footer, NavBar } from "./components";

export const DefaultLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <NavBar />
      <>{children}</>
      <Footer />
    </>
  );
};
