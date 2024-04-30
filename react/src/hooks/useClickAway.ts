import { RefObject, useEffect } from "react";

const useClickAway = (
  ref: RefObject<HTMLElement>,
  excludedRefs: RefObject<HTMLElement>[],
  handleClickAway: () => void
) => {
  const handleClick = (event: MouseEvent) => {
    if (
      ref.current &&
      !ref.current.contains(event.target as Node) &&
      excludedRefs.every((excludedRef) => !excludedRef.current?.contains(event.target as Node))
    ) {
      handleClickAway();
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);
};

export default useClickAway;
