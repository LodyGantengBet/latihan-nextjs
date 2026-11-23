import Link from "next/link";
import type { Saringan } from "@/data/saring";
import { alamatHalaman } from "@/data/saring";

export default function Halaman({
  s,
  hal,
  jumlah,
}: {
  s: Saringan;
  hal: number;
  jumlah: number;
}) {
  if (jumlah <= 1) return null;

  return (
    <div className="flex items-center gap-2 mt-6">
      {hal > 1 && (
        <Link
          href={alamatHalaman(s, hal - 1)}
          className="rounded border px-3 py-1 bg-white"
        >
          « Sebelumnya
        </Link>
      )}

      {Array.from({ length: jumlah }, (_, i) => i + 1).map((n) => (
        <Link
          key={n}
          href={alamatHalaman(s, n)}
          className={`rounded border px-3 py-1 ${n === hal ? "bg-blue-600 text-white font-bold" : "bg-white"}`}
        >
          {n}
        </Link>
      ))}

      {hal < jumlah && (
        <Link
          href={alamatHalaman(s, hal + 1)}
          className="rounded border px-3 py-1 bg-white"
        >
          Berikutnya »
        </Link>
      )}
    </div>
  );
}
