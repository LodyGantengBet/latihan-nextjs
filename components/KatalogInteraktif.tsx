"use client";
import { useState } from "react";
import { rupiah, type Event } from "@/data/events";
import KartuEvent from "./KartuEvent";
import KontrolKatalog from "./KontrolKatalog";

export default function KatalogInteraktif({ events }: { events: Event[] }) {
  const [cari, setCari] = useState("");
  const [kategori, setKategori] = useState("Semua");
  const [urut, setUrut] = useState("tanggal");
  const [hanyaTersedia, setHanyaTersedia] = useState(false);
  const [hargaMaks, setHargaMaks] = useState("");
  const [jumlahTampil, setJumlahTampil] = useState(4);

  const daftarKategori = ["Semua", ...new Set(events.map((e) => e.kategori))];

  const hasil = events.filter(
    (e) =>
      e.judul.toLowerCase().includes(cari.toLowerCase()) &&
      (kategori === "Semua" || e.kategori === kategori) &&
      (!hanyaTersedia || e.kuota - e.terisi > 0) &&
      (hargaMaks === "" || e.harga <= Number(hargaMaks)),
  );

  const tersusun = [...hasil].sort((a, b) => {
    if (urut === "murah") return a.harga - b.harga;
    if (urut === "mahal") return b.harga - a.harga;
    if (urut === "nama") return a.judul.localeCompare(b.judul);
    return a.tanggal.localeCompare(b.tanggal);
  });

  const rataHarga = tersusun.length
    ? tersusun.reduce((total, e) => total + e.harga, 0) / tersusun.length
    : 0;

  const totalSisa = tersusun.reduce(
    (total, e) => total + (e.kuota - e.terisi),
    0,
  );

  return (
    <div>
      <KontrolKatalog
        cari={cari}
        setCari={(nilai) => {
          setCari(nilai);
          setJumlahTampil(4);
        }}
        kategori={kategori}
        setKategori={(nilai) => {
          setKategori(nilai);
          setJumlahTampil(4);
        }}
        daftarKategori={daftarKategori}
        urut={urut}
        setUrut={(nilai) => {
          setUrut(nilai);
          setJumlahTampil(4);
        }}
        hanyaTersedia={hanyaTersedia}
        setHanyaTersedia={(nilai) => {
          setHanyaTersedia(nilai);
          setJumlahTampil(4);
        }}
        hargaMaks={hargaMaks}
        setHargaMaks={(nilai) => {
          setHargaMaks(nilai);
          setJumlahTampil(4);
        }}
      />

      <p className="mb-3 text-sm text-slate-500">
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
            {tersusun.slice(0, jumlahTampil).map((e) => (
              <KartuEvent key={e.id} event={e} />
            ))}
          </div>

          {jumlahTampil < tersusun.length && (
            <button
              onClick={() => setJumlahTampil(jumlahTampil + 4)}
              className="mt-4 rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            >
              Tampilkan lagi
            </button>
          )}
        </>
      )}
    </div>
  );
}
