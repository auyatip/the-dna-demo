"use client";
import { FormEvent, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Container,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("admin@thedna.demo");
  const [password, setPassword] = useState("demo1234");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  async function submit(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError("");
    const result = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (!result.ok) {
      setError("อีเมลหรือรหัสผ่านไม่ถูกต้อง");
      setLoading(false);
      return;
    }
    router.push("/dashboard");
    router.refresh();
  }
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        background: "linear-gradient(135deg,#202a4c 0%,#5661d9 100%)",
        p: 2,
      }}
    >
      <Container maxWidth="sm">
        <Card sx={{ borderRadius: 4 }}>
          <CardContent sx={{ p: { xs: 3, sm: 6 } }}>
            <Typography className="font-display" variant="h5" fontWeight={700}>
              ● The DNA{" "}
              <Typography
                component="span"
                color="primary"
                fontSize={11}
                fontWeight={800}
              >
                DEMO
              </Typography>
            </Typography>
            <Typography
              className="font-display"
              variant="h4"
              fontWeight={600}
              mt={6}
            >
              ยินดีต้อนรับกลับ
            </Typography>
            <Typography color="text.secondary" mb={4}>
              เข้าสู่ระบบจัดการข้อมูลนักเรียน
            </Typography>
            <form onSubmit={submit}>
              <Stack spacing={2.5}>
                {error && <Alert severity="error">{error}</Alert>}
                <TextField
                  label="อีเมล"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <TextField
                  label="รหัสผ่าน"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  disabled={loading}
                >
                  {loading ? (
                    <CircularProgress size={22} color="inherit" />
                  ) : (
                    "เข้าสู่ระบบ"
                  )}
                </Button>
              </Stack>
            </form>
            <Typography color="text.secondary" fontSize={12} mt={3}>
              Admin: admin@thedna.demo · Staff: staff@thedna.demo · รหัสผ่าน:
              demo1234
            </Typography>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}
