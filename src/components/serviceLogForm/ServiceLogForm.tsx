import { yupResolver } from '@hookform/resolvers/yup';
import {
  Alert,
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import {
  selectActiveDraft,
  selectActiveDraftId,
  selectDraftsList,
} from '@store/selectors/draftsSelectors';
import {
  clearAllDrafts,
  createDraft,
  deleteActiveDraft,
  setActiveDraft,
  upsertActiveDraft,
} from '@store/slices/draftsSlice';
import { createServiceLog } from '@store/slices/serviceLogsSlice';
import type { ServiceLogFormValues, ServiceType } from '@type/serviceLog';
import { addDays } from '@utils/dateUtils';
import { defaultFormValues, serviceLogSchema } from '@validation/serviceLogSchema';
import { useEffect, useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { StatusChip } from '../StatusChip/StatusChip';

const typeOptions: ServiceType[] = ['planned', 'unplanned', 'emergency'];

export const ServiceLogForm = () => {
  const dispatch = useAppDispatch();
  const activeDraft = useAppSelector(selectActiveDraft);
  const activeDraftId = useAppSelector(selectActiveDraftId);
  const draftsList = useAppSelector(selectDraftsList);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle');

  const {
    control,
    register,
    watch,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    getValues,
    setValue,
  } = useForm<ServiceLogFormValues>({
    resolver: yupResolver(serviceLogSchema),
    defaultValues: defaultFormValues,
    mode: 'onChange',
  });

  const startDate = watch('startDate');

  useEffect(() => {
    if (!activeDraft) {
      return;
    }
    reset(activeDraft);
  }, [activeDraft, reset]);

  useEffect(() => {
    if (!startDate) {
      return;
    }
    const nextDay = addDays(startDate, 1);
    if (getValues('endDate') !== nextDay) {
      setValue('endDate', nextDay, { shouldValidate: true, shouldDirty: true });
    }
  }, [startDate, getValues, setValue]);

  useEffect(() => {
    let timeoutId: number | null = null;
    const subscription = watch((values) => {
      setSaveStatus('saving');
      if (timeoutId) {
        window.clearTimeout(timeoutId);
      }
      timeoutId = window.setTimeout(() => {
        dispatch(upsertActiveDraft(values as ServiceLogFormValues));
        setSaveStatus('saved');
      }, 350);
    });

    return () => {
      subscription.unsubscribe();
      if (timeoutId) {
        window.clearTimeout(timeoutId);
      }
    };
  }, [dispatch, watch]);

  const onCreateDraft = () => {
    dispatch(createDraft(getValues()));
    setSaveStatus('saved');
  };

  const onDeleteDraft = () => {
    dispatch(deleteActiveDraft());
    if (draftsList.length <= 1) {
      reset(defaultFormValues);
    }
    setSaveStatus('idle');
  };

  const onClearAllDrafts = () => {
    dispatch(clearAllDrafts());
    reset(defaultFormValues);
    setSaveStatus('idle');
  };

  const onSubmit = async (values: ServiceLogFormValues) => {
    dispatch(createServiceLog(values));
    dispatch(deleteActiveDraft());
    reset(defaultFormValues);
    setSaveStatus('idle');
  };

  const draftLabel = useMemo(() => {
    if (!activeDraftId) {
      return 'No active draft';
    }
    const draft = draftsList.find((item) => item.id === activeDraftId);
    if (!draft) {
      return 'No active draft';
    }
    return `Draft ${draft.id.slice(0, 8)} updated ${new Date(draft.updatedAt).toLocaleString()}`;
  }, [activeDraftId, draftsList]);

  return (
    <Paper sx={{ p: { xs: 2, md: 3 } }}>
      <Stack spacing={2}>
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          justifyContent="space-between"
          gap={2}
        >
          <Box>
            <Typography variant="h5">Create Service Log Draft</Typography>
            <Typography color="text.secondary">{draftLabel}</Typography>
          </Box>
          <StatusChip status={saveStatus} />
        </Stack>

        <FormControl
          fullWidth
          size="small"
        >
          <InputLabel id="draft-select-label">Active Draft</InputLabel>
          <Select
            labelId="draft-select-label"
            label="Active Draft"
            value={activeDraftId ?? ''}
            onChange={(event) =>
              dispatch(setActiveDraft(event.target.value ? String(event.target.value) : null))
            }
          >
            <MenuItem value="">
              <em>Auto draft</em>
            </MenuItem>
            {draftsList.map((draft) => (
              <MenuItem
                key={draft.id}
                value={draft.id}
              >
                {draft.id.slice(0, 8)} ({new Date(draft.updatedAt).toLocaleDateString()})
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <Grid
            container
            spacing={2}
          >
            <Grid
              item
              xs={12}
              md={4}
            >
              <TextField
                fullWidth
                label="Provider ID"
                {...register('providerId')}
                error={Boolean(errors.providerId)}
                helperText={errors.providerId?.message}
              />
            </Grid>
            <Grid
              item
              xs={12}
              md={4}
            >
              <TextField
                fullWidth
                label="Service Order"
                {...register('serviceOrder')}
                error={Boolean(errors.serviceOrder)}
                helperText={errors.serviceOrder?.message}
              />
            </Grid>
            <Grid
              item
              xs={12}
              md={4}
            >
              <TextField
                fullWidth
                label="Car ID"
                {...register('carId')}
                error={Boolean(errors.carId)}
                helperText={errors.carId?.message}
              />
            </Grid>

            <Grid
              item
              xs={12}
              md={3}
            >
              <TextField
                fullWidth
                label="Odometer (miles)"
                type="number"
                {...register('odometer', { valueAsNumber: true })}
                error={Boolean(errors.odometer)}
                helperText={errors.odometer?.message}
              />
            </Grid>
            <Grid
              item
              xs={12}
              md={3}
            >
              <TextField
                fullWidth
                label="Engine Hours"
                type="number"
                {...register('engineHours', { valueAsNumber: true })}
                error={Boolean(errors.engineHours)}
                helperText={errors.engineHours?.message}
              />
            </Grid>
            <Grid
              item
              xs={12}
              md={3}
            >
              <TextField
                fullWidth
                label="Start Date"
                type="date"
                InputLabelProps={{ shrink: true }}
                {...register('startDate')}
                error={Boolean(errors.startDate)}
                helperText={errors.startDate?.message}
              />
            </Grid>
            <Grid
              item
              xs={12}
              md={3}
            >
              <TextField
                fullWidth
                label="End Date"
                type="date"
                InputLabelProps={{ shrink: true }}
                {...register('endDate')}
                error={Boolean(errors.endDate)}
                helperText={errors.endDate?.message}
              />
            </Grid>

            <Grid
              item
              xs={12}
              md={4}
            >
              <Controller
                control={control}
                name="type"
                render={({ field }) => (
                  <FormControl
                    fullWidth
                    error={Boolean(errors.type)}
                  >
                    <InputLabel id="type-label">Type</InputLabel>
                    <Select
                      {...field}
                      labelId="type-label"
                      label="Type"
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
                )}
              />
            </Grid>
            <Grid
              item
              xs={12}
              md={8}
            >
              <TextField
                fullWidth
                multiline
                minRows={2}
                label="Service Description"
                {...register('serviceDescription')}
                error={Boolean(errors.serviceDescription)}
                helperText={errors.serviceDescription?.message}
              />
            </Grid>
          </Grid>

          <Stack
            direction={{ xs: 'column', md: 'row' }}
            gap={1.5}
            mt={3}
          >
            <Button
              variant="outlined"
              onClick={onCreateDraft}
            >
              Create Draft
            </Button>
            <Button
              variant="outlined"
              color="warning"
              onClick={onDeleteDraft}
            >
              Delete Draft
            </Button>
            <Button
              variant="outlined"
              color="error"
              onClick={onClearAllDrafts}
            >
              Clear All Drafts
            </Button>
            <Button
              type="submit"
              variant="contained"
              disabled={isSubmitting}
            >
              Create Service Log
            </Button>
          </Stack>
        </Box>

        {errors.root?.message && <Alert severity="error">{errors.root.message}</Alert>}
      </Stack>
    </Paper>
  );
};
