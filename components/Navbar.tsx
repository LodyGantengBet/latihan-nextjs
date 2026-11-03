"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const menu = [
    { label: "Beranda", href: "/" },
    { label: "Event", href: "/event" },
    { label: "Tentang", href: "/tentang" },
    { label: "Kontak", href: "/kontak" }, // Menu keempat yang ditambahkan
  ];

  return (
    <header className="bg-white shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        <Link href="/" className="text-xl font-bold text-blue-600">
          EventKu
        </Link>

        <nav className="flex gap-6">
          {menu.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={
                pathname === item.href
                  ? "text-blue-600 font-bold"
                  : "text-slate-600 hover:text-blue-600"
              }
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
