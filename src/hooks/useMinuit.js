import { useGlobal } from "reactn";

const useMinuit = () => {
  const [, setIsLoading] = useGlobal("_isLoading");
  const [, setTooltip] = useGlobal("_tooltip");

  return {
    setIsLoading,
    setTooltip,
  };
};

export default useMinuit;
