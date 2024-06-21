import { Routes, Route } from "react-router-dom";
import Dashboard from "../Pages/Dashboard";
import TransactionsStatistics from "../Components/TransactionsStatistics";
import Charts from "../Pages/Charts";

const AllRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Dashboard />}></Route>
        <Route
          path="/transactionStatistics"
          element={<TransactionsStatistics />}
        ></Route>
        <Route
          path="/transactionsChart"
          element={<Charts/>}
        ></Route>
      </Routes>
    </div>
  );
};

export default AllRoutes;
