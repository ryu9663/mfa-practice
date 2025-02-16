// career-up/apps/app-shell/src/components/edu.tsx

import React, { useEffect, useRef } from "react";
import inject from "edu/injector";
import { useLocation } from "react-router-dom";
import { useShellEvent } from "@mfa/shell-router";
import { EDU_ROUTING_PREFIX } from "../constants/prefix";

export default function AppEdu() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useShellEvent("edu", EDU_ROUTING_PREFIX);

  const isFirstRunRef = useRef(true);
  const unmountRef = useRef(() => {});

  useEffect(() => {
    if (!isFirstRunRef.current) {
      return;
    }
    unmountRef.current = inject({
      routerType: "memory",
      rootElement: wrapperRef.current!,
      basePath: location.pathname.replace(EDU_ROUTING_PREFIX, ""),
    });
    isFirstRunRef.current = false;
  }, [location]);

  useEffect(() => unmountRef.current, []);

  return <div ref={wrapperRef} id="edu" />;
}
