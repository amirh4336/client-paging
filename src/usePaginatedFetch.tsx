import { useEffect, useState } from "react";
import _ from "lodash";

interface IUsePaginatedFetchProps {
  url: string;
  pageSize: number;
}

interface IUsePaginatedFetchResult<T> {
  data: T[][] | null;
  loading: boolean;
}

const usePaginatedFetch = <T,>({
  url,
  pageSize,
}: IUsePaginatedFetchProps): IUsePaginatedFetchResult<T> => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<T[][] | null>(null);

  useEffect(() => {
    const getData = async () => {
      const response = await fetch(url);
      const dataRes: T[] = await response.json();

      const paginatedData = _.chunk(dataRes, pageSize);
      setData(paginatedData);
      setLoading(false);
    };
    getData();
  }, [pageSize, url]);

  return { loading, data };
};

export default usePaginatedFetch;
