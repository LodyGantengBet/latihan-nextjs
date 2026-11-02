export type Event = {
  id: number;
  judul: string;
  kategori: string;
  tanggal: string;
  lokasi: string;
  harga: number;
  gambar: string;
  deskripsi: string;
  kuota: number;
  terisi: number;
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
    kuota: 50,
    terisi: 45,
  },
  {
    id: 2,
    judul: "Go-Kart Community Battle",
    kategori: "Race",
    tanggal: "2026-11-15",
    lokasi: "Sentul International Circuit",
    harga: 150000,
    gambar: "/events/gokart.jpg",
    deskripsi: "Adu kecepatan go-kart seru bersama komunitas pembalap lokal.",
    kuota: 20,
    terisi: 17,
  },
  {
    id: 3,
    judul: "AI & Future of Coding",
    kategori: "Seminar",
    tanggal: "2026-11-18",
    lokasi: "Auditorium Utama",
    harga: 0,
    gambar: "/events/ai-seminar.jpg",
    deskripsi:
      "Mengenal perkembangan kecerdasan buatan dalam dunia pemrograman.",
    kuota: 100,
    terisi: 88,
  },
  {
    id: 4,
    judul: "UI/UX Design Hackathon",
    kategori: "Competition",
    tanggal: "2026-11-22",
    lokasi: "Co-Working Space A",
    harga: 25000,
    gambar: "/events/uiux.jpg",
    deskripsi: "Kompetisi desain antarmuka aplikasi dalam waktu terbatas.",
    kuota: 40,
    terisi: 32,
  },
  {
    id: 5,
    judul: "React & Next.js Dev Meetup",
    kategori: "Meetup",
    tanggal: "2026-11-25",
    lokasi: "Café Senopati",
    harga: 50000,
    gambar: "/events/meetup.jpg",
    deskripsi:
      "Diskusi santai seputar trik dan tips optimasi aplikasi Next.js.",
    kuota: 30,
    terisi: 26,
  },
  {
    id: 6,
    judul: "Fullstack JavaScript Bootcamp",
    kategori: "Bootcamp",
    tanggal: "2026-11-30",
    lokasi: "Online (Zoom)",
    harga: 100000,
    gambar: "/events/bootcamp.jpg",
    deskripsi:
      "Pelatihan intensif pembuatan aplikasi dari frontend hingga backend.",
    kuota: 60,
    terisi: 50,
  },

  {
    id: 7,
    judul: "Go-Kart Championship 2026",
    kategori: "Race",
    tanggal: "2026-12-05",
    lokasi: "Sentul International Circuit",
    harga: 200000,
    gambar: "/events/gokart-championship.jpg",
    deskripsi:
      "Kejuaraan go-kart bergengsi akhir tahun untuk para pencinta kecepatan.",
    kuota: 25,
    terisi: 25,
  },
];

export function rupiah(nominal: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(nominal);
}
