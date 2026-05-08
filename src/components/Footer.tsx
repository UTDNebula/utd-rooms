'use client';

import FooterLogo from '@/../public/footer-logo.svg';
import Arrow from '@/../public/arrow-black.svg';
import GitHub from '@/../public/github-black.svg';
import Instagram from '@/../public/instagram-black.svg';
import Image from 'next/image';
import Link from 'next/link';
import NebulaLogo from './NebulaLogo';
import { Tooltip } from '@mui/material';

function ScrollUpButton() {
  return (
    <Tooltip title='Go back to top'>
      <button
        onClick={() => window.scrollTo(0, 0)}
        className="flex flex-col items-center justify-center rounded-full p-2 transition border-2 border-white/0 hover:border-black cursor-pointer"
      >
        <Image
          src={Arrow}
          alt="arrow"
          width="20"
          height="20"
          className="rotate-180"
        />
        Top
      </button>
    </Tooltip>
  );
}

const linkClasses =
  'underline decoration-transparent hover:decoration-inherit transition';

function ForOrganizations() {
  return (
    <div>
      <h3 className="text-lg font-bold">For Organizations</h3>
      <div className="mt-6 flex flex-col gap-3">
        <Link
          className={linkClasses}
          target="_blank"
          href="https://www.aaiscloud.com/UTXDallas/default.aspx?home"
        >
          Astra
        </Link>
        <Link
          className={linkClasses}
          target="_blank"
          href="https://east.mymazevo.com/main-home"
        >
          Mazevo
        </Link>
      </div>
    </div>
  );
}

function ForStudents() {
  return (
    <div>
      <h3 className="text-lg font-bold">For Students</h3>
      <div className="mt-6 flex flex-col gap-3">
        <Link
          className={linkClasses}
          target="_blank"
          href="https://libcal.utdallas.edu/allspaces"
        >
          Library
        </Link>
        <Link
          className={linkClasses}
          target="_blank"
          href="https://coursebook.utdallas.edu/"
        >
          Coursebook
        </Link>
        <Link
          className={linkClasses}
          target="_blank"
          href="https://calendar.utdallas.edu/"
        >
          Comet Calendar
        </Link>
        <Link
          className={linkClasses}
          target="_blank"
          href="https://services.utdallas.edu/contact/"
        >
          Building Hours
        </Link>
      </div>
    </div>
  );
}

function GetToKnowUs() {
  return (
    <div>
      <h3 className="text-lg font-bold">Get to know us</h3>
      <div className="mt-6 flex flex-col gap-3">
        <Link
          className={linkClasses + ' flex items-center gap-2'}
          target="_blank"
          href="https://www.utdnebula.com/"
        >
          <NebulaLogo className="h-6 w-auto fill-black" />
          Wesbite
        </Link>
        <Link
          className={linkClasses + ' flex items-center gap-2'}
          target="_blank"
          href="https://github.com/utdnebula/"
        >
          <Image src={GitHub} alt="Github" width="30" height="30" />
          Github
        </Link>
        <Link
          className={linkClasses + ' flex items-center gap-2'}
          target="_blank"
          href="https://www.instagram.com/utdnebula/"
        >
          <Image src={Instagram} alt="Instagram" width="30" height="30" />
          Instagram
        </Link>
      </div>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="pt-6 bg-royal dark:bg-cornflower-300 dark:text-black relative w-full">
      <div className='mx-auto px-6 lg:px-35 flex justify-between items-center'>
        <Image src={FooterLogo} alt="Big Logo" height="50" className="shrink min-w-0"/>
        <ScrollUpButton />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-15 mx-auto w-fit lg:w-full lg:justify-items-center mt-10">
        <ForOrganizations />
        <ForStudents />
        <GetToKnowUs />
      </div>
      <div className="mx-auto px-6 lg:px-35 pb-6 mt-10">
        <div className="border-t-2 border-white dark:border-black" />
        <div className="flex md:flex-row flex-col justify-between items-center pt-6">
          <Link className={linkClasses} href="/sitemap.xml">
            Sitemap
          </Link>
          <p className="md:text-right text-center text-xs">
            © 2025-{new Date().getFullYear()} Nebula Labs Maintainers.
            Open-source under the MIT License.
          </p>
        </div>
      </div>
    </footer>
  );
}
