"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import { useRouter } from "next/navigation";
import logo from "@/utils/assets/images/logo.svg";

const Nav = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [providers, setProviders] = useState<Object | null>(null);
  const [toggleDropdown, setToggleDropdown] = useState<boolean>(false);

  useEffect(() => {
    const setUpProvider = async () => {
      const response = await getProviders();
      setProviders(response);
    };

    setUpProvider();
  }, []);
  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex gap-2 flex-center">
        <Image
          src={logo}
          alt="Promptopia Logo"
          width={30}
          height={30}
          className="object-contain"
        />
        <p className="logo_text">Promptopia</p>
      </Link>

      {/* Desktop Navigation */}
      <div className="sm:flex hidden">
        {session ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="/create-prompt" className="black_btn">
              Create Post
            </Link>
            <button
              type="button"
              onClick={() => {
                signOut({ redirect: false }).then(() => {
                  router.push("/"); // Redirect to the home page after signing out
                });
              }}
              className="outline_btn"
            >
              Sign Out
            </button>

            <Link href="/profile">
              {session?.user?.image !== null &&
                session?.user?.image !== undefined && (
                  <Image
                    src={session.user.image}
                    alt="profile picture"
                    width={37}
                    height={37}
                    className="rounded-full"
                  />
                )}
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="black_btn"
                >
                  SignIn
                </button>
              ))}
          </>
        )}
      </div>

      {/** mobile navigation */}
      <div className="sm:hidden flex relative">
        {session ? (
          <div className="flex">
            {session?.user?.image !== null &&
              session?.user?.image !== undefined && (
                <Image
                  src={session?.user?.image}
                  alt="profile"
                  width={37}
                  height={37}
                  className="rounded-full"
                  onClick={() => setToggleDropdown((toggle) => !toggle)}
                />
              )}

            {toggleDropdown && (
              <div className="dropdown">
                <Link
                  href="/profile"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  My Profile
                </Link>
                <Link
                  href="/create-prompt"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  Create Prompt
                </Link>
                <button
                  onClick={() => {
                    setToggleDropdown(false);
                    signOut({ redirect: false }).then(() => {
                      router.push("/"); // Redirect to the home page after signing out
                    });
                  }}
                  className="mt-5 w-full black_btn"
                >
                  SignOut
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="black_btn"
                >
                  SignIn
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
