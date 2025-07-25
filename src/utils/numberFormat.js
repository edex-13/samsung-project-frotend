export const numberFormat = (value, currency = "COP") =>
  new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency
  }).format(value); 