'use client';

import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import IconButton from '@mui/material/IconButton';
import Popover from '@mui/material/Popover';
import Tooltip from '@mui/material/Tooltip';
import React, { useState } from 'react';

export default function Disclaimer() {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Tooltip title="View disclaimer">
        <IconButton
          className="aspect-square"
          size="medium"
          onClick={handleClick}
          aria-describedby={open ? 'search-disclaimer-popover' : undefined}
          aria-label="view disclaimer"
        >
          <InfoOutlinedIcon className="text-3xl" />
        </IconButton>
      </Tooltip>

      <Popover
        id="disclaimer-popover"
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        slotProps={{
          paper: {
            elevation: 6,
            className:
              'p-4 w-72 bg-white dark:bg-haiti rounded-md max-w-[calc(100vw-2rem)]',
          },
        }}
      >
        <div className="flex flex-col gap-2">
          <h3 className="font-bold text-base text-center">Disclaimer</h3>
          <p className="text-sm text-gray-700 dark:text-gray-300 leading-6">
            UTD Rooms is not affiliated with the University of Texas at Dallas.
            Room availability is provided for convenience only and is not
            guaranteed. Users are responsible for reserving and verifying rooms
            through official university sources.
          </p>
        </div>
      </Popover>
    </>
  );
}
