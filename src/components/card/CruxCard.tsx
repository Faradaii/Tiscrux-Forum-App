import React from 'react';
import ButtonLink from '../buttons/ButtonLink';

interface CruxCardProps {
  typeCard: 'authTips' | 'leaderboardTips'
}

function CruxCard ({ typeCard }: CruxCardProps): JSX.Element {
  const typeCardList: Record<string, { content: string, buttonContent: JSX.Element[] }> = {
    authTips: {
      content: 'Selamat Datang di Tiscrux! Silahkan masuk dengan akun anda agar dapat berdiskusi dengan jutaan orang!',
      buttonContent: [
        <ButtonLink action="Login" key="login" />,
        <ButtonLink action="Register" key="register" />
      ]
    },
    leaderboardTips: {
      content: 'Tips: Agar kamu menjadi top 10 pada leaderboard, Buatlah lebih banyak thread dan perbanyak interaksi dengan thread orang lain!',
      buttonContent: [
        <ButtonLink action="Beranda" key="beranda" />
      ]
    }
  };

  return (
    <div className="flex flex-col text-center gap-3 w-5/6 m-auto p-10 rounded-md bg-dark-3-light text-white">
      <h1 className="text-xl font-bold">CRUX!</h1>
      <p className="text-justify text-sm">
        {typeCardList[typeCard].content}
      </p>
      <div className="flex flex-col gap-3 mt-5 text-sm">
        {typeCardList[typeCard].buttonContent}
      </div>
    </div>
  );
}

export default CruxCard;
