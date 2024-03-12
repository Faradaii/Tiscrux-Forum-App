import { MdOutlineDarkMode, MdOutlineLightMode } from 'react-icons/md';
import Flag from 'react-world-flags';

interface ToggleProps {
  onToggleHandler: () => void
  content: string
}

function Toggle ({ onToggleHandler, content }: ToggleProps): JSX.Element {
  const contentList: Record<string, JSX.Element> = {
    dark: <MdOutlineDarkMode className="w-8 h-8 rounded-full object-cover" />,
    light: <MdOutlineLightMode className="w-8 h-8 rounded-full object-cover" />,
    id: <Flag code="IDN" className="border w-8 h-8 rounded-full object-cover" />,
    en: <Flag code="GBR" className="border w-8 h-8 rounded-full object-cover" />
  };

  return (
    <button type="button" className="items-center m-auto text-sm gap-1" onClick={onToggleHandler}>
      {contentList[content]}
    </button>
  );
}

export default Toggle;
