import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { filterLogs, selectServiceLogs } from '@store/selectors/serviceLogsSelectors';
import {
  createServiceLogsBulk,
  deleteServiceLog,
  updateServiceLog,
} from '@store/slices/serviceLogsSlice';
import type { ServiceLog, ServiceLogFilters, ServiceType } from '@type/serviceLog';
import { parseServiceLogsCsv } from '@utils/serviceLogsCsvParser';
import { type ChangeEvent, useMemo, useRef, useState } from 'react';
import { EditServiceLogDialog } from './EditServiceLogDialog';

const initialFilters: ServiceLogFilters = {
  search: '',
  type: 'all',
  startDateFrom: '',
  startDateTo: '',
};

const typeOptions: Array<ServiceType | 'all'> = ['all', 'planned', 'unplanned', 'emergency'];

export const ServiceLogsTable = () => {
  const dispatch = useAppDispatch();
  const logs = useAppSelector(selectServiceLogs);
  const [filters, setFilters] = useState<ServiceLogFilters>(initialFilters);
  const [editingLog, setEditingLog] = useState<ServiceLog | null>(null);
  const [deletingLog, setDeletingLog] = useState<ServiceLog | null>(null);
  const [importError, setImportError] = useState<string | null>(null);
  const [importSuccess, setImportSuccess] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const filteredLogs = useMemo(() => filterLogs(logs, filters), [logs, filters]);

  const onDeleteConfirm = () => {
    if (!deletingLog) {
      return;
    }
    dispatch(deleteServiceLog(deletingLog.id));
    setDeletingLog(null);
  };

  const onImportClick = () => {
    fileInputRef.current?.click();
  };

  const onCsvSelected = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    const content = await file.text();
    const parsed = parseServiceLogsCsv(content);

    if (parsed.errors.length) {
      setImportSuccess(null);
      setImportError(parsed.errors.slice(0, 3).join(' | '));
    } else if (!parsed.rows.length) {
      setImportSuccess(null);
      setImportError('No valid rows found in CSV file.');
    } else {
      dispatch(createServiceLogsBulk(parsed.rows));
      setImportError(null);
      setImportSuccess(`Imported ${parsed.rows.length} log(s) from CSV.`);
    }

    event.target.value = '';
  };

  return (
    <Paper sx={{ p: { xs: 2, md: 3 } }}>
      <Stack spacing={2}>
        <Typography variant="h5">Service Logs</Typography>

        <Stack
          direction={{ xs: 'column', md: 'row' }}
          spacing={1.5}
        >
          <Button
            variant="outlined"
            onClick={onImportClick}
          >
            Import CSV
          </Button>
          <Button
            component="a"
            href="/example.csv"
            download
            variant="text"
          >
            Download Template CSV
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".csv,text/csv"
            hidden
            onChange={onCsvSelected}
          />
        </Stack>

        {importError && <Alert severity="error">{importError}</Alert>}
        {importSuccess && <Alert severity="success">{importSuccess}</Alert>}

        <Stack
          direction={{ xs: 'column', md: 'row' }}
          spacing={1.5}
        >
          <TextField
            fullWidth
            size="small"
            label="Search"
            placeholder="provider, order, car, description..."
            value={filters.search}
            onChange={(event) => setFilters((prev) => ({ ...prev, search: event.target.value }))}
          />
          <FormControl
            size="small"
            sx={{ minWidth: 180 }}
          >
            <InputLabel id="filter-type-label">Type</InputLabel>
            <Select
              labelId="filter-type-label"
              label="Type"
              value={filters.type}
              onChange={(event) =>
                setFilters((prev) => ({
                  ...prev,
                  type: event.target.value as ServiceLogFilters['type'],
                }))
              }
            >
              {typeOptions.map((type) => (
                <MenuItem
                  key={type}
                  value={type}
                >
                  {type}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            size="small"
            type="date"
            label="Start From"
            InputLabelProps={{ shrink: true }}
            value={filters.startDateFrom}
            onChange={(event) =>
              setFilters((prev) => ({ ...prev, startDateFrom: event.target.value }))
            }
          />
          <TextField
            size="small"
            type="date"
            label="Start To"
            InputLabelProps={{ shrink: true }}
            value={filters.startDateTo}
            onChange={(event) =>
              setFilters((prev) => ({ ...prev, startDateTo: event.target.value }))
            }
          />
        </Stack>

        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Provider</TableCell>
                <TableCell>Order</TableCell>
                <TableCell>Car</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Odometer</TableCell>
                <TableCell>Engine Hours</TableCell>
                <TableCell>Start</TableCell>
                <TableCell>End</TableCell>
                <TableCell>Description</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredLogs.map((log) => (
                <TableRow
                  key={log.id}
                  hover
                >
                  <TableCell>{log.providerId}</TableCell>
                  <TableCell>{log.serviceOrder}</TableCell>
                  <TableCell>{log.carId}</TableCell>
                  <TableCell sx={{ textTransform: 'capitalize' }}>{log.type}</TableCell>
                  <TableCell>{log.odometer}</TableCell>
                  <TableCell>{log.engineHours}</TableCell>
                  <TableCell>{log.startDate}</TableCell>
                  <TableCell>{log.endDate}</TableCell>
                  <TableCell sx={{ maxWidth: 260 }}>
                    <Box
                      sx={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}
                    >
                      {log.serviceDescription}
                    </Box>
                  </TableCell>
                  <TableCell align="right">
                    <Tooltip title="Edit">
                      <IconButton onClick={() => setEditingLog(log)}>
                        <EditOutlinedIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton
                        color="error"
                        onClick={() => setDeletingLog(log)}
                      >
                        <DeleteOutlineRoundedIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
              {!filteredLogs.length && (
                <TableRow>
                  <TableCell
                    colSpan={10}
                    align="center"
                  >
                    No logs found for selected filters.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Stack>

      <EditServiceLogDialog
        open={Boolean(editingLog)}
        log={editingLog}
        onClose={() => setEditingLog(null)}
        onSave={(values) => {
          if (!editingLog) {
            return;
          }
          dispatch(updateServiceLog({ id: editingLog.id, changes: values }));
        }}
      />

      <Dialog
        open={Boolean(deletingLog)}
        onClose={() => setDeletingLog(null)}
      >
        <DialogTitle>Delete service log?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            This action cannot be undone.
            {deletingLog ? ` Log: ${deletingLog.serviceOrder} (${deletingLog.carId}).` : ''}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeletingLog(null)}>Cancel</Button>
          <Button
            color="error"
            variant="contained"
            onClick={onDeleteConfirm}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};
