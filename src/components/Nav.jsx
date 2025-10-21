'use client';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';
import Link from 'next/link';
import './Nav.css';

const navLinks = [
  { href: '/', label: 'home' },
  { href: '/projects', label: 'projects' },
  { href: '/stack', label: 'stack' },
  { href: '/contact', label: 'contact' },
];

const Nav = () => {
  const router = useRouter();
  const pathname = usePathname();

  function triggerPageTransition() {
    document.documentElement.animate(
      [
        {
          clipPath: 'polygon(25% 75%, 75% 75%, 75% 75%, 25% 75%)',
        },
        {
          clipPath: 'polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)',
        },
      ],
      {
        duration: 2000,
        easing: 'cubic-bezier(0.9, 0, 0.1, 1)',
        pseudoElement: '::view-transition-new(root)',
      }
    );
  }

  const handleNavigation = (path) => (e) => {
    if (path === pathname) {
      e.preventDefault();
      return;
    }

    e.preventDefault();

    // Use native View Transitions if available
    if (typeof document !== 'undefined' && 'startViewTransition' in document) {
      const vt = document.startViewTransition(() => {
        router.push(path);
      });

      vt.ready.then(() => {
        triggerPageTransition();
      });
    } else {
      // Fallback: navigate then trigger animation
      router.push(path);
      // Small delay to allow navigation
      setTimeout(triggerPageTransition, 0);
    }
  };

  // Prefetch rutas para navegación más rápida
  useEffect(() => {
    router.prefetch('/projects');
    router.prefetch('/studio');
    router.prefetch('/contact');
  }, [router]);

  return (
    <div className='nav'>
      <div className='col'>
        <div className='nav-logo'>
          <Link
            onClick={handleNavigation('/')}
            href='/'
            className={pathname === '/' ? 'active' : ''}>
            home
          </Link>
        </div>
      </div>

      <div className='col'>
        <div className='nav-items'>
          {navLinks.slice(1).map((link) => (
            <div className='nav-item' key={link.href}>
              <Link
                onClick={handleNavigation(link.href)}
                href={link.href}
                className={pathname === link.href ? 'active' : ''}>
                {link.label}
              </Link>
            </div>
          ))}
        </div>
        <div className='nav-copy'>
          <p>co</p>
        </div>
      </div>
    </div>
  );
};

export default Nav;
