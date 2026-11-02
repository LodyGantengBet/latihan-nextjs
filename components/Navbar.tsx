import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="border-b bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-2xl font-bold text-blue-600">
          EventKu
        </Link>

        <div className="flex gap-6 text-sm font-medium text-gray-700">
          <Link href="/">Beranda</Link>
          <Link href="/event">Event</Link>
          <Link href="/tentang">Tentang</Link>
        </div>
      </div>
    </nav>
  );
}
