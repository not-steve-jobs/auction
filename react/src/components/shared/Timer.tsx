import React, { FC, useEffect, HTMLAttributes } from "react";

interface ITimerProps extends HTMLAttributes<HTMLSpanElement> {
  duration: number;
  handleTimerChange: () => void;
}

const Timer: FC<ITimerProps> = ({ duration, handleTimerChange, ...rest }) => {
  useEffect(() => {
    const interval = setInterval(() => {
      handleTimerChange();
    }, 1000);

    return () => clearInterval(interval);
  }, [duration]);

  return <span {...rest}>{` ${duration} `}</span>;
};

export default Timer;
