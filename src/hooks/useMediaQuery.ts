import React from "react";

export const useMediaQuery = (query: string) => {
  const getMatches = (query: string): boolean => {
    // Prevents SSR issues
    if (typeof window !== "undefined") {
      return window.matchMedia(query).matches;
    }
    return false;
  };

  const [matches, setMatches] = React.useState(getMatches(query));

  function handleChange(e: MediaQueryListEvent) {
    setMatches(e.matches);
  }

  React.useEffect(() => {
    const matchQueryList = window.matchMedia(query);
    console.log(matchQueryList);

    matchQueryList.addEventListener("change", handleChange);

    return () => {
      matchQueryList.removeEventListener("change", handleChange);
    };
  }, [query]);

  return matches;
};
