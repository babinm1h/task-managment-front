import React from "react";

export const useMediaQuery = (query: string) => {
  const [matches, setMatches] = React.useState(false);

  function handleChange(e: MediaQueryListEvent) {
    setMatches(e.matches);
  }

  React.useEffect(() => {
    const matchQueryList = window.matchMedia(query);

    matchQueryList.addEventListener("change", handleChange);

    return () => {
      matchQueryList.removeEventListener("change", handleChange);
    };
  }, [query]);

  return matches;
};
