import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const useLocationEnhancer = () => {
  const [lastPart, setLastPart] = useState("");
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;
    const match = path.match(/\/([^/]+)$/);
    const newLastPart = match?.[1] || "";

    setLastPart(newLastPart);
  }, [location.pathname]);

  return { lastPart };
};

export default useLocationEnhancer;
