import { yupResolver } from '@hookform/resolvers/yup';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import type { ServiceLog, ServiceLogFormValues, ServiceType } from '@type/serviceLog';
import { addDays } from '@utils/dateUtils';
import { serviceLogSchema } from '@validation/serviceLogSchema';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';

interface EditServiceLogDialogProps {
  open: boolean;
  log: ServiceLog | null;
  onClose: () => void;
  onSave: (values: ServiceLogFormValues) => void;
}

const typeOptions: ServiceType[] = ['planned', 'unplanned', 'emergency'];

export const EditServiceLogDialog = ({ open, log, onClose, onSave }: EditServiceLogDialogProps) => {
  const {
    control,
    register,
    watch,
    getValues,
    setValue,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ServiceLogFormValues>({
    resolver: yupResolver(serviceLogSchema),
    mode: 'onChange',
  });

  useEffect(() => {
    if (log) {
      reset(log);
    }
  }, [log, reset]);

  const startDate = watch('startDate');

  useEffect(() => {
    if (!startDate) {
      return;
    }
    const nextDay = addDays(startDate, 1);
    if (getValues('endDate') !== nextDay) {
      setValue('endDate', nextDay, { shouldValidate: true, shouldDirty: true });
    }
  }, [startDate, getValues, setValue]);

  const submitHandler = (values: ServiceLogFormValues) => {
    onSave(values);
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle>Edit Service Log</DialogTitle>
      <DialogContent>
        <Grid
          container
          spacing={2}
          sx={{ mt: 0.5 }}
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
              label="Odometer"
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
                <FormControl fullWidth>
                  <InputLabel id="edit-type-label">Type</InputLabel>
                  <Select
                    {...field}
                    labelId="edit-type-label"
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
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          variant="contained"
          onClick={handleSubmit(submitHandler)}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};
