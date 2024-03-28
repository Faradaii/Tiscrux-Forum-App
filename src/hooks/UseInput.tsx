import { useState, type ChangeEvent } from 'react';

type InputHandler = (e: ChangeEvent<HTMLInputElement>) => void;
type DivHandler = (e: ChangeEvent<HTMLDivElement>) => void;

function useInput (typeInput: number = 0, defaultValue: string = ''):
[string, InputHandler | DivHandler, React.Dispatch<React.SetStateAction<string>>] {
  const [value, setValue] = useState<string>(defaultValue);

  const onInputHandler: InputHandler = (e) => {
    setValue(e.target.value);
  };

  const onInputDivHandler: DivHandler = (e) => {
    setValue(e.target.innerText);
  };

  switch (typeInput) {
    case 1:
      return [value, onInputDivHandler, setValue];
    default:
      return [value, onInputHandler, setValue];
  }
}

export default useInputw;
