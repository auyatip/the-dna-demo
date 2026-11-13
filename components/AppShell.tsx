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
  {
    id: "documents",
    icon: "▣",
    label: "เอกสาร",
    href: "/students",
    permission: "documents:read",
  },
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
    fetch("/api/me/permissions")
      .then((response) => (response.ok ? response.json() : { permissions: [] }))
      .then((data) => setPermissions(data.permissions));
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
              <ListItemIcon sx={{ minWidth: 34 }}>{item.icon}</ListItemIcon>
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
      <Box component="main" sx={{ flex: 1 }}>
        <Box
          sx={{
            height: 72,
            bgcolor: "white",
            borderBottom: "1px solid #e8eaf0",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            px: { xs: 3, md: 5 },
          }}
        >
          <Stack direction="row" spacing={2} alignItems="center">
            <Typography fontSize={13}>Alex Davis</Typography>
            <form action="/api/auth/logout" method="post">
              <Button type="submit" size="small">
                ออกจากระบบ
              </Button>
            </form>
          </Stack>
        </Box>
        {children}
      </Box>
    </Box>
  );
}
