import { useState } from "react";

function useForm(int) {
  const [input, setinput] = useState(int);

  const inputValue = (e) => {
    setinput((preState) => ({
      ...preState,
      [e.target.name]: e.target.value,
    }));
  };

  const formReset = () => {
    setinput(int);
  };

  return { input, setinput, inputValue, formReset };
}

export default useForm;
