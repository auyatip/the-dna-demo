import { notFound } from "next/navigation";
import {
  Box,
  Chip,
  Container,
  Paper,
  Stack,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { prisma } from "@/lib/prisma";
import AppShell from "@/components/AppShell";
export default async function StudentDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const student = await prisma.student.findUnique({
    where: { id },
    include: { documents: true },
  });
  if (!student) notFound();
  return (
    <AppShell active="students">
      <Container maxWidth="lg" sx={{ py: 5 }}>
        <Typography color="text.secondary">รายละเอียดนักเรียน</Typography>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          mb={3}
        >
          <Box>
            <Typography className="font-display" variant="h4">
              {student.firstName} {student.lastName}
            </Typography>
            <Typography color="text.secondary">
              {student.studentCode} · {student.email}
            </Typography>
          </Box>
          <Chip label={student.status} color="success" />
        </Stack>
        <Tabs value={0} sx={{ mb: 3 }}>
          <Tab label="ภาพรวม" />
          <Tab label={`เอกสาร (${student.documents.length})`} />
          <Tab label="กิจกรรม" />
        </Tabs>
        <Paper variant="outlined" sx={{ p: 3 }}>
          <Typography className="font-display" variant="h6">
            ภาพรวม
          </Typography>
          <Stack spacing={1} mt={2}>
            <Typography>หลักสูตร: {student.program}</Typography>
            <Typography>สัญชาติ: {student.nationality}</Typography>
            <Typography>เบอร์โทรศัพท์: {student.phone}</Typography>
            <Typography>จำนวนเอกสาร: {student.documents.length}</Typography>
          </Stack>
        </Paper>
      </Container>
    </AppShell>
  );
}
