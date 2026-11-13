"use client";

import { FormEvent, useState } from "react";
import { Alert, Avatar, Box, Button, Card, CardContent, CircularProgress, Divider, Stack, TextField, Typography } from "@mui/material";
import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";

const demoAccounts = [
  { name: "Alex Davis", role: "Administrator", email: "admin@thedna.demo", color: "#5965dc", icon: "solar:shield-user-bold-duotone" },
  { name: "Jamie Lee", role: "Staff member", email: "staff@thedna.demo", color: "#e1816d", icon: "solar:user-id-bold-duotone" },
];

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("admin@thedna.demo");
  const [password, setPassword] = useState("demo1234");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e: FormEvent) {
    e.preventDefault(); setLoading(true); setError("");
    const response = await fetch("/api/auth/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email, password }) });
    if (!response.ok) { setError("อีเมลหรือรหัสผ่านไม่ถูกต้อง"); setLoading(false); return; }
    router.push("/dashboard"); router.refresh();
  }

  function selectAccount(account: (typeof demoAccounts)[number]) { setEmail(account.email); setPassword("demo1234"); setError(""); }

  return <Box sx={{ minHeight: "100vh", display: "grid", placeItems: "center", p: { xs: 2, md: 4 }, background: "#f7f8fc" }}>
    <Card sx={{ width: "100%", maxWidth: 1060, overflow: "hidden", borderRadius: 5, border: "1px solid #e7eaf2", boxShadow: "0 24px 70px rgba(37,43,87,.12)" }}>
      <Stack direction={{ xs: "column", md: "row" }}>
        <Box sx={{ flex: 1, minHeight: { md: 650 }, p: { xs: 4, md: 7 }, color: "#fff", position: "relative", overflow: "hidden", background: "linear-gradient(145deg, #202b51 0%, #4e5bc4 100%)" }}>
          <Box sx={{ position: "relative", zIndex: 1 }}>
            <Stack direction="row" spacing={1.2} alignItems="center"><Box sx={{ width: 38, height: 38, display: "grid", placeItems: "center", borderRadius: 2.5, border: "1px solid rgba(255,255,255,.35)", fontWeight: 800, fontSize: 20 }}>D</Box><Typography fontWeight={800}>DEMO PERMISSION</Typography></Stack>
            <Typography sx={{ mt: { xs: 8, md: 15 }, color: "#c5cbef", letterSpacing: ".16em", fontWeight: 800, fontSize: 11 }}>STUDENT OPERATIONS</Typography>

          </Box>
          <Box sx={{ position: "absolute", width: 390, height: 390, right: -155, bottom: -145, border: "1px solid rgba(190,199,255,.45)", borderRadius: "50%", boxShadow: "0 0 0 48px rgba(190,199,255,.08), 0 0 0 100px rgba(190,199,255,.05)" }} />
        </Box>
        <CardContent sx={{ width: { md: 510 }, p: { xs: 4, sm: 6, md: 7 } }}>
          <Typography className="font-display" variant="h4" fontWeight={800} letterSpacing="-.04em">ยินดีต้อนรับกลับ</Typography><Typography color="text.secondary" sx={{ mt: 1 }}>เข้าสู่ระบบเพื่อเริ่มจัดการ workspace ของคุณ</Typography>
          <Box component="form" onSubmit={submit} sx={{ mt: 4 }}><Stack spacing={2.2}>{error && <Alert severity="error">{error}</Alert>}<TextField label="อีเมล" type="email" value={email} onChange={e => setEmail(e.target.value)} required autoComplete="email" fullWidth /><TextField label="รหัสผ่าน" type="password" value={password} onChange={e => setPassword(e.target.value)} required autoComplete="current-password" fullWidth /><Button type="submit" variant="contained" size="large" fullWidth disabled={loading} startIcon={loading ? <CircularProgress size={18} color="inherit" /> : <Icon icon="solar:login-3-bold" width={19} />} sx={{ py: 1.5, borderRadius: 2.5, fontWeight: 800 }}>{loading ? "กำลังเข้าสู่ระบบ..." : "เข้าสู่ระบบ"}</Button></Stack></Box>
          <Divider sx={{ my: 3 }}>หรือทดลองใช้บัญชี Demo</Divider>
          <Stack spacing={1.2}>{demoAccounts.map(account => <Button key={account.email} onClick={() => selectAccount(account)} variant="outlined" sx={{ p: 1.2, justifyContent: "flex-start", textTransform: "none", borderRadius: 2.5, borderColor: "#e4e7f0", color: "#18213d", '&:hover': { borderColor: account.color, bgcolor: `${account.color}08` } }}><Avatar sx={{ width: 36, height: 36, mr: 1.4, bgcolor: `${account.color}18`, color: account.color }}><Icon icon={account.icon} width={21} /></Avatar><Box sx={{ textAlign: "left", minWidth: 0 }}><Typography fontWeight={800} fontSize={13}>{account.name} <Box component="span" sx={{ color: account.color, fontSize: 11, ml: .5 }}>{account.role}</Box></Typography><Typography variant="caption" color="text.secondary" sx={{ display: "block", overflow: "hidden", textOverflow: "ellipsis" }}>{account.email}</Typography></Box></Button>)}</Stack>
          <Typography color="text.secondary" fontSize={11} textAlign="center" sx={{ mt: 2.5 }}>รหัสผ่าน Demo: <Box component="span" fontWeight={800}>demo1234</Box></Typography>
        </CardContent>
      </Stack>
    </Card>
  </Box>;
}
