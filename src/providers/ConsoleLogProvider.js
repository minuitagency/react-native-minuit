import React, { useGlobal } from "reactn";

export default ({ children }) => {
  const [consoleLogs, setConsoleLogs] = useGlobal("_consoleLogs");

  console.log = (function (old_function) {
    return function (...args) {
      let newLogs = [...consoleLogs, ...args];

      if (newLogs.length > 200) {
        newLogs = newLogs.slice(newLogs.length - 120);
      }

      setConsoleLogs(newLogs);

      old_function.apply(this, args);
    };
  })(console.log);

  return children;
};
