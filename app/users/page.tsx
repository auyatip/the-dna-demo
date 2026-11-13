"use client";
import { useEffect, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Chip,
  Container,
  MenuItem,
  Paper,
  Select,
  Snackbar,
  Stack,
  Typography,
} from "@mui/material";
import AppShell from "@/components/AppShell";
type Role = { id: string; name: string; code: string };
type User = {
  id: string;
  name: string;
  email: string;
  role: "ADMIN" | "STAFF";
  isActive: boolean;
  userRoles?: { role: Role }[];
  roles?: Role[];
};
export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  useEffect(() => {
    Promise.all([fetch("/api/users"), fetch("/api/roles")])
      .then(async ([usersResponse, rolesResponse]) => {
        if (!usersResponse.ok || !rolesResponse.ok)
          throw new Error("คุณไม่มีสิทธิ์เข้าถึงหน้านี้");
        const [u, r] = await Promise.all([
          usersResponse.json(),
          rolesResponse.json(),
        ]);
        setUsers(u);
        setRoles(r);
      })
      .catch((e) => setError(e.message));
  }, []);
  const getRoleIds = (user: User) =>
    user.roles?.map((r) => r.id) || user.userRoles?.map((r) => r.role.id) || [];
  const updateRoles = async (id: string, roleIds: string[]) => {
    const r = await fetch(`/api/users/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ roleIds }),
    });
    if (!r.ok) {
      const data = await r.json();
      setError(data.message);
      return;
    }
    const updated = await r.json();
    setUsers((items) => items.map((user) => (user.id === id ? updated : user)));
    setMessage("บันทึกบทบาทผู้ใช้งานเรียบร้อยแล้ว");
  };
  return (
    <AppShell active="users">
      <Container maxWidth="lg" sx={{ py: 5 }}>
        {error ? (
          <Alert severity="error">{error}</Alert>
        ) : (
          <>
            <Stack direction="row" justifyContent="space-between" mb={3}>
              <Box>
                <Typography className="font-display" variant="h4">
                  จัดการผู้ใช้งาน
                </Typography>
                <Typography color="text.secondary">
                  กำหนดบทบาทจากฐานข้อมูลโดยตรง
                </Typography>
              </Box>
              <Button variant="contained">เพิ่มผู้ใช้งาน</Button>
            </Stack>
            <Paper variant="outlined" sx={{ p: 2 }}>
              {users.map((user) => (
                <Stack
                  key={user.id}
                  direction={{ xs: "column", sm: "row" }}
                  spacing={2}
                  justifyContent="space-between"
                  alignItems={{ sm: "center" }}
                  sx={{ p: 2, borderBottom: "1px solid #f0f1f5" }}
                >
                  <Box>
                    <Typography fontWeight={700}>{user.name}</Typography>
                    <Typography color="text.secondary" fontSize={13}>
                      {user.email}
                    </Typography>
                  </Box>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Chip
                      label={user.isActive ? "ใช้งานอยู่" : "ปิดใช้งาน"}
                      size="small"
                      color={user.isActive ? "success" : "default"}
                    />
                    <Select
                      multiple
                      size="small"
                      value={getRoleIds(user)}
                      displayEmpty
                      renderValue={(selected) =>
                        `${(selected as string[]).length} บทบาท`
                      }
                      onChange={(e) =>
                        updateRoles(user.id, e.target.value as string[])
                      }
                      sx={{ minWidth: 190 }}
                    >
                      {roles.map((role) => (
                        <MenuItem value={role.id} key={role.id}>
                          {role.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </Stack>
                </Stack>
              ))}
            </Paper>
          </>
        )}
      </Container>
      <Snackbar
        open={!!message}
        autoHideDuration={2500}
        onClose={() => setMessage("")}
      >
        <Alert severity="success">{message}</Alert>
      </Snackbar>
    </AppShell>
  );
}
