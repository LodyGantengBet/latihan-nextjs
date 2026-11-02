export type Event = {
  id: number;
  judul: string;
  kategori: string;
  tanggal: string;
  lokasi: string;
  harga: number;
  gambar: string;
  deskripsi: string;
};

export const events: Event[] = [
  {
    id: 1,
    judul: "Workshop Web Development",
    kategori: "Workshop",
    tanggal: "2026-11-10",
    lokasi: "Lab Komputer",
    harga: 15000,
    gambar: "/events/workshop.jpg",
    deskripsi: "Belajar membuat website menggunakan teknologi modern.",
  },
  {
    id: 2,
    judul: "Lomba Desain Poster",
    kategori: "Lomba",
    tanggal: "2026-11-12",
    lokasi: "Aula Sekolah",
    harga: 10000,
    gambar: "/events/poster.jpg",
    deskripsi: "Tunjukkan kreativitas melalui desain poster.",
  },
  {
    id: 3,
    judul: "Festival Musik Sekolah",
    kategori: "Musik",
    tanggal: "2026-11-15",
    lokasi: "Lapangan Sekolah",
    harga: 20000,
    gambar: "/events/musik.jpg",
    deskripsi: "Nikmati pertunjukan musik siswa.",
  },
  {
    id: 4,
    judul: "Bazar Kewirausahaan",
    kategori: "Bazar",
    tanggal: "2026-11-18",
    lokasi: "Halaman Sekolah",
    harga: 5000,
    gambar: "/events/bazar.jpg",
    deskripsi: "Jelajahi produk kreatif karya siswa.",
  },
  {
    id: 5,
    judul: "Seminar Teknologi",
    kategori: "Seminar",
    tanggal: "2026-11-20",
    lokasi: "Aula Sekolah",
    harga: 12000,
    gambar: "/events/seminar.jpg",
    deskripsi: "Mengenal perkembangan teknologi masa depan.",
  },
  {
    id: 6,
    judul: "Kompetisi E-Sport",
    kategori: "Lomba",
    tanggal: "2026-11-22",
    lokasi: "Lab Komputer",
    harga: 25000,
    gambar: "/events/esport.jpg",
    deskripsi: "Kompetisi permainan antarsiswa.",
  },
];

export function rupiah(nominal: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(nominal);
}
