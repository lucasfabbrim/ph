export const mockCpfCnpjValidation = (value: string): string => {
  if (value === "111.111.111-11" || value === "11111111111") {
    return "111.111.111-11";
  }
  return "528.040.138-20";
};
