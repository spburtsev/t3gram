import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

export default function Navbar() {
  const router = useRouter();
  const handleSignInClick = () => {
    void signIn();
  };

  const { status: sessionStatus } = useSession();
  const authenticated = sessionStatus === "authenticated";
  useEffect(() => {
    if (authenticated) {
      void router.replace("/dashboard");
    }
  }, [authenticated, router]);

  return (
    <header className="bg-primary">
      <nav className="navbar mx-auto max-w-7xl px-2 text-primary-content sm:px-4 lg:px-8">
        <div className="navbar-start">
          <Link href="/" className="btn-ghost btn text-xl normal-case">
            T3Gram
          </Link>
        </div>
        <div className="navbar-end">
          <button
            className="btn-secondary rounded-btn btn"
            onClick={handleSignInClick}
          >
            Sign in
          </button>
        </div>
      </nav>
    </header>
  );
}
