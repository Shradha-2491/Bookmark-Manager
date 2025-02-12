import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
    SignInButton,
    SignUpButton,
    SignedIn,
    SignedOut,
    UserButton,
} from "@clerk/nextjs";

const Navbar = () => {
    return (
        <header className="px-6 py-4 bg-white shadow-md font-work-sans">
            <nav className="flex justify-between items-center">
                <Link href="/">
                    <Image src="/logo.png" alt="logo" width={144} height={30} className="cursor-pointer" />
                </Link>
                <div className="flex items-center gap-4">
                    <SignedOut>
                        <SignInButton>
                            <button className="px-5 py-2 border border-[#007DFC] text-[#007DFC] rounded-full font-medium hover:bg-[#007DFC] hover:text-white transition-all duration-300">
                                Sign In
                            </button>
                        </SignInButton>

                        <SignUpButton>
                            <button className="px-5 py-2 bg-[#007DFC] text-white rounded-full font-medium hover:bg-[#0066D6] transition-all duration-300">
                                Sign Up
                            </button>
                        </SignUpButton>
                    </SignedOut>

                    <SignedIn>
                        <UserButton />
                    </SignedIn>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;
