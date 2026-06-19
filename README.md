# V2

`v2` adalah versi arsitektur yang lebih rapi dari eksperimen modular LMS ini. Fokus utamanya:

- `catalog` sebagai source of truth product dan feature
- `landlord` sebagai pengelola runtime config tenant
- `backend` sebagai API feature-centric dengan surface `public` dan `admin`
- `frontend` sebagai consumer runtime config dan backend API

Dokumentasi utama `v2` ada di file ini. `v2/frontend/README.md` adalah README bawaan Vite dan bukan referensi utama project.

## Ringkasan Arsitektur

Tiga konsep inti di `v2`:

- `feature` = unit capability utama
- `surface` = cara feature diekspos, saat ini `public` dan `admin`
- `product` = kombinasi feature yang aktif

## Terminology

Gunakan istilah berikut secara konsisten saat membahas `v2`:

- `product`
  - kombinasi capability yang aktif untuk tenant tertentu
  - contoh: `school`, `corporate`
- `feature`
  - unit capability bisnis utama dan boundary ownership kode
  - contoh: `courses`, `classes`, `guardians`, `compliance`, `teams`
- `surface`
  - cara feature diekspos ke audience tertentu
  - saat ini: `public`, `admin`
- `resource`
  - objek data atau unit CRUD di dalam feature
  - contoh: feature `classes` punya resource `school_class`
- `entity`
  - istilah alternatif untuk resource di level domain/model
  - di repo ini, default istilah lintas tim tetap `resource`
- `use case`
  - operasi bisnis spesifik di atas feature atau resource
  - contoh: `assign teacher`, `publish course`
- `action`
  - trigger UI atau API untuk menjalankan use case
  - contoh: `edit`, `archive`, `assignTeacher`
- `manifest`
  - deklarasi metadata untuk registry, seperti routes, nav items, dan widget contributions
- `widget`
  - contribution kecil dari feature ke halaman shared
- `runtime config`
  - konfigurasi aktif tenant yang berisi `productKey` dan `enabledFeatures`

Konvensi percakapan yang disarankan:

- `classes` adalah feature
- `school_class` adalah resource di dalam feature `classes`
- `assign teacher` adalah use case
- `admin` adalah surface
- `school` adalah product

Alur runtime:

1. `catalog` mendefinisikan `productKey`, `featureKey`, dan compatibility matrix.
2. `landlord` menyimpan `productKey` dan `enabledFeatures`.
3. `backend` membaca runtime config dari `landlord` dan melakukan gating feature via middleware route.
4. `frontend` bootstrap runtime config dari `landlord`, lalu fetch data feature dari `backend`.

Konvensi route:

- frontend public: `/...`
- frontend admin: `/admin/...`
- backend public API: `/api/v1/public/...`
- backend admin API: `/api/v1/admin/...`

## Struktur Direktori

```txt
v2/
  catalog/    source of truth product/feature
  landlord/   Adonis + Inertia + Vue untuk runtime config
  backend/    Adonis API modular per feature/surface
  frontend/   Vue app yang bootstrap dari landlord
```

## Feature yang Sudah Ada

Shared:

- `courses`

School:

- `classes`
- `guardians`

Corporate:

- `compliance`
- `teams`

Semua feature di atas sudah punya surface `public` dan `admin`.

## Prasyarat

Gunakan:

- Node.js `24.x`
- npm atau pnpm

Node 24 adalah pilihan paling aman karena `landlord` mensyaratkan `>=24.0.0`.

## Environment Variables

### Frontend

File: `v2/frontend/.env`

```env
VITE_LANDLORD_API_URL=http://localhost:3333
VITE_BACKEND_API_URL=http://localhost:3334
```

### Backend

File: `v2/backend/.env`

```env
PORT=3334
APP_URL=http://localhost:3334
LANDLORD_API_URL=http://localhost:3333
```

### Landlord

File: `v2/landlord/.env`

```env
PORT=3333
APP_URL=http://localhost:3333
BACKEND_API_URL=http://localhost:3334
```

## Setup Lokal

Install dependency di masing-masing app:

```bash
cd v2/landlord
npm install
```

```bash
cd v2/backend
npm install
```

```bash
cd v2/frontend
npm install
```

Pastikan linked package `@rnd/catalog` sudah tersedia dan mengarah ke `v2/catalog`.

## Setup Database

### Landlord

Jalankan migration landlord:

```bash
cd v2/landlord
node ace migration:run
```

Landlord menyimpan runtime config tenant di SQLite lokalnya.

### Backend

Jalankan migration lalu seed backend secara berurutan:

```bash
cd v2/backend
node ace migration:run
node ace db:seed
```

Perintah `db:seed` saat ini akan mengisi data awal untuk:

- `courses`
- `classes`
- `guardians`
- `compliance`
- `teams`

## Menjalankan Service

Urutan run yang benar:

1. Jalankan `landlord`
2. Jalankan `backend`
3. Jalankan `frontend`

### 1. Landlord

```bash
cd v2/landlord
npm run dev
```

UI tenant settings tersedia di:

- `http://localhost:3333/`

Runtime config API:

- `GET http://localhost:3333/api/v1/runtime-config`

### 2. Backend

```bash
cd v2/backend
npm run dev
```

Backend akan load runtime config dari landlord saat server dijalankan. Karena itu, landlord harus sudah hidup terlebih dahulu.

Internal refresh endpoint:

- `POST http://localhost:3334/api/v1/internal/runtime-config/refresh`

### 3. Frontend

```bash
cd v2/frontend
npm run dev
```

Frontend akan:

- bootstrap runtime config dari landlord
- membangun route berdasarkan feature yang aktif
- fetch data feature dari backend

## Cara Kerja Runtime Config

`landlord` adalah source of truth untuk:

- `productKey`
- `enabledFeatures`

Saat config tenant diubah dari UI landlord:

1. landlord menyimpan config ke DB
2. landlord memanggil webhook backend refresh
3. backend memuat ulang runtime config ke memory
4. frontend akan melihat perubahan setelah reload

Contoh:

- `school` mengaktifkan `classes` dan `guardians`
- `corporate` mengaktifkan `compliance` dan `teams`

Feature product-specific digate di backend via middleware per route. Jika feature nonaktif, endpoint akan `404`.

## Contoh Endpoint

Shared:

- `GET /api/v1/public/courses`
- `GET /api/v1/admin/courses`

School:

- `GET /api/v1/public/classes`
- `GET /api/v1/admin/classes`
- `GET /api/v1/public/guardians`
- `GET /api/v1/admin/guardians`

Corporate:

- `GET /api/v1/public/compliance`
- `GET /api/v1/admin/compliance`
- `GET /api/v1/public/teams`
- `GET /api/v1/admin/teams`

## Verifikasi

Backend:

```bash
cd v2/backend
npm run typecheck
npm run build
```

Frontend:

```bash
cd v2/frontend
npm run type-check
npm run build
```

Landlord:

```bash
cd v2/landlord
npm run typecheck
```

## Troubleshooting

### Backend gagal boot karena runtime config

Pastikan:

- `landlord` sudah hidup
- `LANDLORD_API_URL` benar
- endpoint `GET /api/v1/runtime-config` landlord bisa diakses

### Feature tidak muncul di frontend

Cek:

- runtime config di landlord
- apakah feature di-enable untuk product aktif
- apakah webhook refresh backend berhasil
- reload frontend setelah perubahan config

### `db:seed` gagal

Jalankan berurutan, jangan paralel dengan migration:

```bash
node ace migration:run
node ace db:seed
```

### Corporate atau school route masih 404

Itu biasanya berarti:

- feature belum aktif di landlord
- backend belum refresh runtime config
- product aktif tidak kompatibel dengan feature tersebut

## Catatan

- `courses` adalah shared feature.
- `classes`, `guardians`, `compliance`, dan `teams` adalah product-specific features.
- Model untuk feature-specific data diletakkan di folder feature backend masing-masing.
- Data feature saat ini sudah DB-backed di backend dan di-seed untuk local development.
