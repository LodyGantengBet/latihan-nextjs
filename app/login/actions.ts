"use server";

import { timingSafeEqual } from "crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NAMA_COOKIE, UMUR_SESI, buatToken } from "@/lib/sesi";

export type HasilMasuk = { pesan: string };

const COOKIE_GAGAL = "admin_gagal_login";
const MAKS_GAGAL = 5;
const DURASI_BLOKIR_MS = 60 * 1000; // 1 menit

type DataGagal = {
  jumlah: number;
  blokirSampai: number;
};

function sandiCocok(input: string, rahasia: string | undefined): boolean {
  if (!rahasia) return false;
  const a = Buffer.from(input, "utf8");
  const b = Buffer.from(rahasia, "utf8");
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

function bacaDataGagal(nilai: string | undefined): DataGagal {
  if (!nilai) return { jumlah: 0, blokirSampai: 0 };
  try {
    const parsed = JSON.parse(nilai) as Partial<DataGagal>;
    const jumlah =
      typeof parsed.jumlah === "number" && Number.isFinite(parsed.jumlah)
        ? parsed.jumlah
        : 0;
    const blokirSampai =
      typeof parsed.blokirSampai === "number" &&
      Number.isFinite(parsed.blokirSampai)
        ? parsed.blokirSampai
        : 0;
    return { jumlah, blokirSampai };
  } catch {
    return { jumlah: 0, blokirSampai: 0 };
  }
}

export async function masuk(
  _sebelum: HasilMasuk,
  formData: FormData,
): Promise<HasilMasuk> {
  const sandi = String(formData.get("sandi") ?? "");
  const dari = String(formData.get("dari") ?? "");
  const toples = await cookies();
  const sekarang = Date.now();

  const dataGagal = bacaDataGagal(toples.get(COOKIE_GAGAL)?.value);
  if (dataGagal.blokirSampai > sekarang) {
    const sisaDetik = Math.ceil((dataGagal.blokirSampai - sekarang) / 1000);
    return {
      pesan: `Terlalu banyak percobaan salah. Coba lagi dalam ${sisaDetik} detik.`,
    };
  }

  if (!sandiCocok(sandi, process.env.ADMIN_PASSWORD)) {
    const dasarJumlah = dataGagal.blokirSampai > 0 ? 0 : dataGagal.jumlah;
    const jumlahBaru = dasarJumlah + 1;
    const kenaBlokir = jumlahBaru >= MAKS_GAGAL;

    const dataBaru: DataGagal = kenaBlokir
      ? { jumlah: jumlahBaru, blokirSampai: sekarang + DURASI_BLOKIR_MS }
      : { jumlah: jumlahBaru, blokirSampai: 0 };

    toples.set(COOKIE_GAGAL, JSON.stringify(dataBaru), {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 5,
    });

    return {
      pesan: kenaBlokir
        ? "Terlalu banyak percobaan salah. Coba lagi dalam 60 detik."
        : "Kata sandi salah.",
    };
  }

  toples.delete(COOKIE_GAGAL);

  toples.set(NAMA_COOKIE, await buatToken(), {
    httpOnly: true, // tidak terbaca oleh JavaScript di browser
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: UMUR_SESI,
  });

  // hanya boleh kembali ke halaman admin (mencegah dilempar ke situs lain)
  redirect(dari.startsWith("/admin") ? dari : "/admin");
}

export async function keluar() {
  (await cookies()).delete(NAMA_COOKIE);
  redirect("/login");
}
