export const generateAPIQueryParams = (
  params: Record<string, string | number | undefined | null>,
) => {
  return Object.entries(params)
    .filter(([_, value]) => value)
    .map(([key, value]) => `${key}=${value}`)
    .join('&');
};
