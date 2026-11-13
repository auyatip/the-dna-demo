"use client";
import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Chip,
  Container,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import AppShell from "@/components/AppShell";
import Link from "next/link";
type Student = {
  id: string;
  studentCode: string;
  firstName: string;
  lastName: string;
  email: string;
  program: string;
  status: string;
};
const columns: GridColDef<Student>[] = [
  { field: "studentCode", headerName: "รหัสนักเรียน", flex: 1 },
  {
    field: "name",
    headerName: "นักเรียน",
    flex: 1.2,
    valueGetter: (_, row) => `${row.firstName} ${row.lastName}`,
  },
  { field: "email", headerName: "อีเมล", flex: 1.5 },
  { field: "program", headerName: "หลักสูตร", flex: 1.4 },
  {
    field: "status",
    headerName: "สถานะ",
    flex: 0.8,
    renderCell: ({ value }) => (
      <Chip
        label={value}
        size="small"
        color={
          value === "ACTIVE"
            ? "success"
            : value === "PENDING"
              ? "warning"
              : "info"
        }
      />
    ),
  },
  {
    field: "actions",
    headerName: "",
    sortable: false,
    renderCell: ({ row }) => (
      <Button component={Link} href={`/students/${row.id}`}>
        ดูรายละเอียด
      </Button>
    ),
  },
];
export default function StudentsPage() {
  const [rows, setRows] = useState<Student[]>([]);
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("");
  useEffect(() => {
    fetch(`/api/students?q=${encodeURIComponent(q)}&status=${status}`)
      .then((r) => r.json())
      .then(setRows);
  }, [q, status]);
  return (
    <AppShell active="students">
      <Container maxWidth="xl" sx={{ py: 5 }}>
        <Stack direction="row" justifyContent="space-between" mb={3}>
          <Box>
            <Typography className="font-display" variant="h4">
              นักเรียน
            </Typography>
            <Typography color="text.secondary">
              ค้นหา กรอง และจัดการข้อมูลนักเรียน
            </Typography>
          </Box>
          <Button variant="contained" href="/students/new">
            เพิ่มนักเรียน
          </Button>
        </Stack>
        <Stack direction="row" spacing={2} mb={2}>
          <TextField
            size="small"
            placeholder="ค้นหาชื่อหรือรหัสนักเรียน"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
          <TextField
            select
            size="small"
            label="สถานะ"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            sx={{ minWidth: 160 }}
          >
            <MenuItem value="">ทั้งหมด</MenuItem>
            <MenuItem value="ACTIVE">กำลังศึกษา</MenuItem>
            <MenuItem value="PENDING">รอดำเนินการ</MenuItem>
            <MenuItem value="COMPLETED">สำเร็จการศึกษา</MenuItem>
          </TextField>
        </Stack>
        <Box sx={{ height: 560, bgcolor: "white" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            getRowId={(r) => r.id}
            pageSizeOptions={[5, 10, 20]}
            initialState={{
              pagination: { paginationModel: { pageSize: 10, page: 0 } },
            }}
          />
        </Box>
      </Container>
    </AppShell>
  );
}
