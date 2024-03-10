import { useRouter } from 'next/router';

function DetailPage (): JSX.Element {
  const { query } = useRouter();

  return (
    <h1>{query.ThreadId}</h1>
  );
}

export default DetailPage;