import React from 'react';
import Link from 'next/link';

interface ButtonLinkProps {
  action: 'Login' | 'Register' | 'Beranda' | 'buatThread' | 'Leaderboard' | 'Pengaturan'
}

function ButtonLink ({ action }: ButtonLinkProps): JSX.Element {
  const actionName = {
    Login: {
      path: '/login',
      label: 'Login',
      className: 'bg-lime-2-light rounded-md'
    },
    Register: {
      path: '/register',
      label: 'Register',
      className: 'border-2 border-lime-2-light rounded-md'
    },
    Beranda: {
      path: '/',
      label: 'Beranda',
      className: ''
    },
    buatThread: {
      path: '/addThread',
      label: 'Buat Thread',
      className: ''
    },
    Leaderboard: {
      path: '/Leaderboard',
      label: 'Leaderboard',
      className: ''
    },
    Pengaturan: {
      path: '/Pengaturan',
      label: 'Pengaturan',
      className: ''
    }
  };

  return (
    <button type="button" className={`p-2 block text-center ${actionName[action].className}`}>
      <Link href={actionName[action].path}>{actionName[action].label}</Link>
    </button>
  );
}

export default ButtonLink;
