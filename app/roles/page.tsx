"use client";
import { useEffect, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Checkbox,
  Chip,
  Container,
  Divider,
  Paper,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import AppShell from "@/components/AppShell";
type Permission = { id: string; code: string; module: string; action: string };
type Role = {
  id: string;
  name: string;
  code: string;
  isSystem: boolean;
  permissions: { permission: Permission }[];
  _count: { users: number };
};
export default function RolesPage() {
  const [roles, setRoles] = useState<Role[]>([]);
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [selected, setSelected] = useState<Role | null>(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [superAdmin, setSuperAdmin] = useState(false);
  useEffect(() => {
    Promise.all([
      fetch("/api/roles"),
      fetch("/api/permissions"),
      fetch("/api/me/permissions"),
    ])
      .then(async ([rolesResponse, permissionsResponse, meResponse]) => {
        if (!rolesResponse.ok || !permissionsResponse.ok) {
          setError("You do not have permission to access Role Management.");
          return;
        }
        const [r, p, me] = await Promise.all([
          rolesResponse.json(),
          permissionsResponse.json(),
          meResponse.json(),
        ]);
        setRoles(r);
        setPermissions(p);
        setSuperAdmin(!!me.isSuperAdmin);
        setSelected(r[0]);
      })
      .catch(() => setError("Unable to load roles."));
  }, []);
  const toggle = (id: string) => {
    if (!selected) return;
    const ids = selected.permissions.map((x) => x.permission.id);
    const next = ids.includes(id) ? ids.filter((x) => x !== id) : [...ids, id];
    setSelected({
      ...selected,
      permissions: next.map((x) => ({
        permission: permissions.find((p) => p.id === x)!,
      })),
    });
  };
  const save = async () => {
    if (!selected) return;
    const r = await fetch(`/api/roles/${selected.id}/permissions`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        permissionIds: selected.permissions.map((x) => x.permission.id),
      }),
    });
    setMessage(r.ok ? "Permissions saved" : "Unable to save permissions");
  };
  const canEdit = !!selected && (!selected.isSystem || superAdmin);
  return (
    <AppShell active="roles">
      <Container maxWidth="xl" sx={{ py: 5 }}>
        {error ? (
          <Alert severity="error">{error}</Alert>
        ) : (
          <>
            <Typography className="font-display" variant="h4">
              Role Management
            </Typography>
            <Typography color="text.secondary" mb={4}>
              Configure roles and effective permissions.
            </Typography>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, md: 4 }}>
                <Paper variant="outlined" sx={{ p: 2 }}>
                  <Stack spacing={1}>
                    {roles.map((role) => (
                      <Button
                        key={role.id}
                        onClick={() => setSelected(role)}
                        variant={
                          selected?.id === role.id ? "contained" : "text"
                        }
                        sx={{ justifyContent: "space-between" }}
                      >
                        {role.name}
                        <Chip
                          label={`${role.permissions.length} permissions`}
                          size="small"
                        />
                      </Button>
                    ))}
                  </Stack>
                  <Divider sx={{ my: 2 }} />
                  <Stack spacing={2}>
                    <TextField size="small" label="New role name" />
                    <Button variant="outlined">Create custom role</Button>
                  </Stack>
                </Paper>
              </Grid>
              <Grid size={{ xs: 12, md: 8 }}>
                <Paper variant="outlined" sx={{ p: 3 }}>
                  <Stack direction="row" justifyContent="space-between">
                    <Box>
                      <Typography className="font-display" variant="h6">
                        {selected?.name || "Select a role"}
                      </Typography>
                      <Typography color="text.secondary" fontSize={13}>
                        {superAdmin
                          ? "Super Admin control enabled"
                          : "System roles are read-only"}
                      </Typography>
                    </Box>
                    <Button
                      variant="contained"
                      onClick={save}
                      disabled={!canEdit}
                    >
                      Save changes
                    </Button>
                  </Stack>
                  <Divider sx={{ my: 2 }} />
                  {permissions.map((permission) => (
                    <Stack
                      key={permission.id}
                      direction="row"
                      alignItems="center"
                      justifyContent="space-between"
                      sx={{ py: 1, borderBottom: "1px solid #f0f1f5" }}
                    >
                      <Box>
                        <Typography fontSize={14}>
                          {permission.module}
                        </Typography>
                        <Typography color="text.secondary" fontSize={12}>
                          {permission.code}
                        </Typography>
                      </Box>
                      <Checkbox
                        checked={
                          !!selected?.permissions.some(
                            (x) => x.permission.id === permission.id,
                          )
                        }
                        onChange={() => toggle(permission.id)}
                        disabled={!canEdit}
                      />
                    </Stack>
                  ))}
                </Paper>
              </Grid>
            </Grid>
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
