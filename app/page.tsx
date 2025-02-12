import Image from "next/image";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { Bookmark, Folder, Cloud } from "lucide-react"; // Lucide icons

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#1e3a8a] via-[#3b82f6] to-[#9333ea] text-white">

      <section className="flex flex-col lg:flex-row-reverse items-center justify-between px-12 py-16 gap-12">

        <div className="max-w-lg text-center lg:text-left">
          <h1 className="text-4xl font-extrabold leading-tight">
            Organize & Access Your <span className="text-yellow-300">Bookmarks</span> Seamlessly
          </h1>
          <p className="text-lg text-gray-200 mt-3">
            Save, categorize, and retrieve important links with ease.
            A powerful way to keep your web discoveries organized!
          </p>
          <div className="mt-6 flex justify-center lg:justify-start gap-4">
            <SignedOut>
              <SignInButton>
                <button className="px-6 py-3 bg-yellow-300 text-gray-900 font-semibold rounded-lg shadow-md hover:bg-yellow-400 transition">
                  Get Started
                </button>
              </SignInButton>
            </SignedOut>

            <SignedIn>
              <a
                href="/dashboard"
                className="px-6 py-3 bg-white text-blue-700 font-semibold rounded-lg shadow-md hover:bg-gray-200 transition"
              >
                Go to Dashboard
              </a>
            </SignedIn>
          </div>
        </div>

        <div className="relative w-full max-w-lg">
          <Image
            src="/hero-image.jpg"
            width={500}
            height={350}
            alt="Bookmark Management"
            className="rounded-xl shadow-lg border border-white/20"
          />
          <div className="absolute top-[-20px] left-[-20px] w-16 h-16 bg-yellow-300 rounded-full shadow-md animate-pulse" />
          <div className="absolute bottom-[-20px] right-[-20px] w-16 h-16 bg-purple-500 rounded-full shadow-md animate-pulse" />
        </div>

      </section>

      <section className="px-12 py-16 relative">
        <h2 className="text-3xl font-bold text-center text-white mb-12">Why Choose QuickMark?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">

          <div className="p-6 rounded-xl bg-white/10 backdrop-blur-md shadow-lg text-center flex flex-col items-center">
            <Bookmark size={48} className="text-yellow-300 mb-3" />
            <h3 className="text-lg font-semibold text-yellow-300">Quick & Easy</h3>
            <p className="text-gray-200 mt-2">Save bookmarks in just one click, no hassle.</p>
          </div>

          <div className="p-6 rounded-xl bg-white/10 backdrop-blur-md shadow-lg text-center flex flex-col items-center">
            <Folder size={48} className="text-blue-300 mb-3" />
            <h3 className="text-lg font-semibold text-blue-300">Organized Folders</h3>
            <p className="text-gray-200 mt-2">Keep everything tidy with custom folders and tags.</p>
          </div>

          <div className="p-6 rounded-xl bg-white/10 backdrop-blur-md shadow-lg text-center flex flex-col items-center">
            <Cloud size={48} className="text-purple-300 mb-3" />
            <h3 className="text-lg font-semibold text-purple-300">Sync Anywhere</h3>
            <p className="text-gray-200 mt-2">Access your bookmarks on any device, anytime.</p>
          </div>

        </div>
      </section>
    </div>
  );
}
