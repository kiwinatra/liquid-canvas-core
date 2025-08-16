export default function customHMR() {
  return {
    name: 'custom-hmr',
    handleHotUpdate({ modules }) {
      modules.forEach((m) => {
        if (m.url.endsWith('.css')) return; // Игнорируем CSS HMR
        m.importedModules = new Set(); // Форсим перезагрузку
      });
      return modules;
    },
  };
}