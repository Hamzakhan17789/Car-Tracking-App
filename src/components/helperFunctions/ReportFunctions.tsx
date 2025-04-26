export const dateConversionToISO = (value: any) => {
  const dfromv = value[0];
  const dtov = value[1];
  const dfroms = new Date(dfromv).toISOString();
  const dtos = new Date(dtov).toISOString();
  // Subtract 7 days from the from date
  const dfrom = new Date(dfroms);
  dfrom.setHours(dfrom.getHours() + 0);
  const finalDFrom = dfrom.toISOString();
  // Subtract 7 days from the to date
  const dto = new Date(dtos);
  dto.setHours(dto.getHours() + 0);
  const finalDTo = dto.toISOString();
  return { finalDFrom, finalDTo, dto, dfrom };
};
