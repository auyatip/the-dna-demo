"use client";

import { useEffect, useMemo, useState } from "react";
import { Alert, Avatar, Box, Button, Checkbox, Chip, Container, Dialog, DialogActions, DialogContent, DialogTitle, InputAdornment, ListItemText, MenuItem, Paper, Select, Snackbar, Stack, TextField, Typography } from "@mui/material";
import { Icon } from "@iconify/react";
import AppShell from "@/components/AppShell";

type Role = { id: string; name: string; code: string };
type User = { id: string; name: string; email: string; role: "ADMIN" | "STAFF"; isActive: boolean; userRoles?: { role: Role }[]; roles?: Role[] };
const empty = { name: "", email: "", password: "", role: "STAFF" };

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [pendingRoles, setPendingRoles] = useState<Record<string, string[]>>({});
  const [q, setQ] = useState("");
  const [status, setStatus] = useState<"ALL" | "ACTIVE" | "INACTIVE">("ALL");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(empty);
  const [saving, setSaving] = useState(false);

  const load = () => Promise.all([fetch("/api/users"), fetch("/api/roles")]).then(async ([u, r]) => {
    if (!u.ok || !r.ok) throw new Error("ไม่สามารถโหลดข้อมูลผู้ใช้งานได้");
    setUsers(await u.json()); setRoles(await r.json());
  }).catch(e => setError(e.message));
  useEffect(() => { load(); }, []);

  const roleIds = (u: User) => u.roles?.map(r => r.id) || u.userRoles?.map(r => r.role.id) || [];
  const visibleRoleIds = (u: User) => pendingRoles[u.id] ?? roleIds(u);
  const update = async (id: string, ids: string[], isActive?: boolean) => {
    const r = await fetch(`/api/users/${id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ roleIds: ids, isActive }) });
    if (!r.ok) {
      setError((await r.json()).message); return;
    }
    const next = await r.json();
    setUsers(items => items.map(u => u.id === id ? next : u));
    if (isActive === undefined) setPendingRoles(items => { const nextItems = { ...items }; delete nextItems[id]; return nextItems; });
    setMessage("บันทึกการเปลี่ยนแปลงแล้ว");
  };
  const create = async () => {
    setSaving(true);
    const r = await fetch("/api/users", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    if (!r.ok) { setError((await r.json()).message || "เพิ่มผู้ใช้งานไม่สำเร็จ"); setSaving(false); return; }
    setOpen(false); setForm(empty); setSaving(false); setMessage("เพิ่มผู้ใช้งานสำเร็จ"); load();
  };
  const filtered = useMemo(() => users.filter(u => {
    const matchesQuery = `${u.name} ${u.email}`.toLowerCase().includes(q.toLowerCase());
    return matchesQuery && (status === "ALL" || (status === "ACTIVE" ? u.isActive : !u.isActive));
  }), [users, q, status]);
  const activeCount = users.filter(u => u.isActive).length;
  const adminCount = users.filter(u => u.role === "ADMIN").length;

  return <AppShell active="users"><Container maxWidth="lg" sx={{ py: { xs: 3, md: 5 } }}>
    <Stack direction={{ xs: "column", sm: "row" }} justifyContent="space-between" alignItems={{ xs: "stretch", sm: "center" }} spacing={2} mb={3}>
      <Stack direction="row" spacing={1.5} alignItems="center"><Box sx={{ width: 48, height: 48, borderRadius: 3, bgcolor: "#eef0ff", color: "#5661d9", display: "grid", placeItems: "center" }}><Icon icon="solar:users-group-rounded-bold-duotone" width={27} /></Box><Box><Typography className="font-display" variant="h4" fontWeight={800} letterSpacing="-.04em">จัดการผู้ใช้งาน</Typography><Typography variant="body2" color="text.secondary">จัดการสมาชิก บทบาท และสิทธิ์การเข้าถึงระบบ</Typography></Box></Stack>
      <Button startIcon={<Icon icon="solar:user-plus-bold" width={20} />} variant="contained" onClick={() => setOpen(true)} sx={{ borderRadius: 2.5, px: 2.2, py: 1.2, fontWeight: 800 }}>เพิ่มผู้ใช้งาน</Button>
    </Stack>

    <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5} mb={3}>
      {[["ผู้ใช้งานทั้งหมด", users.length, "#5661d9", "solar:users-group-rounded-bold-duotone"], ["กำลังใช้งาน", activeCount, "#269b83", "solar:check-circle-bold-duotone"], ["ผู้ดูแลระบบ", adminCount, "#e1816d", "solar:shield-user-bold-duotone"]].map(([label, value, color, icon]) => <Paper key={String(label)} elevation={0} sx={{ flex: 1, p: 2, border: "1px solid #e7edf3", borderRadius: 3, display: "flex", alignItems: "center", gap: 1.5 }}><Box sx={{ width: 38, height: 38, borderRadius: 2, bgcolor: `${color}15`, color, display: "grid", placeItems: "center" }}><Icon icon={String(icon)} width={21} /></Box><Box><Typography variant="caption" color="text.secondary">{label}</Typography><Typography variant="h5" fontWeight={800} lineHeight={1.1}>{value}</Typography></Box></Paper>)}
    </Stack>

    <Paper elevation={0} sx={{ p: { xs: 1.5, sm: 2 }, mb: 2, border: "1px solid #e7edf3", borderRadius: 3 }}>
      <Stack direction={{ xs: "column", sm: "row" }} spacing={1.2}>
        <TextField fullWidth size="small" placeholder="ค้นหาด้วยชื่อหรืออีเมล..." value={q} onChange={e => setQ(e.target.value)} InputProps={{ startAdornment: <InputAdornment position="start"><Icon icon="solar:magnifer-linear" width={20} color="#78819a" /></InputAdornment>, endAdornment: q && <Button size="small" onClick={() => setQ("")} sx={{ minWidth: 0, color: "#78819a" }}><Icon icon="solar:close-circle-bold" width={18} /></Button> }} />
        <Select size="small" value={status} onChange={e => setStatus(e.target.value as typeof status)} sx={{ minWidth: { xs: "100%", sm: 170 }, borderRadius: 2 }}><MenuItem value="ALL">ผู้ใช้งานทั้งหมด</MenuItem><MenuItem value="ACTIVE">กำลังใช้งาน</MenuItem><MenuItem value="INACTIVE">ปิดใช้งาน</MenuItem></Select>
      </Stack>
      <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 1.2 }}>แสดง {filtered.length} จาก {users.length} ผู้ใช้งาน</Typography>
    </Paper>

    {error && <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError("")}>{error}</Alert>}
    <Stack spacing={1.2}>{filtered.map(user => <Paper key={user.id} elevation={0} sx={{ p: { xs: 1.5, sm: 2 }, border: "1px solid #e7edf3", borderRadius: 3, transition: "all .2s", "&:hover": { borderColor: "#c9cffc", boxShadow: "0 8px 24px rgba(40,50,120,.08)" } }}>
      <Stack direction={{ xs: "column", md: "row" }} spacing={2} alignItems={{ md: "center" }} justifyContent="space-between">
        <Stack direction="row" spacing={1.5} alignItems="center" minWidth={240}><Avatar sx={{ width: 42, height: 42, bgcolor: user.role === "ADMIN" ? "#e8eaff" : "#fff0eb", color: user.role === "ADMIN" ? "#5661d9" : "#eb806d", fontWeight: 800 }}>{user.name.charAt(0).toUpperCase()}</Avatar><Box minWidth={0}><Typography fontWeight={800} noWrap>{user.name}</Typography><Typography variant="body2" color="text.secondary" noWrap>{user.email}</Typography></Box></Stack>
        <Stack direction={{ xs: "column", sm: "row" }} spacing={1} alignItems={{ sm: "center" }} sx={{ width: { xs: "100%", md: "auto" } }}><Chip icon={<Icon icon={user.isActive ? "solar:check-circle-bold" : "solar:close-circle-bold"} width={16} />} label={user.isActive ? "กำลังใช้งาน" : "ปิดใช้งาน"} size="small" color={user.isActive ? "success" : "default"} sx={{ alignSelf: { xs: "flex-start", sm: "auto" } }} /><Select multiple size="small" value={visibleRoleIds(user)} displayEmpty renderValue={selected => { const selectedIds = selected as string[]; const selectedRoles = roles.filter(role => selectedIds.includes(role.id)); return <Stack direction="row" spacing={.5} sx={{ overflow: "hidden", maxWidth: { xs: "100%", sm: 230 } }}>{selectedRoles.length ? selectedRoles.map(role => <Chip key={role.id} label={role.name} size="small" sx={{ height: 24, fontSize: 11 }} />) : <Typography variant="body2" color="text.secondary">ยังไม่ได้มอบ Role</Typography>}</Stack>; }} onChange={e => setPendingRoles(items => ({ ...items, [user.id]: e.target.value as string[] }))} sx={{ minWidth: { xs: "100%", sm: 230 }, borderRadius: 2 }}><MenuItem disabled value=""><em>เลือก Role ที่ต้องการ</em></MenuItem>{roles.map(role => { const checked = visibleRoleIds(user).includes(role.id); return <MenuItem value={role.id} key={role.id}><Checkbox size="small" checked={checked} sx={{ p: .5, mr: 1 }} /><ListItemText primary={role.name} secondary={role.code} /></MenuItem>; })}</Select>{pendingRoles[user.id] && <Button size="small" variant="contained" onClick={() => update(user.id, pendingRoles[user.id])} sx={{ whiteSpace: "nowrap" }}>บันทึก Role</Button>}<Button size="small" color={user.isActive ? "error" : "success"} onClick={() => update(user.id, visibleRoleIds(user), !user.isActive)} sx={{ whiteSpace: "nowrap" }}>{user.isActive ? "ปิดใช้งาน" : "เปิดใช้งาน"}</Button></Stack>
      </Stack>
    </Paper>)}</Stack>
    {filtered.length === 0 && <Paper sx={{ p: 6, textAlign: "center", border: "1px dashed #ccd2e4", borderRadius: 3 }}><Icon icon="solar:user-search-bold-duotone" width={42} color="#aab2c9" /><Typography mt={1} color="text.secondary">ไม่พบผู้ใช้งานที่ตรงกับการค้นหา</Typography><Button size="small" onClick={() => { setQ(""); setStatus("ALL"); }} sx={{ mt: 1 }}>ล้างตัวกรอง</Button></Paper>}

    <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm" PaperProps={{ sx: { borderRadius: 3 } }}><DialogTitle><Stack direction="row" spacing={1.2} alignItems="center"><Icon icon="solar:user-plus-bold-duotone" width={26} color="#5661d9" /><Box><Typography fontWeight={800}>เพิ่มผู้ใช้งาน</Typography><Typography variant="body2" color="text.secondary">สร้างบัญชีใหม่สำหรับทีมงาน</Typography></Box></Stack></DialogTitle><DialogContent><Stack spacing={2} mt={1}><TextField label="ชื่อ-นามสกุล" required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} /><TextField label="อีเมล" type="email" required value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} /><TextField label="รหัสผ่าน" type="password" required value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} /><TextField select label="บทบาทเริ่มต้น" value={form.role} onChange={e => setForm({ ...form, role: e.target.value })}><MenuItem value="STAFF">Staff</MenuItem><MenuItem value="ADMIN">Admin</MenuItem></TextField></Stack></DialogContent><DialogActions sx={{ px: 3, pb: 2 }}><Button onClick={() => setOpen(false)}>ยกเลิก</Button><Button variant="contained" onClick={create} disabled={saving}>{saving ? "กำลังสร้าง..." : "สร้างผู้ใช้งาน"}</Button></DialogActions></Dialog><Snackbar open={!!message} autoHideDuration={2500} onClose={() => setMessage("")}><Alert severity="success">{message}</Alert></Snackbar>
  </Container></AppShell>;
}
