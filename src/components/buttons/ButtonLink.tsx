import React from 'react';
import Link from 'next/link';

export interface ButtonLinkProps {
  action: 'Login' | 'Register' | 'Beranda' | 'buatThread' | 'Leaderboard'
  optionalText?: string
  className?: string
}

function ButtonLink ({ action, optionalText, className }: ButtonLinkProps): JSX.Element {
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
      className: 'bg-lime-2-light rounded-md'
    },
    buatThread: {
      path: '/addThread',
      label: 'Buat Thread',
      className: ''
    },
    Leaderboard: {
      path: '/leaderboard',
      label: 'Leaderboard',
      className: ''
    }
  };

  return (
    <button type="button" className={`p-2 block text-center ${className ? className : actionName[action].className}`}>
      <Link href={actionName[action].path}>{optionalText ?? actionName[action].label}</Link>
    </button>
  );
}

export default ButtonLink;
