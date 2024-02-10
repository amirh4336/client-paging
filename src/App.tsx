import { useEffect, useState } from "react";
import usePaginatedFetch from "./usePaginatedFetch";
import Card from "./components/card";
import { IDataProgrammer } from "./data";
import Pagination from "./components/pagination";

const url =
  "https://react-mini-projects-api.classbon.com/Programmer/programmers";

function App() {
  const { loading, data } = usePaginatedFetch<IDataProgrammer>({
    url,
    pageSize: 3,
  });
  const [page, setPage] = useState(1);
  const [programmers, setProgrammers] = useState<IDataProgrammer[]>([]);

  useEffect(() => {
    if (loading) return;
    if (data) {
      setProgrammers(data[page - 1]);
    }
  }, [loading, data, page]);

  return (
    <div className="container">
      {loading && (
        <div className="d-flex justify-content-center">
          <div className="spinner-border"></div>
        </div>
      )}
      {!loading && data && (
        <>
          <div className="row d-flex justify-content-center">
            {programmers.map(({ id, ...programmer }) => (
              <div className="col-3" key={id}>
                <Card {...programmer} />
              </div>
            ))}
          </div>
          <div className="row">
            <Pagination
              pages={data?.length}
              setPage={setPage}
              activePage={page}
            />
          </div>
        </>
      )}
    </div>
  );
}

export default App;
