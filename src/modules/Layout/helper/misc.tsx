// eslint-disable-next-line import/prefer-default-export
export const suffixValue = (
  value: string,
  condition = true,
  suffix = '*'
): string => (condition ? `${value}${suffix}` : value);
