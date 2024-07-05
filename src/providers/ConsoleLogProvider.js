import React, { ReactNode } from "reactn";

// Define a type for the props
interface Props {
  children: ReactNode;
}

// Define a type for the console logs
type ConsoleLog = string | number | boolean | object;

const ConsoleLogger: React.FC<Props> = ({ children }) => {
  const [consoleLogs, setConsoleLogs] = useGlobal<ConsoleLog[]>("_consoleLogs");

  console.log = (function (old_function) {
    return function (...args: ConsoleLog[]) {
      let newLogs = [...consoleLogs, ...args];

      if (newLogs.length > 200) {
        newLogs = newLogs.slice(newLogs.length - 120);
      }

      setConsoleLogs(newLogs);

      old_function.apply(this, args);
    };
  })(console.log);

  return <>{children}</>;
};

export default ConsoleLogger;
