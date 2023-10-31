declare module "next-auth" {
  interface User {
    role?: Role;
    subscribed: boolean;
  }

  interface Session extends DefaultSession {
    user?: User;
  }
}
