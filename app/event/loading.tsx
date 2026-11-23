export default function Loading() {
  return (
    <div className="animate-pulse space-y-4 p-6">
      {/* Kotak kecil untuk kategori */}
      <div className="h-6 w-24 rounded bg-slate-200" />

      {/* Kotak lebar untuk judul */}
      <div className="h-10 w-3/4 rounded bg-slate-200" />

      {/* Satu baris untuk tanggal */}
      <div className="h-4 w-1/2 rounded bg-slate-200" />

      {/* Satu kotak tinggi untuk formulir */}
      <div className="h-48 w-full rounded bg-slate-200" />
    </div>
  );
}
