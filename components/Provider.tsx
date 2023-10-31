"use client";

import { SessionProvider } from "next-auth/react";

type Props = {
  children: JSX.Element;
  session?: any;
};

const Provider = ({ children, session }: Props) => {
  return <SessionProvider session={session}>{children}</SessionProvider>;
};

export default Provider;
