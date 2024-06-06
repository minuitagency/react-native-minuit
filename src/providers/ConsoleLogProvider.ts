import React, { ReactNode } from "react";
import { useGlobal } from "reactn";

type Props = {
  children: ReactNode;
};

const ConsoleLogger: React.FC<Props> = ({ children }) => {
  const [consoleLogs, setConsoleLogs] = useGlobal<string[]>("_consoleLogs");

  /* console.log = (function (old_function) {
    return function (...args: any[]) {
      let newLogs = [...consoleLogs, ...args];

      if (newLogs.length > 200) {
        newLogs = newLogs.slice(newLogs.length - 120);
      }

      setConsoleLogs(newLogs);

      old_function.apply(this, args);
    };
  })(console.log); */

  return <>{children}</>;
};

export default ConsoleLogger;