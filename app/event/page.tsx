import type { Metadata } from "next";
import Link from "next/link";
import { ambilEvents } from "@/data/ambil";
import { rupiah } from "@/data/events";
import { PER_HALAMAN, bacaSaringan, saringEvents } from "@/data/saring";
import KontrolKatalog from "@/components/KontrolKatalog";
import KartuEvent from "@/components/KartuEvent";

export const metadata: Metadata = { title: "Katalog Event" };

type RawSearchParams = Record<string, string | string[] | undefined>;

function buatLinkHal(rawParams: RawSearchParams, halTujuan: number) {
  const params = new URLSearchParams();
  for (const [kunci, nilai] of Object.entries(rawParams)) {
    if (kunci === "hal" || nilai === undefined) continue;
    if (Array.isArray(nilai)) {
      for (const item of nilai) params.append(kunci, item);
    } else {
      params.set(kunci, nilai);
    }
  }
  params.set("hal", String(halTujuan));
  return `/event?${params.toString()}`;
}

export default async function Katalog({ searchParams }: PageProps<"/event">) {
  const resolvedParams = (await searchParams) as RawSearchParams;
  const s = bacaSaringan(resolvedParams);
  const events = await ambilEvents();
  const tersusun = saringEvents(events, s);

  const jumlahHalaman = Math.max(1, Math.ceil(tersusun.length / PER_HALAMAN));
  const hal = Math.min(s.hal, jumlahHalaman);
  const terlihat = tersusun.slice((hal - 1) * PER_HALAMAN, hal * PER_HALAMAN);

  const daftarKategori = ["Semua", ...new Set(events.map((e) => e.kategori))];
  const totalSisa = tersusun.reduce((t, e) => t + (e.kuota - e.terisi), 0);
  const rataHarga =
    tersusun.length === 0
      ? 0
      : Math.round(tersusun.reduce((t, e) => t + e.harga, 0) / tersusun.length);

  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold">Katalog Event</h1>
      {/* key: bila URL berubah, formulir dibuat ulang agar isiannya ikut URL */}
      <KontrolKatalog
        key={JSON.stringify(s)}
        s={s}
        daftarKategori={daftarKategori}
      />

      <p className="mb-1 text-sm text-slate-500">
        {tersusun.length} event ditemukan
      </p>
      <p className="mb-3 text-sm text-slate-500">
        Rata-rata harga {rupiah(rataHarga)} · Total sisa tiket {totalSisa}
      </p>
      {tersusun.length === 0 ? (
        <p className="text-slate-500">Tidak ada event yang cocok.</p>
      ) : (
        <>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {terlihat.map((e) => (
              <KartuEvent key={e.id} event={e} />
            ))}
          </div>

          {jumlahHalaman > 1 && (
            <nav
              aria-label="Navigasi halaman"
              className="mt-6 flex items-center justify-center gap-2"
            >
              {hal > 1 && (
                <Link
                  href={buatLinkHal(resolvedParams, hal - 1)}
                  className="rounded border bg-white px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-100"
                >
                  Sebelumnya
                </Link>
              )}

              {Array.from({ length: jumlahHalaman }, (_, i) => i + 1).map(
                (noHal) => (
                  <Link
                    key={noHal}
                    href={buatLinkHal(resolvedParams, noHal)}
                    className={`rounded border px-3 py-1.5 text-sm ${
                      noHal === hal
                        ? "border-blue-600 bg-blue-600 font-semibold text-white"
                        : "bg-white text-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    {noHal}
                  </Link>
                ),
              )}

              {hal < jumlahHalaman && (
                <Link
                  href={buatLinkHal(resolvedParams, hal + 1)}
                  className="rounded border bg-white px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-100"
                >
                  Berikutnya
                </Link>
              )}
            </nav>
          )}
        </>
      )}
    </div>
  );
}
