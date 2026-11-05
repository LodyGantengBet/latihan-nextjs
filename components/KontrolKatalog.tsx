type Props = {
  cari: string;
  setCari: (nilai: string) => void;
  kategori: string;
  setKategori: (nilai: string) => void;
  daftarKategori: string[];
  urut: string;
  setUrut: (nilai: string) => void;
  hanyaTersedia: boolean;
  setHanyaTersedia: (nilai: boolean) => void;
  hargaMaks: string;
  setHargaMaks: (nilai: string) => void;
};

export default function KontrolKatalog({
  cari,
  setCari,
  kategori,
  setKategori,
  daftarKategori,
  urut,
  setUrut,
  hanyaTersedia,
  setHanyaTersedia,
  hargaMaks,
  setHargaMaks,
}: Props) {
  return (
    <div className="mb-4 flex flex-wrap gap-3">
      <input
        value={cari}
        onChange={(e) => setCari(e.target.value)}
        placeholder="Cari event..."
        className="rounded border bg-white px-3 py-2"
      />

      <select
        value={kategori}
        onChange={(e) => setKategori(e.target.value)}
        className="rounded border bg-white px-3 py-2"
      >
        {daftarKategori.map((k) => (
          <option key={k}>{k}</option>
        ))}
      </select>

      <select
        value={urut}
        onChange={(e) => setUrut(e.target.value)}
        className="rounded border bg-white px-3 py-2"
      >
        <option value="tanggal">Tanggal terdekat</option>
        <option value="murah">Harga termurah</option>
        <option value="mahal">Harga termahal</option>
        <option value="nama">Nama A-Z</option>
      </select>

      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={hanyaTersedia}
          onChange={(e) => setHanyaTersedia(e.target.checked)}
        />
        Hanya yang masih ada tiket
      </label>

      <input
        type="number"
        min="0"
        value={hargaMaks}
        onChange={(e) => setHargaMaks(e.target.value)}
        placeholder="Harga maksimal"
        className="rounded border bg-white px-3 py-2"
      />
    </div>
  );
}
