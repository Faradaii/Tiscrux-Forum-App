import Image from 'next/image';
import ButtonLink from '@/components/buttons/ButtonLink';

function ErrorPage (): JSX.Element {
  return (
    <div>
      <div className="flex flex-col justify-center w-fit m-auto gap-10">
        <Image src="/error.svg" alt="404" width={300} height={300} className="m-auto" />
        <div className="text-center w-fit flex flex-col gap-4">
          <h2 className="text-5xl font-bold">404</h2>
          <h2 className="text-lg">ups, Halaman yang anda cari tidak ditemukan</h2>
          <ButtonLink action="Beranda" optionalText="Kembali ke Beranda" className="bg-primary rounded-lg text-white" />
        </div>
      </div>
    </div>
  );
}

export default ErrorPage;