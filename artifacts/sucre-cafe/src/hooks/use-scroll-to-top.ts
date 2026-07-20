import { useEffect } from "react";
import { useLocation } from "wouter";

export function useScrollToTop() {
  const [pathname] = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, [pathname]);
}
