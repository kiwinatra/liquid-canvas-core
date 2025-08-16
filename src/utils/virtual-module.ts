// virtual:config
export const APP_CONFIG = {
  version: "0.3",
  buildTime: new Date().toISOString(),
  isDev: import.meta.env.DEV,
};