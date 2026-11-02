import Link from "next/link";

export default function Beranda() {
  return (
    <section className="flex flex-col items-center py-20 text-center">
      <h1 className="text-4xl font-bold text-gray-900">
        Selamat datang, Lody!
      </h1>

      <p className="mt-4 text-gray-600">
        Workshop, lomba, musik, dan bazar. Pesan tiketnya di sini.
      </p>

      <Link
        href="/event"
        className="mt-8 rounded-lg bg-green-600 px-6 py-3 font-semibold text-white hover:bg-green-700"
      >
        Lihat semua event
      </Link>
    </section>
  );
}
