import { useState } from "react";
// import usePaginatedFetch from "./usePaginatedFetch";
import Card from "./components/card";
import { IDataProgrammer } from "./data";
import Pagination from "./components/pagination";
import useFetch from "./useFetch";

const url = "https://react-mini-projects-api.classbon.com/Programmer/sieve";
// const url =
//   "https://react-mini-projects-api.classbon.com/Programmer/programmers";

const pageSize = 2;

function App() {
  const [page, setPage] = useState(1);
  const { loading, data: programmers } = useFetch<IDataProgrammer>({
    url,
    sieveModel: { page, pageSize },
  });

  return (
    <div className="container">
      {loading && (
        <div className="d-flex justify-content-center">
          <div className="spinner-border"></div>
        </div>
      )}
      {!loading && programmers && (
        <>
          <div className="row d-flex justify-content-center">
            {programmers?.data.map(({ id, ...programmer }) => (
              <div className="col-4" key={id}>
                <Card {...programmer} />
              </div>
            ))}
          </div>
          <div className="row">
            <Pagination
              pages={Math.ceil(programmers.totalRecords / pageSize)}
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
