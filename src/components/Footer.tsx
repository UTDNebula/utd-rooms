'use client';

import GitHub from '@/../public/github-white.svg';
import Instagram from '@/../public/instagram-white.svg';
import Linkedin from '@/../public/linkedin-white.svg';
import Image from 'next/image';
import Link from 'next/link';
import NebulaLogo from './NebulaLogo';

const linkClasses =
  'underline decoration-transparent hover:decoration-inherit transition';

export default function Footer() {
  return (
    <footer className="bg-blue-500 w-full px-8 py-4">
      <div className="flex justify-evenly mt-6">
        <div>
          <h3 className="text-lg font-bold">For organizations</h3>
          <div className="mt-6 flex flex-col gap-3 text-sm">
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
        <div>
          <h3 className="text-lg font-bold">For students</h3>
          <div className="mt-6 flex flex-col gap-3 text-sm">
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
              Comet calendar
            </Link>
            <Link
              className={linkClasses}
              target="_blank"
              href="https://services.utdallas.edu/contact/"
            >
              Building hours
            </Link>
            <Link
              className={linkClasses}
              target="_blank"
              href="https://libcal.utdallas.edu/allspaces"
            >
              Library
            </Link>
          </div>
        </div>
        <div>
          <h3 className="text-lg font-bold">Get to know us</h3>
          <div className="mt-6 flex flex-col gap-4">
            <Link
              className={linkClasses + ' flex items-center gap-2'}
              target="_blank"
              href="https://www.utdnebula.com/"
            >
              <NebulaLogo className="h-6 w-auto" />
              Our wesbites
            </Link>
            <Link
              className={linkClasses + ' flex items-center gap-2'}
              target="_blank"
              href="https://github.com/utdnebula"
            >
              <Image src={GitHub} alt="GitHub logo" width="30" height="30" />
              Github
            </Link>
            <Link
              className={linkClasses + ' flex items-center gap-2'}
              target="_blank"
              href="https://www.instagram.com/utdnebula/"
            >
              <Image src={Instagram} alt="GitHub logo" width="30" height="30" />
              Instagram
            </Link>
            <Link
              className={linkClasses + ' flex items-center gap-2'}
              target="_blank"
              href="https://www.linkedin.com/company/utdnebula"
            >
              <Image src={Linkedin} alt="GitHub logo" width="30" height="30" />
              Linkedin
            </Link>
          </div>
        </div>
      </div>
      <div className="pt-10">
        <div className="border-t-2 border-white" />
        <div className="flex md:flex-row flex-col justify-between pt-4">
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
