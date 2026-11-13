"use client";

import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Chip,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { Icon } from "@iconify/react";

type MenuItem = {
  id: string;
  icon: string;
  label: string;
  href: string;
  permission: string;
};

const menuItems: MenuItem[] = [
  {
    id: "dashboard",
    icon: "◈",
    label: "แดชบอร์ด",
    href: "/dashboard",
    permission: "dashboard:read",
  },
  {
    id: "students",
    icon: "◌",
    label: "นักเรียน",
    href: "/students",
    permission: "students:read",
  },
  // {
  //   id: "documents",
  //   icon: "▣",
  //   label: "เอกสาร",
  //   href: "/students",
  //   permission: "documents:read",
  // },
  {
    id: "users",
    icon: "♙",
    label: "จัดการผู้ใช้งาน",
    href: "/users",
    permission: "users:read",
  },
  {
    id: "roles",
    icon: "⚙",
    label: "จัดการบทบาทและสิทธิ์",
    href: "/roles",
    permission: "roles:read",
  },
];

export default function AppShell({
  children,
  active,
}: {
  children: React.ReactNode;
  active: string;
}) {
  const [permissions, setPermissions] = useState<string[] | null>(null);

  useEffect(() => {
    const cached = sessionStorage.getItem("dna_permissions");
    if (cached) {
      try {
        setPermissions(JSON.parse(cached));
        return;
      } catch {
        sessionStorage.removeItem("dna_permissions");
      }
    }
    fetch("/api/me/permissions", { cache: "no-store" })
      .then((response) => (response.ok ? response.json() : { permissions: [] }))
      .then((data) => {
        const nextPermissions = data.permissions || [];
        sessionStorage.setItem("dna_permissions", JSON.stringify(nextPermissions));
        setPermissions(nextPermissions);
      });
  }, []);

  const visibleItems = menuItems.filter(
    (item) =>
      permissions?.includes("*") || permissions?.includes(item.permission),
  );

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#f7f8fb" }}>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", md: "block" },
          width: 244,
          "& .MuiDrawer-paper": {
            width: 244,
            p: 2.5,
            borderRight: "1px solid #e8eaf0",
          },
        }}
      >
        <Typography className="font-display" fontWeight={700} fontSize={18}>
          ● The DNA{" "}
          <Chip
            label="DEMO"
            size="small"
            sx={{ ml: 1, height: 20, fontSize: 9 }}
          />
        </Typography>
        <Typography
          sx={{
            mt: 7,
            px: 1,
            fontSize: 10,
            letterSpacing: 2,
            color: "#a7aec0",
            fontWeight: 700,
          }}
        >
          เมนูระบบ
        </Typography>
        <List>
          {visibleItems.map((item) => (
            <ListItemButton
              key={item.id}
              component={Link}
              href={item.href}
              selected={active === item.id}
              sx={{ borderRadius: 2, mb: 0.5 }}
            >
              <ListItemIcon sx={{ minWidth: 34, color: active === item.id ? "primary.main" : "text.secondary" }}><Icon icon={item.id === "dashboard" ? "solar:widget-5-bold-duotone" : item.id === "students" ? "solar:users-group-rounded-bold-duotone" : item.id === "documents" ? "solar:folder-with-files-bold-duotone" : item.id === "users" ? "solar:user-id-bold-duotone" : "solar:shield-check-bold-duotone"} width={21} /></ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          ))}
        </List>
        <Box sx={{ mt: "auto", p: 1.5, bgcolor: "#f7f8fb", borderRadius: 2 }}>
          <Typography fontSize={12} fontWeight={700}>
            ✦ พื้นที่ทำงานส่วนตัว
          </Typography>
          <Typography fontSize={11} color="text.secondary">
            ข้อมูลตัวอย่างเท่านั้น
          </Typography>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flex: 1, minWidth: 0, pb: { xs: 8, md: 0 } }}>
        <Box
          sx={{
            height: 72,
            bgcolor: "white",
            borderBottom: "1px solid #e8eaf0",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            px: { xs: 2, md: 5 },
          }}
        >
          <Stack direction="row" spacing={2} alignItems="center">
            <Typography fontSize={13}>Alex Davis</Typography>
            <form action="/api/auth/logout" method="post" onSubmit={() => sessionStorage.removeItem("dna_permissions")}>
              <Button type="submit" size="small">
                ออกจากระบบ
              </Button>
            </form>
          </Stack>
        </Box>
        {children}
        <Box sx={{ display: { xs: "flex", md: "none" }, position: "fixed", zIndex: 1200, bottom: 12, left: 12, right: 12, p: .75, borderRadius: 3, bgcolor: "rgba(255,255,255,.94)", backdropFilter: "blur(14px)", boxShadow: "0 12px 30px rgba(32,39,67,.16)", justifyContent: "space-around" }}>
          {visibleItems.slice(0, 4).map(item => <Button key={item.id} component={Link} href={item.href} sx={{ minWidth: 0, p: 1, color: active === item.id ? "primary.main" : "text.secondary", flexDirection: "column", gap: .25, fontSize: 10 }}><Icon icon={item.id === "dashboard" ? "solar:widget-5-bold-duotone" : item.id === "students" ? "solar:users-group-rounded-bold-duotone" : item.id === "documents" ? "solar:folder-with-files-bold-duotone" : "solar:user-id-bold-duotone"} width={22} />{item.label}</Button>)}
        </Box>
      </Box>
    </Box>
  );
}
