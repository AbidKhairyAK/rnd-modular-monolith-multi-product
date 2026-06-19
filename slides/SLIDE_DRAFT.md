# intro

## problem statement

- Alinnea sekarang tidak bisa memiliki fitur unik untuk salah satu jenis LMS, misal sekolah atau perusahaan
- pendekatan yang terpikirkan sekarang adalah menyimpan tipe tenant di landlord, misal school atau corporate, dan memanfaatkan tipe itu untuk pembagian fitur
- problem dengan pendekatan tersebut ialah implementasinya akan terlalu bebas jika tidak didampingi oleh suatu architecture, misal penggunaan if else di sembarang tempat
- presentase kode yang coupling juga akan lumayan tinggi, karena itu akan sering senggol fitur kedepannya
- juga tidak adanya source of truth mengenai fitur apa saja yang dimiliki oleh sekolah atau perusahaan


## goal

- bisa support beberapa jenis LMS
- fitur bisa beda tapi tetap satu codebase
- fitur yang dimaksud disini adalah berupa halaman khusus dan widget khusus
- feature bisa diaktif/nonaktif per tenant
- adanya metode untuk mengorganisir fitur mana saja yang khusus dan mana yang shared
- frontend/backend/landlord membaca kontrak yang sama
- bonus jika kita bisa support jenis LMS lain, misal universitas, atau bahkan fitur khusus untuk satu tenat

---


# Proposed Solution

## core concept

- Feature-Centric: boundary utamanya adalah feature
- Multi-Product: satu codebase melayani beberapa product
- Modular-Monolith: backend-nya bukan microservices, tapi modular di dalam satu app


## penjelasan feature-centric

- resource / entity = satu item CRUD, atau yang mirip2 
(ada ilustrasi beberapa resource yang di dalamnya ada route, page, component)

- feature = gabungan dari beberapa resource / entity
(ada ilustrasi yang mengabungkan beberapa entity ke group featurenya masing2) 

- product = pengelompokan feature, featurenya nanti bisa product specific bisa shared
(ilustrasinya berubah sedikit, featurenya dikelompokkan oleh product) 

- catalog = definisi dari product apa saja yg kita punya
(ilustrasinya berubah sedikit, seluruh item dikurung oleh catalog) 

- jelasin dikit tentang surface
(ilustrasinya berubah sedikit, ada admin dan public di beberapa feature) 

- jelasin dikit tentang widget
(ilustrasinya berubah sedikit, ada widget di beberapa surface) 


## hubungannya dengan multi tenant dan landlord

- masing2 tenant akan memilih salah satu dari product yang tersedia
- tiap feature dari product tersebut bisa on off
- ada kemungkinan bisa membuat product khusus tenant

(ada ilustrasi satu tenant yang bisa memilih antara 2 product beserta featurenya yang ada on dan off)


## demo

- landlord single tenant
- opsi berasal dari catalog
- backend dan frontend auto mengikuti pengaturan landlord

---


# deep dive

## Catalog System

- digunakan untuk mendefinisikan:
	- daftar feature
	- daftar product
	- product memiliki feature apa saja
	- metadata
- akan di-share ke seluruh project melalui git submodule
- catalog merupakan source of truth


## Runtime Flow

- admin ubah config di landlord
- landlord simpan product yang terpili + feature yang di enable
- landlord trigger refresh ke backend
- backend update runtime config in-memory
- frontend bootstrap dari landlord dan fetch data dari backend


## Feature & Product Registration

- setiap feature memiliki directorynya masing2
- semua resource, router, page, surface admin/public, dan widget terkumpul disitu.
- semua itu dikumpulkan ke dalam satu manifest, jadi manifest ini merupakan perwakilan dari feature
- tujuan mereka dikumpulkan ke manifest agar metode registrasinya sama walaupun implementasinya berbeda
- semua manifest dari feature kemudian dibawa ke global feature registry.
- disana, manifest dari feature akan dikelompokkan berdasarkan productnya, atau bisa juga menjadi shared feature.
- selanjutnya feature akan dibandingkan dengan pengaturan dari landlord, untuk mengetahui yang mana yang aktif dan tidak.
- manifest dari feature dan product yang aktif kemudian akan disimpan di feature registry ini. 
- nantinya router, sidebar, dan widget akan meminta informasi dari feature registry.


## Kenapa Pakai Manifest?

- kenapa tidak import langsung masing2 router, widget, dan nav items?
- Alasan utamanya: manifest memisahkan deklarasi dari implementasi.
- Dengan manifest, feature cukup bilang:
	- saya punya route ini
	- saya punya nav item ini
	- saya punya widget ini
	- saya tersedia di surface ini
- Lalu registry hanya merakit.
- Konsistensi antar feature, Manifest memaksa semua feature bicara lewat shape yang sama.


## Kenapa Surface Ada di Dalam Feature?

- feature tetap menjadi boundary utama, ketika suatu feature nonaktif, maka baik halaman public maupun admin nya akan ikut nonaktif.
- public dan admin hanya variasi exposure, kita bisa menambahkan variasi lain, misal mobile, instructor, dll.