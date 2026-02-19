import { ServiceLogForm } from '@component/ServiceLogForm/ServiceLogForm';
import { ServiceLogsTable } from '@component/ServiceLogs/ServiceLogsTable';
import { Box, Container, Stack, Typography } from '@mui/material';

const App = () => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        py: { xs: 3, md: 6 },
        background:
          'radial-gradient(circle at 0% 0%, rgba(148, 210, 189, 0.4), transparent 32%), linear-gradient(180deg, #f4f7f9 0%, #edf3f6 100%)',
      }}
    >
      <Container maxWidth="xl">
        <Stack spacing={3}>
          <Box>
            <Typography variant="h4">MediDrive Service Logs</Typography>
            <Typography color="text.secondary">
              Draft-ready service log creation with automatic persistence, filtering, and edit
              workflow.
            </Typography>
          </Box>

          <Stack spacing={3}>
            <ServiceLogForm />
            <ServiceLogsTable />
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};

export default App;
