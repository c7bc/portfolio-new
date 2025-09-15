"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { routes, protectedRoutes } from "@/resources";
import { Flex, Spinner, Button, Heading, Column, PasswordInput } from "@once-ui-system/core";
import NotFound from "@/app/not-found";
import { useI18n } from "@/i18n/I18nProvider";

interface RouteGuardProps {
  children: React.ReactNode;
}

const RouteGuard: React.FC<RouteGuardProps> = ({ children }) => {
  const pathname = usePathname();
  const { t } = useI18n();
  const [isRouteEnabled, setIsRouteEnabled] = useState(false);
  const [isPasswordRequired, setIsPasswordRequired] = useState(false);
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const performChecks = async () => {
      setLoading(true);
      setIsRouteEnabled(false);
      setIsPasswordRequired(false);
      setIsAuthenticated(false);

      const normalizePath = (p?: string) => {
        if (!p) return "/";
        // remove leading locale segments like /pt, /pt-BR, /en, /en-US, /es, /fr etc.
        const segments = p.split("/").filter(Boolean);
        if (segments.length === 0) return "/";
        const first = segments[0];
        // matches two-letter locale optionally followed by -REGION (pt, en, es, fr, en-US, pt-BR)
        if (/^[a-z]{2}(?:-[A-Za-z]{2,})?$/.test(first)) {
          const rest = segments.slice(1);
          return rest.length === 0 ? "/" : `/${rest.join("/")}`;
        }
        return p;
      };

      const normalized = normalizePath(pathname);

      const routeEnabled = (() => {
        if (!normalized) return false;
        if (normalized in routes) return routes[normalized as keyof typeof routes];

        const dynamicRoutes = ["/blog", "/work"] as const;
        for (const route of dynamicRoutes) {
          if (normalized.startsWith(route) && routes[route]) return true;
        }
        return false;
      })();

      setIsRouteEnabled(routeEnabled);

      // Check protected routes using normalized path
      if (protectedRoutes[normalized as keyof typeof protectedRoutes]) {
        setIsPasswordRequired(true);

        const response = await fetch("/api/check-auth");
        if (response.ok) {
          setIsAuthenticated(true);
        }
      }

      setLoading(false);
    };

    performChecks();
  }, [pathname]);

  const handlePasswordSubmit = async () => {
    const response = await fetch("/api/authenticate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (response.ok) {
      setIsAuthenticated(true);
      setError(undefined);
    } else {
  setError(t("ui.incorrectPassword"));
    }
  };

  if (loading) {
    return (
      <Flex fillWidth paddingY="128" horizontal="center">
        <Spinner />
      </Flex>
    );
  }

  if (!isRouteEnabled) {
    return <NotFound />;
  }

  if (isPasswordRequired && !isAuthenticated) {
    return (
      <Column paddingY="128" maxWidth={24} gap="24" center>
        <Heading align="center" wrap="balance">{t("ui.passwordProtected")}</Heading>
        <Column fillWidth gap="8" horizontal="center">
          <PasswordInput
            id="password"
            label={t("ui.password")}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            errorMessage={error}
          />
          <Button onClick={handlePasswordSubmit}>{t("ui.submit")}</Button>
        </Column>
      </Column>
    );
  }

  return <>{children}</>;
};

export { RouteGuard };
