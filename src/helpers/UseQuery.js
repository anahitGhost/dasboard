import { useCallback, useMemo } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

export const useQuery = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [queryString] = useSearchParams();
  const query = useMemo(() => Object.fromEntries(queryString), [queryString]);

  const queryToStringify = useCallback((object) => {
    const arrayWithQuery = Object.entries(object)
      .filter((param) => !!param[1])
      .map((param) => param.join('='));

    return `?${arrayWithQuery.join('&')}`;
  }, []);

  const setQuery = useCallback((search) => navigate({
    pathname,
    search: queryToStringify(search),
  }, { replace: true }), [pathname]);

  return {
    query,
    setQuery,
    queryToStringify,
  };
};

export default useQuery;
