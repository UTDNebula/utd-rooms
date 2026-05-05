'use client';

import GitHub from '@/../public/github-black.svg';
import Instagram from '@/../public/instagram-black.svg';
import Linkedin from '@/../public/linkedin-black.svg';
import Image from 'next/image';
import Link from 'next/link';
import NebulaLogo from './NebulaLogo';

const linkClasses =
  'underline decoration-transparent hover:decoration-inherit transition';

export default function Footer() {
  return (
    <footer className="bg-royal dark:bg-cornflower-300 dark:text-black relative w-full">
      <div 
        className='text-center py-2 hover:bg-royal hover:text-white'
        onClick={() => window.scrollTo(0, 0)}
      >
        Back to top
      </div>
      <div className="flex justify-evenly mt-6">
        <div>
          <h3 className="text-lg font-bold">For organizations</h3>
          <div className="mt-6 flex flex-col gap-4">
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
          <div className="mt-6 flex flex-col gap-4">
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
              Comet calendar
            </Link>
            <Link
              className={linkClasses}
              target="_blank"
              href="https://services.utdallas.edu/contact/"
            >
              Building hours
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
              <NebulaLogo className="h-6 w-auto fill-black" />
              Our wesbite
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
            <Link
              className={linkClasses + ' flex items-center gap-2'}
              target="_blank"
              href="https://www.linkedin.com/company/utdnebula/"
            >
              <Image src={Linkedin} alt="Linkedin" width="30" height="30" />
              Linkedin
            </Link>
          </div>
        </div>
      </div>
      <div className="p-6">
        <div className="border-t-2 border-white dark:border-black" />
        <div className="flex md:flex-row flex-col justify-between pt-6">
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
