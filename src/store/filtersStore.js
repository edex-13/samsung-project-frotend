import { create } from "zustand";

export const useFiltersStore = create((set) => ({
  filters: {
    comercios: [],
    modelos: [],
    condiciones: [],
    vendedor: "",
    fechaInicio: null,
    fechaFin: null,
    ram: "",
    almacenamiento: ""
  },
  updateFilter: (key, value) => set((state) => ({
    filters: {
      ...state.filters,
      [key]: value
    }
  })),
  clearFilters: () => set({
    filters: {
      comercios: [],
      modelos: [],
      condiciones: [],
      vendedor: "",
      fechaInicio: null,
      fechaFin: null,
      ram: "",
      almacenamiento: ""
    }
  })
})); 