import {
  PartialSearchingProps,
  PaginationParams,
  SearchingProps,
  SearchParams,
  SortOrder,
  SortParams
} from 'modules/Shared/type';

export const sortOrders: SortOrder[] = ['asc', 'desc'];
export const itemsPerPage = [10, 20, 30, 50, 100];

export const createPaginationParams = (search: string): PaginationParams => {
  const urlSearchParams = new URLSearchParams(search);

  const paginationParams: PaginationParams = {
    page: 1,
    count: 10
  };

  if (urlSearchParams.has('page')) {
    paginationParams.page = Number(urlSearchParams.get('page'));
  }

  if (urlSearchParams.has('count')) {
    paginationParams.count = Number(urlSearchParams.get('count'));

    if (itemsPerPage.indexOf(paginationParams.count) === -1) {
      paginationParams.count = 10;
    }
  }

  return paginationParams;
};

export const createFilterParams = (
  attributes: Array<string>,
  search: string
): SearchParams => {
  const urlSearchParams = new URLSearchParams(search);

  const filterParams: SearchParams = {};

  urlSearchParams.forEach((value, key) => {
    if (attributes.includes(key)) {
      filterParams[key] = value;
    }
  });

  return filterParams;
};

export const createSortParams = (
  attributes: Array<string>,
  search: string
): SortParams => {
  const urlSearchParams = new URLSearchParams(search);

  const sortParams: SortParams = {};

  if (urlSearchParams.has('sort')) {
    const sortBy = urlSearchParams.get('sort');

    if (attributes.includes(sortBy)) {
      sortParams.sort = sortBy;
    }
  }

  if (urlSearchParams.has('sort_method')) {
    const sortOrder = urlSearchParams.get('sort_method') as SortOrder;

    if (sortOrders.includes(sortOrder)) {
      sortParams.sort_method = sortOrder;
    }
  }

  return sortParams;
};

export const createSearchParams = ({
  pagination = {},
  filter = {},
  sort = {}
}: PartialSearchingProps): SearchParams => ({
  ...pagination,
  ...filter,
  ...sort
});

export const createSearchingProps = (
  search: string,
  filterableAttrs: string[] = [],
  sortableAttrs: string[] = []
): SearchingProps => {
  const mappedSearch = search.split('?')[1];

  const props: SearchingProps = {
    pagination: createPaginationParams(mappedSearch),
    filter: {},
    sort: {}
  };

  if (filterableAttrs.length > 0) {
    props.filter = createFilterParams(filterableAttrs, mappedSearch);
  }

  if (sortableAttrs.length > 0) {
    props.sort = createSortParams(sortableAttrs, mappedSearch);
  }

  return props;
};
