type ServiceConfig = { name: string; tagline: string };

const loginServices = {
  netbank: { name: "NetBank", tagline: "Everyday personal banking" },
  commbiz: { name: "CommBiz", tagline: "Business banking" },
  commsec: { name: "CommSec", tagline: "Investing and share trading" },
} as const satisfies Record<string, ServiceConfig>;

export function resolveLoginService(service: string | null): ServiceConfig {
  const key = (service ?? "netbank").toLowerCase();
  return Object.hasOwn(loginServices, key)
    ? loginServices[key as keyof typeof loginServices]
    : loginServices.netbank;
}
