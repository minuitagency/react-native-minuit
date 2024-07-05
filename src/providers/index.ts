import TooltipProvider from "./TooltipProvider";
import LoadingProvider from "./LoadingProvider";
import ShakeProvider from "./ShakeProvider";
import ConsoleLogProvider from "./ConsoleLogProvider";

// Define types and enums as needed
type Provider = TooltipProvider | LoadingProvider | ShakeProvider | ConsoleLogProvider;

enum ProviderType {
    Tooltip = "TooltipProvider",
    Loading = "LoadingProvider",
    Shake = "ShakeProvider",
    ConsoleLog = "ConsoleLogProvider"
}

export { TooltipProvider, LoadingProvider, ShakeProvider, ConsoleLogProvider, Provider, ProviderType };
