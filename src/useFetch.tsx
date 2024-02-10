import { useEffect, useState } from "react";
import { IData } from "./data";

interface IUseFetchProps {
  url: string;
  sieveModel: {
    filters?: string;
    sorts?: string;
    page: number;
    pageSize: number;
  };
}

interface IUseFetchResult<T> {
  data: IData<T> | null;
  loading: boolean;
  error: unknown | string;
}

const useFetch = <T,>({
  url,
  sieveModel,
}: IUseFetchProps): IUseFetchResult<T> => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<IData<T> | null>(null);
  const [error, setError] = useState<unknown | string>("");
  const getData = async () => {
    try {
      setLoading(true);
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(sieveModel),
        headers: {
          "content-type": "application/json;charset-UTF-8",
        },
      });
      const dataRes: IData<T> = await response.json();

      setData(dataRes);
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, [sieveModel.page]);

  return { error, loading, data };
};

export default useFetch;
