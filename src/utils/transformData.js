export const transformToTreeMap = (data) => {
  // Si los datos ya están en el formato correcto, retornarlos tal cual
  if (data?.name && Array.isArray(data?.children)) {
    return data;
  }

  // Si no, transformar los datos al formato esperado
  return {
    name: "root",
    children: Object.entries(data || {}).map(([key, value]) => {
      if (typeof value === "object" && !Array.isArray(value)) {
        return {
          name: key,
          children: Object.entries(value).map(([subKey, subValue]) => ({
            name: subKey,
            loc: typeof subValue === "number" ? subValue : 0
          }))
        };
      }
      return {
        name: key,
        loc: typeof value === "number" ? value : 0
      };
    })
  };
};

export const prepareScatterData = (data) => {
  return [
    {
      id: 'Productos',
      data: Object.entries(data || {}).map(([key, value]) => ({
        x: parseFloat(key),
        y: value
      }))
    }
  ];
}; 