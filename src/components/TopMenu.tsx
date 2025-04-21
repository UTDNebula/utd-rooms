import { Share } from '@mui/icons-material';
import { IconButton, Snackbar, TextField, Tooltip } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

import Background from '@/../public/background.png';

/**
 * Props type used by the TopMenu component
 */
interface Props {
  search: string;
  setSearch: (arg0: string) => void;
}

/**
 * This is a component to hold UTD Rooms branding and basic navigation
 */
export function TopMenu(props: Props) {
  const router = useRouter();
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
          if (
            err.name === 'NotAllowedError' &&
            err.message.includes('Document is not focused')
          ) {
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
      <div className="relative overflow-hidden flex items-center gap-y-0 gap-x-4 md:gap-x-8 lg:gap-x-16 py-1 md:py-2 px-4 md:px-8 lg:px-16 bg-lighten dark:bg-darken flex-wrap sm:flex-nowrap">
        <Image
          src={Background}
          alt="gradient background"
          fill
          className="object-cover -z-20"
        />
        <Link
          href="/"
          className="lext-lg md:text-xl font-kallisto font-medium md:font-bold"
        >
          UTD ROOMS
        </Link>
        <TextField
          label="Filter results"
          className="order-last basis-full sm:order-none sm:basis-[24rem] shrink [&>.MuiInputBase-root]:bg-white [&>.MuiInputBase-root]:dark:bg-haiti"
          value={props.search}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            props.setSearch(event.target.value);
          }}
        />
        <Tooltip title="Share link to search" className="ml-auto">
          <IconButton
            className="aspect-square"
            size="medium"
            onClick={() => {
              let url = window.location.href;
              if (
                router.query &&
                Object.keys(router.query).length === 0 &&
                Object.getPrototypeOf(router.query) === Object.prototype
              ) {
                url = 'https://rooms.utdnebula.com/';
              }
              shareLink(url);
            }}
          >
            <Share className="text-3xl mr-1" />
          </IconButton>
        </Tooltip>
      </div>
      <Snackbar
        open={openCopied}
        autoHideDuration={6000}
        onClose={() => setOpenCopied(false)}
        message="Copied!"
      />
    </>
  );
}

export default TopMenu;
