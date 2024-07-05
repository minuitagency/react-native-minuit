import { useGlobal } from "reactn";

type SetIsLoading = (value: boolean) => void;
type SetTooltip = (value: string) => void;

const useMinuit = (): { setIsLoading: SetIsLoading; setTooltip: SetTooltip } => {
  const [, setIsLoading] = useGlobal<boolean>("_isLoading");
  const [, setTooltip] = useGlobal<string>("_tooltip");

  return {
    setIsLoading,
    setTooltip,
  };
};

export default useMinuit;
