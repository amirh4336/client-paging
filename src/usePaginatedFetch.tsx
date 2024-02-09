import { useEffect, useState } from "react";
import _ from "lodash"


interface IUsePaginatedFetchProps {
  url: string;
  pageSize: number;
}

const usePaginatedFetch = ({ url, pageSize }: IUsePaginatedFetchProps) => {
const [loading, setLoading] = useState(true)
const [data, setData] = useState<any[]>([])

  const getData = async  () => {
    const response = await fetch(url)
    const data = await response.json()

    const paginatedData = _.chunk(data , pageSize);

    setData(paginatedData)
    setLoading(false)
  }

  useEffect(() => {
    getData()
  }, [])
  

  return [loading , data]
};

export default usePaginatedFetch;
