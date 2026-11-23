import { supabase } from "@/lib/supabase";
import { supabaseAdmin } from "@/lib/supabase-admin";
import type { Pesanan } from "@/data/pesanan";

export async function ambilEvents() {
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .order("tanggal", { ascending: true });

  if (error) {
    console.error("Gagal mengambil events:", error.message);
    return [];
  }
  return data;
}

export async function ambilEvent(id: number) {
  if (!Number.isInteger(id)) return null;

  const { data, error } = await supabase
    .from("events")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error || !data) return null;
  return data;
}

export async function ambilTerkait(kategori: string, currentId: number) {
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .eq("kategori", kategori)
    .neq("id", currentId)
    .limit(3);

  if (error || !data) return [];
  return data;
}

export async function hitungPesanan(eventId: number) {
  const { count, error } = await supabaseAdmin
    .from("pesanan")
    .select("*", { count: "exact", head: true })
    .eq("event_id", eventId);

  if (error) return 0;
  return count ?? 0;
}

export async function hitungTotalTiket(eventId: number) {
  const { data, error } = await supabaseAdmin
    .from("pesanan")
    .select("jumlah")
    .eq("event_id", eventId);

  if (error || !data) return 0;
  return data.reduce(
    (total: number, item: { jumlah: number }) => total + item.jumlah,
    0,
  );
}

export function rupiah(angka: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(angka);
}

export async function ambilPesanan(): Promise<Pesanan[]> {
  const { data, error } = await supabaseAdmin
    .from("pesanan")
    .select("*, events(judul)")
    .order("nomor", { ascending: false });
  if (error) throw new Error("Gagal memuat pesanan: " + error.message);
  return data as Pesanan[];
}
