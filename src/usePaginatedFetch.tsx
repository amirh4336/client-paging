import { useEffect, useState } from "react";
import _ from "lodash";

interface IUsePaginatedFetchProps {
  url: string;
  pageSize: number;
}

interface IUsePaginatedFetchResult<T> {
  data: T[][] | null;
  loading: boolean;
  error: unknown | string;
}

const usePaginatedFetch = <T,>({
  url,
  pageSize,
}: IUsePaginatedFetchProps): IUsePaginatedFetchResult<T> => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<T[][] | null>(null);
  const [error, setError] = useState<unknown | string>("");

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(url);
        const dataRes: T[] = await response.json();
        const paginatedData = _.chunk(dataRes, pageSize);
        setData(paginatedData);
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, [pageSize, url]);

  return { error, loading, data };
};

export default usePaginatedFetch;
