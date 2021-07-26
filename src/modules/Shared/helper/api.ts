import { PathParams, SearchParams } from 'modules/Shared/type';
import { generatePath } from 'react-router-dom';

export const getPathUrl = (
  path: string,
  pathParams: PathParams = null,
  searchParams?: SearchParams
): string => {
  let url = generatePath(path, pathParams);

  if (searchParams) {
    const record: Record<string, string> = {};

    Object.entries(searchParams).forEach(([key, value]) => {
      if (typeof value === 'string' && value.length > 0) {
        record[key] = value;
      } else if (typeof value === 'number') {
        record[key] = String(value);
      }
    });

    const urlSearchParams = new URLSearchParams(record).toString();

    if (urlSearchParams) {
      url += `?${urlSearchParams}`;
    }
  }

  return url;
};

export const getAPIUrl = (
  path: string,
  pathParams?: PathParams,
  searchParams?: SearchParams
): string => {
  const url = getPathUrl(path, pathParams, searchParams);

  return `${process.env.BACKEND_ENDPOINT}${url}`;
};
