import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Divider,
  Grid,
  LinearProgress,
  Stack,
  Typography,
} from "@mui/material";
import AppShell from "@/components/AppShell";
import { demoStudents } from "@/lib/demo-data";

const kpis = [
  {
    label: "Total students",
    value: "248",
    detail: "+12 this month",
    tone: "indigo",
    icon: "◎",
  },
  {
    label: "Active students",
    value: "214",
    detail: "86.3% of total",
    tone: "green",
    icon: "↗",
  },
  {
    label: "Pending documents",
    value: "18",
    detail: "Needs review",
    tone: "amber",
    icon: "▣",
  },
  {
    label: "Visa expiring soon",
    value: "07",
    detail: "Within 30 days",
    tone: "red",
    icon: "◷",
  },
];

const toneStyles = {
  indigo: { bg: "#EEF2FF", fg: "#4F46E5" },
  green: { bg: "#ECFDF3", fg: "#16A34A" },
  amber: { bg: "#FFF7ED", fg: "#D97706" },
  red: { bg: "#FEF2F2", fg: "#DC2626" },
};

export default async function DashboardPage() {
  const session = (await cookies()).get("dna_session");
  if (!session) redirect("/login");
  const user = JSON.parse(session.value) as { name: string; role: string };

  return (
    <AppShell active="dashboard">
      <Container
        maxWidth="xl"
        sx={{ py: { xs: 3, md: 4 }, px: { xs: 2, md: 4 } }}
      >
        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
          alignItems={{ sm: "center" }}
          gap={2}
          mb={4}
        >
          <Box>
            <Typography
              sx={{
                color: "#64748B",
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: 1.8,
                mb: 1,
              }}
            >
              OVERVIEW
            </Typography>
            <Typography
              className="font-display"
              sx={{
                color: "#0F172A",
                fontSize: { xs: 25, md: 29 },
                fontWeight: 700,
                letterSpacing: -0.7,
              }}
            >
              Good morning, {user.name.split(" ")[0]}
            </Typography>
            <Typography sx={{ color: "#64748B", fontSize: 14, mt: 0.75 }}>
              Here&apos;s a clear view of today&apos;s student operations.
            </Typography>
          </Box>
          <Stack direction="row" spacing={1.25}>
            <Button
              variant="outlined"
              href="/students"
              sx={{ borderColor: "#E2E8F0", color: "#334155", bgcolor: "#fff" }}
            >
              View students
            </Button>
            <Button
              variant="contained"
              href="/students/new"
              sx={{
                bgcolor: "#4F46E5",
                boxShadow: "none",
                "&:hover": { bgcolor: "#4338CA", boxShadow: "none" },
              }}
            >
              + Add student
            </Button>
          </Stack>
        </Stack>

        <Grid container spacing={2} mb={2.5}>
          {kpis.map((kpi) => {
            const tone = toneStyles[kpi.tone as keyof typeof toneStyles];
            return (
              <Grid item xs={12} sm={6} lg={3} key={kpi.label}>
                <Card
                  variant="outlined"
                  sx={{
                    borderColor: "#E2E8F0",
                    borderRadius: 3,
                    boxShadow: "0 1px 2px rgba(15,23,42,.03)",
                    height: "100%",
                  }}
                >
                  <CardContent sx={{ p: 2.5, "&:last-child": { pb: 2.5 } }}>
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="flex-start"
                    >
                      <Typography
                        sx={{ color: "#64748B", fontSize: 13, fontWeight: 600 }}
                      >
                        {kpi.label}
                      </Typography>
                      <Box
                        sx={{
                          width: 32,
                          height: 32,
                          borderRadius: 2,
                          bgcolor: tone.bg,
                          color: tone.fg,
                          display: "grid",
                          placeItems: "center",
                          fontWeight: 700,
                        }}
                      >
                        {kpi.icon}
                      </Box>
                    </Stack>
                    <Typography
                      className="font-display"
                      sx={{
                        color: "#0F172A",
                        fontSize: 30,
                        fontWeight: 700,
                        mt: 2,
                      }}
                    >
                      {kpi.value}
                    </Typography>
                    <Typography
                      sx={{
                        color: tone.fg,
                        fontSize: 12,
                        fontWeight: 600,
                        mt: 0.5,
                      }}
                    >
                      {kpi.detail}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>

        <Grid container spacing={2} mb={2.5}>
          <Grid item xs={12} md={5}>
            <Card
              variant="outlined"
              sx={{ borderColor: "#E2E8F0", borderRadius: 3, height: "100%" }}
            >
              <CardContent sx={{ p: 2.5 }}>
                <Typography
                  className="font-display"
                  sx={{ fontSize: 17, fontWeight: 700, color: "#0F172A" }}
                >
                  Student status
                </Typography>
                <Typography sx={{ color: "#64748B", fontSize: 13, mt: 0.5 }}>
                  Enrollment health at a glance
                </Typography>
                <Stack
                  direction="row"
                  alignItems="center"
                  spacing={3}
                  sx={{ py: 3 }}
                >
                  <Box
                    sx={{
                      width: 122,
                      height: 122,
                      borderRadius: "50%",
                      background:
                        "conic-gradient(#4F46E5 0 84%, #F59E0B 84% 91%, #93C5FD 91% 96%, #E2E8F0 96%)",
                      display: "grid",
                      placeItems: "center",
                    }}
                  >
                    <Box
                      sx={{
                        width: 82,
                        height: 82,
                        borderRadius: "50%",
                        bgcolor: "#fff",
                        display: "grid",
                        placeItems: "center",
                        textAlign: "center",
                      }}
                    >
                      <Box>
                        <Typography
                          className="font-display"
                          sx={{ fontWeight: 700, fontSize: 22 }}
                        >
                          248
                        </Typography>
                        <Typography sx={{ color: "#94A3B8", fontSize: 10 }}>
                          TOTAL
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                  <Stack spacing={1.2} flex={1}>
                    {[
                      ["Active", "214", "#4F46E5"],
                      ["Pending", "18", "#F59E0B"],
                      ["Completed", "11", "#93C5FD"],
                      ["Inactive", "5", "#CBD5E1"],
                    ].map(([label, value, color]) => (
                      <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="space-between"
                        key={label}
                      >
                        <Typography sx={{ color: "#475569", fontSize: 12 }}>
                          <Box
                            component="span"
                            sx={{
                              display: "inline-block",
                              width: 8,
                              height: 8,
                              borderRadius: "50%",
                              bgcolor: color,
                              mr: 1,
                            }}
                          />
                          {label}
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: 12,
                            fontWeight: 700,
                            color: "#0F172A",
                          }}
                        >
                          {value}
                        </Typography>
                      </Stack>
                    ))}
                  </Stack>
                </Stack>
                <LinearProgress
                  variant="determinate"
                  value={86}
                  sx={{
                    height: 7,
                    borderRadius: 4,
                    bgcolor: "#EEF2FF",
                    "& .MuiLinearProgress-bar": {
                      bgcolor: "#4F46E5",
                      borderRadius: 4,
                    },
                  }}
                />
                <Typography sx={{ color: "#64748B", fontSize: 11, mt: 1 }}>
                  86% of students are currently active
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={7}>
            <Card
              variant="outlined"
              sx={{ borderColor: "#E2E8F0", borderRadius: 3, height: "100%" }}
            >
              <CardContent sx={{ p: 2.5 }}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="flex-start"
                >
                  <Box>
                    <Typography
                      className="font-display"
                      sx={{ fontSize: 17, fontWeight: 700, color: "#0F172A" }}
                    >
                      Recent activity
                    </Typography>
                    <Typography
                      sx={{ color: "#64748B", fontSize: 13, mt: 0.5 }}
                    >
                      Latest updates across the workspace
                    </Typography>
                  </Box>
                  <Button
                    size="small"
                    sx={{ color: "#4F46E5", fontWeight: 700 }}
                  >
                    View all
                  </Button>
                </Stack>
                <Stack divider={<Divider flexItem />} sx={{ mt: 1.5 }}>
                  {[
                    [
                      "AM",
                      "Amelia Morgan",
                      "Passport status approved",
                      "12 min ago",
                      "#DCFCE7",
                      "#15803D",
                    ],
                    [
                      "JS",
                      "Jordan Smith",
                      "Enrollment letter uploaded",
                      "46 min ago",
                      "#EDE9FE",
                      "#6D28D9",
                    ],
                    [
                      "LW",
                      "Lucas Wong",
                      "Profile information updated",
                      "2 hours ago",
                      "#FFEDD5",
                      "#C2410C",
                    ],
                  ].map(([initials, name, action, time, bg, fg]) => (
                    <Stack
                      direction="row"
                      spacing={1.5}
                      alignItems="center"
                      sx={{ py: 1.5 }}
                      key={name}
                    >
                      <Box
                        sx={{
                          bgcolor: bg,
                          color: fg,
                          width: 34,
                          height: 34,
                          borderRadius: 2,
                          display: "grid",
                          placeItems: "center",
                          fontSize: 11,
                          fontWeight: 700,
                        }}
                      >
                        {initials}
                      </Box>
                      <Box flex={1}>
                        <Typography
                          sx={{
                            color: "#0F172A",
                            fontSize: 13,
                            fontWeight: 700,
                          }}
                        >
                          {name}
                        </Typography>
                        <Typography
                          sx={{ color: "#64748B", fontSize: 12, mt: 0.25 }}
                        >
                          {action}
                        </Typography>
                      </Box>
                      <Typography sx={{ color: "#94A3B8", fontSize: 11 }}>
                        {time}
                      </Typography>
                    </Stack>
                  ))}
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Card
          variant="outlined"
          sx={{ borderColor: "#E2E8F0", borderRadius: 3 }}
        >
          <CardContent sx={{ p: 2.5, "&:last-child": { pb: 1.5 } }}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="flex-start"
              mb={1}
            >
              <Box>
                <Typography
                  className="font-display"
                  sx={{ fontSize: 17, fontWeight: 700, color: "#0F172A" }}
                >
                  Latest students
                </Typography>
                <Typography sx={{ color: "#64748B", fontSize: 13, mt: 0.5 }}>
                  Recently added or updated records
                </Typography>
              </Box>
              <Button
                size="small"
                href="/students"
                sx={{ color: "#4F46E5", fontWeight: 700 }}
              >
                See all
              </Button>
            </Stack>
            {demoStudents.slice(0, 4).map((student) => (
              <Stack
                direction="row"
                alignItems="center"
                spacing={1.5}
                key={student.id}
                sx={{ py: 1.4, borderTop: "1px solid #F1F5F9" }}
              >
                <Box
                  sx={{
                    width: 34,
                    height: 34,
                    borderRadius: 2,
                    bgcolor: "#EEF2FF",
                    color: "#4F46E5",
                    display: "grid",
                    placeItems: "center",
                    fontSize: 11,
                    fontWeight: 700,
                  }}
                >
                  {student.name
                    .split(" ")
                    .map((part) => part[0])
                    .join("")}
                </Box>
                <Box flex={1}>
                  <Typography
                    sx={{ color: "#0F172A", fontSize: 13, fontWeight: 700 }}
                  >
                    {student.name}
                  </Typography>
                  <Typography sx={{ color: "#64748B", fontSize: 12 }}>
                    {student.id} · {student.program}
                  </Typography>
                </Box>
                <Chip
                  label={student.status}
                  size="small"
                  sx={{
                    fontWeight: 700,
                    fontSize: 11,
                    bgcolor:
                      student.status === "Active"
                        ? "#ECFDF3"
                        : student.status === "Pending"
                          ? "#FFF7ED"
                          : "#EFF6FF",
                    color:
                      student.status === "Active"
                        ? "#15803D"
                        : student.status === "Pending"
                          ? "#B45309"
                          : "#2563EB",
                  }}
                />
              </Stack>
            ))}
          </CardContent>
        </Card>
      </Container>
    </AppShell>
  );
}
