// ---------------------------------------------------------------------------
// Estado compartido. Un solo objeto mutable que importan los módulos que
// necesitan leer/escribir los datos actuales (tabla, estadísticas, captura).
// Evita tener que pasar rawData/rootData/sortState como parámetros por todos
// lados.
// ---------------------------------------------------------------------------

export const state = {
  rawData: [],
  rootData: null, // objeto raíz del JSON cuando trae variacion_real_qqq (ver normalize.js)
  sortState: { key: 'peso', dir: 'desc' },
};

// Usa la variación real del índice si vino en el JSON (rootData.variacion_real_qqq);
// si no, cae de vuelta a la suma de impactos como estimación.
export function getQqqTotal() {
  if (state.rootData && state.rootData.variacion_real_qqq !== undefined && state.rootData.variacion_real_qqq !== null) {
    return Number(state.rootData.variacion_real_qqq);
  }
  return state.rawData.reduce(function (sum, d) { return sum + Number(d.impacto_qqq || 0); }, 0);
}
