import { Box } from "@chakra-ui/react";
import TransactionsTable from "../Components/TransactionsTable";

const Dashboard = () => {
  return (
    <>
      <Box>
        <TransactionsTable />
      </Box>
    </>
  );
};

export default Dashboard;
