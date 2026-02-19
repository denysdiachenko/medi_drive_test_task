import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import CloudSyncRoundedIcon from '@mui/icons-material/CloudSyncRounded';
import { Chip } from '@mui/material';

interface StatusChipProps {
  status: 'idle' | 'saving' | 'saved';
}

export const StatusChip = ({ status }: StatusChipProps) => {
  if (status === 'saving') {
    return (
      <Chip
        icon={<CloudSyncRoundedIcon />}
        color="warning"
        label="Saving..."
        size="small"
      />
    );
  }

  if (status === 'saved') {
    return (
      <Chip
        icon={<CheckCircleOutlineRoundedIcon />}
        color="success"
        label="Draft saved"
        size="small"
      />
    );
  }

  return (
    <Chip
      label="No changes yet"
      size="small"
    />
  );
};
