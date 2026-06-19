1. Latar Belakang

  - masalah di pendekatan lama
  - kenapa LMS multi-product mulai sulit dirawat
  - contoh pain point:
      - product logic tersebar
      - feature gating tidak konsisten
      - penambahan product/feature mahal

  2. Target yang Ingin Dicapai

  - satu codebase
  - bisa support beberapa product
  - feature bisa diaktif/nonaktif per tenant
  - ownership feature jelas
  - frontend/backend/landlord membaca kontrak yang sama

  3. Tiga Konsep Inti

  - product = kombinasi capability
  - feature = unit capability utama
  - surface = cara feature diekspos (public / admin)

  Ini slide penting. Kalau tim paham ini, sisanya lebih mudah.

  4. Peran Tiap App

  - catalog: source of truth product + feature
  - landlord: menyimpan runtime config tenant
  - backend: expose API per feature dan gate by runtime config
  - frontend: render route/nav/UI berdasarkan runtime config + consume backend API

  5. Runtime Flow

  - admin ubah config di landlord
  - landlord simpan productKey + enabledFeatures
  - landlord trigger refresh ke backend
  - backend update runtime config in-memory
  - frontend bootstrap dari landlord dan fetch data dari backend

  Bagus kalau ini divisualkan sebagai sequence diagram sederhana.

  6. Kenapa Feature-Centric

  - semua yang terkait satu feature dikelompokkan bersama
  - kalau feature dimatikan, public/admin exposure ikut hilang
  - lebih mudah menambah feature baru
  - lebih mudah menentukan ownership code

  7. Kenapa Surface Ada di Dalam Feature

  - feature tetap boundary utama
  - public dan admin hanya variasi exposure
  - mencegah ownership pecah ke folder admin/public global

  8. Struktur Direktori Tingkat Tinggi
  Jangan terlalu detail. Cukup tunjukkan shape:

  - catalog/
  - landlord/
  - backend/app/features/...
  - frontend/src/features/...

  dan contoh satu feature:

  - classes/public
  - classes/admin
  - classes/models di backend
  - classes/manifest

  9. Contoh Nyata
  Pilih 2 contoh:

  - shared feature: courses
  - product-specific feature: classes atau compliance

  Tunjukkan:

  - muncul di product mana
  - route public/admin
  - bagaimana backend gate bekerja
  - bagaimana frontend registry menyalakannya

  10. Data & Persistence

  - awalnya hardcoded, sekarang DB-backed
  - model diletakkan di folder feature masing-masing
  - migration dan seeder per feature
  - admin/public bisa baca tabel yang sama dulu

  11. Keuntungan DX

  - tambah feature baru lebih terlokalisasi
  - tambah product baru cukup lewat catalog + manifest + feature selection
  - landlord/frontend/backend sinkron lewat kontrak yang sama
  - penghapusan feature lebih bersih

  12. Tradeoff / Batasan Sekarang
  Ini penting supaya presentasi terasa jujur:

  - belum fokus ke auth penuh
  - beberapa feature masih read-only
  - schema masih flat, belum terlalu ternormalisasi
  - backend masih runtime-config driven via in-memory refresh

  13. Demo Flow
  Kalau ada demo:

  - ubah product di landlord
  - enable/disable feature
  - lihat nav frontend berubah
  - buka route public/admin
  - tunjukkan backend route ter-gate sesuai config

  14. Next Steps

  - write API untuk admin actions
  - CRUD real per feature
  - auth/permission
  - normalisasi schema bila perlu
  - tambah feature baru berikutnya

  Kalau mau dibuat lebih singkat, saya sarankan maksimal 10 slide:

  1. Problem
  2. Goal
  3. Core concepts
  4. System roles
  5. Runtime flow
  6. Feature-centric structure
  7. Example: shared vs product-specific
  8. Persistence model
  9. DX gains + tradeoffs
  10. Demo + next steps