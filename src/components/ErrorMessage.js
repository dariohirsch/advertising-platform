import { Typography } from '@mui/material';

import colors from '../config/colors';

export const ErrorMessage = ({ children }) => {
  return <Typography sx={{ color: colors.tomato }}>{children}</Typography>;
};
