'use client';

import Background from '@/../public/background.png';
import { UTDRoomsLogoStandalone } from '@/components/UTDRoomsLogo';
import { Share } from '@mui/icons-material';
import { IconButton, Snackbar, TextField, Tooltip } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';

/**
 * Props type used by the TopMenu component
 */
interface Props {
  search?: string;
  setSearch?: (arg0: string) => void;
}

/**
 * This is a component to hold UTD Rooms branding and basic navigation
 */
export default function TopMenu(props: Props) {
  const [openCopied, setOpenCopied] = useState(false);

  function shareLink(url: string) {
    if (navigator.share) {
      navigator
        .share({
          title: 'UTD Rooms',
          url: url,
        })
        .catch(() => copyLink(url));
    } else {
      copyLink(url);
    }
  }
  function copyLink(url: string) {
    if (navigator.clipboard) {
      navigator.clipboard
        .writeText(url)
        .then(() => setOpenCopied(true))
        .catch((err) => {
          // fail silently if error due to user closing the share menu w/o doing anything, switching tabs, etc.
          if (err.name === 'NotAllowedError') {
            return;
          }
          {
            alertLink(url);
          }
        });
    } else {
      alertLink(url);
    }
  }
  function alertLink(url: string) {
    alert("Couldn't copy link automatically, copy this URL: \n" + url);
  }

  return (
    <>
      <header className="relative overflow-hidden flex items-center gap-y-0 gap-x-4 md:gap-x-8 lg:gap-x-16 py-1 md:py-2 px-4 md:px-8 lg:px-16 bg-lighten dark:bg-darken">
        <Image
          src={Background}
          alt="gradient background"
          fill
          className="object-cover -z-20"
        />
        <Link
          href="/"
          className="font-display flex gap-2 items-center select-none text-haiti dark:text-white py-2"
        >
          <div className="flex flex-row items-center">
            <UTDRoomsLogoStandalone className="h-10 w-auto fill-haiti dark:fill-white" />
          </div>
          <div className="flex flex-col max-sm:hidden">
            <span className="whitespace-nowrap text-lg md:text-xl font-bold leading-5">
              UTD ROOMS
            </span>
            <span className="whitespace-nowrap text-xs md:text-sm font-medium">
              by Nebula Labs
            </span>
          </div>
        </Link>
        <TextField
          label="Filter results"
          className="basis-[24rem] shrink"
          slotProps={{
            input: {
              className: 'bg-white dark:bg-haiti',
            },
          }}
          value={props.search}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            if (typeof props.setSearch !== 'undefined') {
              props.setSearch(event.target.value);
            }
          }}
        />
        <Tooltip title="Share link to search" className="ml-auto">
          <IconButton
            className="aspect-square"
            size="medium"
            onClick={() => shareLink(window.location.href)}
          >
            <Share className="text-3xl mr-1" />
          </IconButton>
        </Tooltip>
      </header>
      <Snackbar
        open={openCopied}
        autoHideDuration={6000}
        onClose={() => setOpenCopied(false)}
        message="Copied!"
      />
    </>
  );
}
