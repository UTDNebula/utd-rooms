'use client';

import Arrow from '@/../public/arrow-black.svg';
import DarkGitHub from '@/../public/github-black.svg';
import LightGitHub from '@/../public/github-white.svg';
import DarkInsta from '@/../public/instagram-black.svg';
import LightInsta from '@/../public/instagram-white.svg';
import DarkDiscord from '@/../public/join-discord-black.svg';
import LightDiscord from '@/../public/join-discord-white.svg';
import DarkLinkedin from '@/../public/linkedin-black.svg';
import LightLinkedin from '@/../public/linkedin-white.svg';
import { Tooltip } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import NebulaLogo from './NebulaLogo';
import { UTDRoomsLogoCombination } from './UTDRoomsLogo';

function ScrollUpButton() {
  return (
    <Tooltip title="Go back to top">
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
      <h3 className="text-md md:text-lg font-bold">For Organizations</h3>
      <div className="mt-6 flex flex-col gap-5 text-sm md:text-base">
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
      <h3 className="text-md md:text-lg font-bold">For Students</h3>
      <div className="mt-6 flex flex-col gap-5 text-sm md:text-base">
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
          CourseBook
        </Link>
        <Link
          className={linkClasses}
          target="_blank"
          href="https://calendar.utdallas.edu/"
        >
          Comet Calendar
        </Link>
      </div>
    </div>
  );
}

/**
 * Contact logo that displays a light and dark version based on the current theme
 */
function Icon(props: {
  light: string;
  dark: string;
  alt: string;
  size: number | `${number}`;
}) {
  return (
    <>
      <Image
        src={props.light}
        alt={props.alt}
        width={props.size}
        height={props.size}
        className="block dark:hidden"
      />
      <Image
        src={props.dark}
        alt={props.alt}
        width={props.size}
        height={props.size}
        className="hidden dark:block"
      />
    </>
  );
}

function GetToKnowUs() {
  return (
    <div className="flex flex-col gap-5 text-sm md:text-base">
      <Link
        className={
          linkClasses +
          ' flex items-center gap-2 mb-2 hover:scale-105 transition'
        }
        target="_blank"
        href="https://discord.utdnebula.com/"
      >
        <Icon light={LightDiscord} dark={DarkDiscord} alt="Discord" size={45} />
      </Link>
      <Link
        className={linkClasses + ' flex items-center gap-2'}
        target="_blank"
        href="https://www.utdnebula.com/"
      >
        <NebulaLogo className="h-6 w-auto fill-haiti" />
        Wesbite
      </Link>
      <Link
        className={linkClasses + ' flex items-center gap-2'}
        target="_blank"
        href="https://www.instagram.com/utdnebula/"
      >
        <Icon light={LightInsta} dark={DarkInsta} alt="Instagram" size="30" />
        Instagram
      </Link>
      <Link
        className={linkClasses + ' flex items-center gap-2'}
        target="_blank"
        href="https://www.linkedin.com/company/utdnebula/posts/?feedView=all"
      >
        <Icon
          light={LightLinkedin}
          dark={DarkLinkedin}
          alt="Linkedin"
          size="30"
        />
        Linkedin
      </Link>
      <Link
        className={linkClasses + ' flex items-center gap-2'}
        target="_blank"
        href="https://github.com/utdnebula/"
      >
        <Icon light={LightGitHub} dark={DarkGitHub} alt="Github" size="30" />
        Github
      </Link>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="lg:px-40 px-8 pt-6 bg-royal dark:bg-cornflower-300 text-white dark:text-haiti w-full">
      <div className="flex gap-8 justify-between items-center">
        {/* Logo */}
        <div className="font-display flex flex-row items-center gap-4">
          <UTDRoomsLogoCombination
            className="h-22 w-auto shrink-0"
            duotone
            slotClassNames={{
              nebulaLogo: 'fill-current',
              projectLogo: 'fill-haiti dark:fill-white',
            }}
          />
          <div className="flex flex-col max-sm:hidden">
            <span className="whitespace-nowrap text-2xl md:text-4xl font-bold leading-tight">
              UTD ROOMS
            </span>
            <span className="whitespace-nowrap text-sm md:text-lg font-medium">
              by Nebula Labs
            </span>
          </div>
        </div>
        <ScrollUpButton />
      </div>
      <div className="flex flex-wrap gap-5 justify-between mt-10">
        <ForOrganizations />
        <ForStudents />
        <GetToKnowUs />
      </div>
      <div className="pb-6 mt-10">
        <div className="border-t-2 border-white dark:border-haiti" />
        <div className="flex md:flex-row flex-col gap-5 justify-between items-center pt-6">
          <div className="flex gap-x-8 gap-y-1 justify-around md:justify-normal flex-wrap">
            <Link className={linkClasses} href="/legal/privacy-policy.txt">
              Privacy Policy
            </Link>
            <Link className={linkClasses} href="/sitemap.xml">
              Sitemap
            </Link>
          </div>
          <p className="md:text-right text-center text-xs">
            © 2025-{new Date().getFullYear()} Nebula Labs Maintainers.
            Open-source under the MIT License.
          </p>
        </div>
      </div>
    </footer>
  );
}
