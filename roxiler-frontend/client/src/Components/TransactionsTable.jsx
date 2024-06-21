import { useState, useEffect } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Input,
  Button,
  Select,
  Box,
  Text,
  Heading,
} from "@chakra-ui/react";

const TransactionsTable = () => {
  const [transactions, setTransactions] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("March");
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    loadTransactions();
  }, [selectedMonth, currentPage]);

  const loadTransactions = async () => {
    try {
      const response = await fetch(
        `https://easy-pear-walkingstick-wrap.cyclic.app/api/transactions?month=${selectedMonth}&page=${currentPage}&search=${searchText}`
      );
      const data = await response.json();
      // console.log("data", data);
      setTransactions(data.transactions);
    } catch (error) {
      console.error("Failed to fetch transactions:", error);
    }
  };

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  const handleSearchTextChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleSearch = () => {
    setCurrentPage(1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  return (
    <div>
      <Box p="20px">
        <Heading fontSize="25px" textAlign="center">
          Transactions Table
        </Heading>
      </Box>

      <Box display="flex" mt="10px" justifyContent="space-around">
        <Box display="flex">
          <Input
            type="text"
            value={searchText}
            onChange={handleSearchTextChange}
            placeholder="Search..."
            backgroundColor="lightcyan"
          />
          <Button onClick={handleSearch} ml={2}>
            Search
          </Button>
        </Box>
        <Box display="flex">
          <label>Select Month:</label>
          <Select
            backgroundColor="lightcyan"
            value={selectedMonth}
            onChange={handleMonthChange}
          >
            <option value="">Select Month</option>
            <option value="January">January</option>
            <option value="February">February</option>
            <option value="March">March</option>
            <option value="April">April</option>
            <option value="May">May</option>
            <option value="June">June</option>
            <option value="July">July</option>
            <option value="August">August</option>
            <option value="September">September</option>
            <option value="October">October</option>
            <option value="November">November</option>
            <option value="December">December</option>
          </Select>
        </Box>
      </Box>

      <Table mt={10} backgroundColor="lightgray">
        <Thead backgroundColor="lightgray">
          <Tr>
            <Th>Title</Th>
            <Th>Description</Th>
            <Th>Price</Th>
            <Th>Category</Th>
            <Th>Date of Sale</Th>
            <Th>Sold</Th>
          </Tr>
        </Thead>
        <Tbody backgroundColor="lightgray">
          {transactions.map((transaction) => (
            <Tr key={transaction._id}>
              <Td>{transaction.title}</Td>
              <Td>{transaction.description}</Td>
              <Td>{transaction.price}</Td>
              <Td>{transaction.category}</Td>
              <Td>{transaction.dateOfSale}</Td>
              <Td>{transaction.sold ? "Yes" : "No"}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      <Box
        display="flex"
        shadaw="base"
        p="10px"
        justifyContent="center"
        alignItems="center"
      >
        <Button onClick={handlePreviousPage} disabled={currentPage === 1}>
          Previous
        </Button>
        <Text>&nbsp;&nbsp;&nbsp;&nbsp;{currentPage}&nbsp;&nbsp;&nbsp;</Text>
        <Button onClick={handleNextPage} ml={2}>
          Next
        </Button>
      </Box>
    </div>
  );
};

export default TransactionsTable;
