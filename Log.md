# Development Log

## 2026-11-11

### สถานะปัจจุบัน
- ตรวจสอบ repository เรียบร้อยแล้ว
- Repository ยังไม่มีไฟล์หรือโครงสร้างโปรเจกต์เดิม
- นำเสนอ proposed folder structure, database models, permission matrix, implementation plan และ assumptions แล้ว
- ยังไม่ได้เริ่มสร้าง source code หรือ database schema

### ขั้นตอนถัดไป
- ปรับ scope เป็น polished demo ขนาดเล็ก ไม่ใช่ระบบ production เต็มรูปแบบ
- วางแผนทำประมาณ 4 หน้าหลัก: Login, Dashboard, Students, Student Detail
- เริ่มสร้างโครงสร้างโปรเจกต์และหน้าหลักหลังยืนยันแนวทางย่อ

### Scope ที่ปรับแล้ว
- ใช้ synthetic data สำหรับ demo
- แสดง RBAC ผ่าน Admin/Staff demo accounts
- มี dashboard summary, student list, student detail และ document status tracking
- ตัด user management เต็มรูปแบบ, notification, advanced document preview และ deployment complexity ออกจาก demo รุ่นแรก

## 2026-11-11 — Phase 1 Demo UI

### ทำเสร็จแล้ว
- สร้าง single-page demo สำหรับ The DNA
- เพิ่ม Login screen พร้อม demo credentials
- เพิ่ม Dashboard พร้อม stat cards, status chart, recent activity และ upcoming expirations
- เพิ่ม Students page พร้อม search, filter UI และ student table
- เพิ่ม Student Detail พร้อม profile, enrollment details, documents และ status badges
- เพิ่ม responsive layout สำหรับ desktop และ mobile
- เพิ่ม interactions: sign in, sign out, navigation, search, detail view และ demo toast actions

### ไฟล์ที่เพิ่ม
- `index.html`
- `styles.css`
- `app.js`

### หมายเหตุ
- ข้อมูลทั้งหมดเป็น synthetic data และทำงานฝั่ง client เพื่อใช้เป็น visual/interaction demo
- ยังไม่มี backend, database, authentication จริง หรือ private file storage

## 2026-11-11 — Stack Direction Confirmed

### แนวทางที่ยืนยัน
- ใช้ Next.js App Router และ TypeScript เป็น application framework
- ใช้ MUI เป็น design system และ component library
- ใช้ Node.js สำหรับ server-side services/API
- เตรียม Prisma และ MySQL สำหรับ persistence และ seed data
- คง scope เป็น SaaS demo ขนาดเล็ก 4 หน้าหลัก: Login, Dashboard, Students และ Student Detail
- จะทยอยย้ายจาก static prototype ไปเป็น maintainable application structure โดยไม่เพิ่ม scope ที่ไม่จำเป็น

### ขั้นตอนถัดไป
- สร้าง Next.js project files, MUI theme, shared layout และ route structure

## 2026-11-11 — Phase 2 Next.js + MUI Foundation

### ทำเสร็จแล้ว
- เพิ่ม `package.json` สำหรับ Next.js, React, TypeScript และ MUI
- เพิ่ม TypeScript และ Next.js configuration
- สร้าง App Router layout และ metadata
- สร้าง MUI theme และ responsive SaaS shell
- ย้าย Dashboard, Students และ Student Detail เข้า `app/page.tsx`
- เพิ่ม search student, navigation, status chips และ detail interaction

### ขั้นตอนถัดไป
- ติดตั้ง dependencies และตรวจสอบ `typecheck`/`build`
- เพิ่ม Prisma schema, MySQL Docker Compose และ seed data

## 2026-11-11 — Phase 3 Persistence Foundation

### ทำเสร็จแล้ว
- ติดตั้ง dependencies สำเร็จด้วย `npm install`
- แก้ MUI Grid compatibility ให้ใช้ Grid2
- `npm run build` ผ่านเรียบร้อย
- เพิ่ม `.env.example`
- เพิ่ม `docker-compose.yml` สำหรับ MySQL 8.4
- เพิ่ม Prisma schema สำหรับ User, Student, StudentDocument, DocumentStatusHistory และ AuditLog

### สถานะ demo
- UI และ interaction ทำงานผ่าน Next.js + TypeScript + MUI
- Dashboard, Students และ Student Detail ใช้ synthetic in-memory data
- Prisma/MySQL เป็น persistence foundation ที่เตรียมไว้ แต่ยังไม่ได้เชื่อม query/action จริงใน demo รุ่นเล็ก
- ยังไม่มี production authentication หรือ private object storage

## 2026-11-11 — Login and Dashboard Foundation

### ทำเสร็จแล้ว
- ใช้โครงสร้าง Next.js ที่มีอยู่เดิมต่อโดยไม่สร้างทับโปรเจกต์ใหม่
- เพิ่ม `lib/demo-data.ts` สำหรับ Admin, Staff และ synthetic students
- เพิ่ม Login page ที่ใช้งานผ่าน `/api/auth/login`
- เพิ่ม Admin/Staff demo role ใน httpOnly session cookie
- เพิ่ม server-side middleware guard สำหรับ `/dashboard` และ `/login`
- เพิ่ม Dashboard route แยกที่ `/dashboard`
- เพิ่ม summary cards และ latest students table
- เพิ่ม logout navigation flow

### บัญชี Demo
- Admin: `admin@thedna.demo` / `demo1234`
- Staff: `staff@thedna.demo` / `demo1234`

### ขั้นตอนถัดไป
- ตรวจ TypeScript และ production build
- รอคำสั่งถัดไปก่อนเริ่ม Student Management, Documents และ User Management

## 2026-11-11 — Verification Result

### ผลการตรวจสอบ
- `npx tsc --noEmit` ผ่าน
- `npm run build` ผ่าน
- Routes ที่พร้อมใช้งาน: `/login`, `/dashboard`, `/api/auth/login`, `/api/auth/logout`
- Middleware guard ทำงานกับ `/dashboard` และ `/login`

### จบงานตาม phase ที่ร้องขอ
- Project structure foundation
- Layout foundation
- Login
- Dashboard

หยุดรอคำสั่งถัดไปก่อนเริ่ม Student Management, Passport/Visa, Document Tracking และ User Management

## 2026-11-11 — Code Formatting

### ทำเสร็จแล้ว
- ตรวจพบ extensions: Prettier, ESLint และ Prettier ESLint
- ใช้ Prettier จัดรูปแบบไฟล์ TypeScript, TSX, CSS, JSON และ YAML
- คง Prisma schema และ `.env.example` ไว้ เนื่องจากไม่รองรับ parser ของ Prettier โดยตรง
- จะตรวจ TypeScript และ production build หลังจัดรูปแบบอีกครั้ง

## 2026-11-11 — Prisma Setup Recovery

### ทำเสร็จแล้ว
- เพิ่ม MUI DataGrid, React Hook Form, Zod และ Prisma dependencies
- ปรับ Prisma เป็น version 6.19.0 ให้เข้ากับ project environment
- แก้ `prisma/schema.prisma` ให้เป็นมาตรฐาน multiline schema

## 2026-11-11 — Student Management Foundation

### ทำเสร็จแล้ว
- Generate Prisma Client สำเร็จ
- เพิ่ม Prisma singleton service
- เพิ่ม seed script สำหรับนักเรียนจำลอง 20 คน
- เพิ่ม scripts `db:generate`, `db:push`, `db:seed`
- เพิ่ม Students API สำหรับค้นหา/กรอง/สร้างข้อมูล
- เพิ่ม Students page ด้วย MUI DataGrid พร้อม pagination, search และ status filter
- เพิ่ม Student Detail route พร้อม Overview, Documents และ Activity tabs foundation

### ขั้นตอนถัดไป
- เชื่อม MySQL ด้วย `docker compose up -d mysql`
- รัน `npm run db:push` และ `npm run db:seed`
- เพิ่ม edit form และ document/activity CRUD ให้สมบูรณ์

### ขั้นตอนถัดไป
- Generate Prisma client
- เพิ่ม Prisma service, CRUD API, seed 20 students และ Docker MySQL workflow

## 2026-11-11 — Structure Audit

### ตรวจพบ
- Dashboard ใช้ `lib/demo-data.ts` แยกจาก Students ที่ใช้ Prisma
- Dashboard, Students และ Student Detail ยังไม่มี shared Sidebar/Header
- Student Detail ใช้ Student ID จาก Prisma แล้ว แต่ Documents/Activity ยังเป็น static tabs
- มี static prototype files ระดับ root ที่ไม่ใช่ Next.js routes

### เริ่มแก้ไข
- เพิ่ม `components/AppShell.tsx` เป็น shared Sidebar/Header สำหรับรวมระบบเดิม

### ตรวจสอบหลังรวมระบบ
- `npx tsc --noEmit` ผ่าน
- `npm run build` ผ่าน
- Routes ที่ตรวจพบและ build สำเร็จ: `/login`, `/dashboard`, `/students`, `/students/[id]`, `/api/students`, `/api/auth/login`, `/api/auth/logout`
- Students และ Student Detail ใช้ Prisma/Student ID ชุดเดียวกัน

## 2026-11-11 — Sign-out Fix

### ทำเสร็จแล้ว
- เปลี่ยนปุ่ม Sign out เป็น POST form ไปที่ `/api/auth/logout`
- เปลี่ยน logout route ให้ลบ `dna_session` และ redirect ไป `/login`
- ป้องกันไม่ให้ผู้ใช้กดออกแล้วถูก middleware ส่งกลับเข้า Dashboard ด้วย session เดิม

## 2026-11-11 — RBAC Enforcement

### ทำเสร็จแล้ว
- เพิ่ม `requireAdmin()` สำหรับ server-side authorization
- เพิ่ม Admin-only `/users` page และ `/api/users` GET/POST
- Staff ถูกปฏิเสธ User Management ด้วย redirect/API 403
- เพิ่ม session guard ให้ `/students` และ `/users`
- เพิ่ม auth checks ให้ Student API
- เพิ่ม Argon2id hashing สำหรับ user creation
- เอกสารยังคงถูกป้องกันด้วย session check ใน upload/download/status APIs

## 2026-11-12 — Dynamic RBAC Foundation

### ทำเสร็จแล้ว
- เพิ่ม Role, Permission, RolePermission และ UserRole ใน Prisma schema
- เปลี่ยน enum Role เดิมเป็น LegacyRole เพื่อไม่ชนกับ Dynamic Role model
- เพิ่ม permission catalog แบบ `module:action`
- เพิ่ม `getUserPermissions`, `hasPermission` และ `requirePermission`
- เพิ่ม seed script สำหรับ default roles: Super Admin, Admin, Staff, Viewer
- เพิ่ม `db:seed:rbac` script
- ตรวจ build สำเร็จหลังแก้ schema

### หมายเหตุ
- Prisma generate พบ EPERM จาก query engine ที่ถูก process อื่นล็อก แต่ production build และ typecheck ผ่าน
- ขั้นตอนต่อไปคือ Role Management UI, Permission Matrix และการเปลี่ยน API authorization จาก legacy role เป็น dynamic permission

## 2026-11-12 — Role Management UI

### ทำเสร็จแล้ว
- เพิ่ม `/roles` ภายใต้ AppShell เดิม
- เพิ่ม `/api/roles` สำหรับอ่านและสร้าง custom role
- เพิ่ม `/api/roles/[id]/permissions` สำหรับบันทึก permission matrix แบบ transaction
- เพิ่ม `/api/permissions` สำหรับ permission catalog
- เพิ่ม checkbox permission matrix และ system role lock
- เพิ่ม Role Management ใน Sidebar เดิม
- แก้ MUI Grid type compatibility ใน Role Management

## 2026-11-12 — Premium Dashboard UX

### ทำเสร็จแล้ว
- ปรับเฉพาะ `app/dashboard/page.tsx` ตาม `SKILL.md`
- ใช้ AppShell, auth session, demo data และ existing routes เดิม
- ตัด header ซ้ำภายในหน้า Dashboard ออก
- ปรับ page hierarchy, title area และ primary actions
- ปรับ KPI cards ให้มี tone, icon, trend/detail และ spacing แบบ enterprise SaaS
- เพิ่ม status overview พร้อม donut-style visualization และ progress indicator
- เพิ่ม recent activity panel
- ปรับ latest students section ให้สแกนข้อมูลได้เร็วขึ้น
- รองรับ responsive layout ผ่าน MUI Grid/Stack

### Verification
- `npx tsc --noEmit` ผ่าน
- `npm run build` ผ่าน
- ยังไม่ได้ปรับหน้าอื่นตามคำสั่งให้หยุดรอ UI review

## 2026-11-12 — Roles Access Fix

### ทำเสร็จแล้ว
- เพิ่ม `/roles` เข้า middleware session guard
- ป้องกัน Roles page ไม่ให้ crash เมื่อ API ตอบ `403`
- เพิ่ม Access Denied state สำหรับ Staff/non-admin
- คง backend `requireAdmin()` เป็น authorization หลัก

## 2026-11-12 — Permission-based Sidebar

### ทำเสร็จแล้ว
- เพิ่ม `/api/me/permissions` ให้คืน effective permissions จาก server session/database
- ปรับ `AppShell` ให้กรองเมนูด้วย permission code
- ผู้ใช้ที่ไม่มี permission จะไม่เห็นเมนูนั้นใน Sidebar
- Admin ใช้ wildcard permission เพื่อแสดงเมนูทั้งหมด
- จัดรูปแบบ `AppShell` และโค้ดที่เกี่ยวข้องให้อ่านง่ายขึ้น

## 2026-11-12 — Full Code Formatting

### ทำเสร็จแล้ว
- เพิ่ม Prettier `3.6.2` เป็น dev dependency
- จัดรูปแบบไฟล์ทั้งหมดใน `app/`, `components/`, `lib/`, `middleware.ts`, `package.json` และ `tsconfig.json`
- จัดรูปแบบ Prisma schema ด้วย `prisma format`
- คง business logic, routes, APIs และ permission checks เดิมทั้งหมด

## 2026-11-12 — Super Admin Permission Control

### ทำเสร็จแล้ว
- เพิ่ม server-side `isSuperAdmin()` จาก Dynamic Role ใน MySQL
- เพิ่ม `requireRoleManagement()` สำหรับ Role Permission mutation
- Super Admin สามารถแก้ไข Permission ของ System Role ได้
- Role อื่นยังไม่สามารถแก้ไข System Role ได้
- UI ปลดล็อก checkbox และ Save เมื่อ session เป็น Super Admin
- จัดรูปแบบไฟล์ที่แก้ไขด้วย Prettier และตรวจ build สำเร็จ

## 2026-11-12 — Thai UI Localization

### ทำเสร็จแล้ว
- แปลข้อความหลักใน Sidebar, Login, Users, Roles, Students และ Student Detail เป็นภาษาไทย
- คง permission codes, route names, API contracts, database fields และ business logic เป็นภาษาอังกฤษตามเดิม
- เปลี่ยน metadata ของระบบเป็นภาษาไทย

## 2026-11-12 — User Role Editing

### ทำเสร็จแล้ว
- เพิ่ม `PATCH /api/users/[id]` สำหรับเปลี่ยน Role และสถานะผู้ใช้งาน
- จำกัด mutation ให้ Admin เท่านั้น
- เพิ่ม dropdown Role ในหน้า User Management
- บันทึก Role ลง MySQL ผ่าน Prisma
- ป้องกันการลดสิทธิ์หรือปิดใช้งาน Admin คนสุดท้าย
- เพิ่ม loading/error/success feedback ระดับหน้า

## 2026-11-12 — Dynamic User Role Assignment

### ทำเสร็จแล้ว
- User Management โหลด Roles จาก MySQL ผ่าน `/api/roles`
- เปลี่ยนจาก single hardcoded role เป็น multi-role assignment ผ่าน `UserRole`
- เพิ่ม multi-select สำหรับกำหนดหลาย Role ให้ User
- บันทึก Role assignment ด้วย Prisma transaction
- คำนวณ legacy role เพื่อรองรับ authentication เดิม
- ตรวจสอบว่า Role ที่เลือกมีอยู่จริงใน database

## 2026-11-12 — MySQL User and Permission Source of Truth

### ทำเสร็จแล้ว
- เปลี่ยน Login ให้ค้นหาและ verify User จาก Prisma/MySQL โดยตรง
- ย้าย demo Admin/Staff ออกจาก in-memory `demoUsers` สำหรับ authentication
- ปรับ `seed-rbac.ts` ให้ seed Users, Roles, Permissions, UserRole และ RolePermission
- ใช้ Argon2id hash ตอน seed password
- กำหนด permission ของ Admin และ Staff ใน database

### วิธีใช้งาน
- รัน `npm run db:push`
- รัน `npm run db:seed:rbac`
- Login ด้วย `admin@thedna.demo` หรือ `staff@thedna.demo` และ password `demo1234`

### ขั้นตอนถัดไป
- เชื่อม User Management กับหลาย roles และ role assignment
- เปลี่ยน API authorization ที่เหลือให้ใช้ dynamic permission โดยตรง
- เพิ่ม automated RBAC tests

### ตรวจสอบ
- จะรัน TypeScript และ production build หลังแก้ import authorization

## 2026-11-11 — Password Security Hardening

### ทำเสร็จแล้ว
- เพิ่ม `argon2` และใช้ Argon2id สำหรับตรวจสอบ password
- เปลี่ยน demo users จาก plaintext password เป็น `passwordHash`
- Normalize email ด้วย trim และ lowercase ก่อนค้นหา
- ตรวจสอบ password ด้วย Argon2id ใน server route เท่านั้น
- ไม่ hash username/email เพราะต้องใช้เป็น identifier สำหรับ login และ unique lookup

### หมายเหตุด้าน Cyber Security
- Demo password ที่ใช้ทดลองยังเป็น `demo1234` แต่ source code ไม่เก็บค่า plaintext แล้ว
- Production ควรเพิ่ม rate limiting, MFA, breached-password check, secret management และ audit monitoring

