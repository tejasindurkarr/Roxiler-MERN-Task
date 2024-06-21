import { Box, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <Box
        p="12px"
        marginLeft="400"
        marginRight="400"
        shadow="lg"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        backgroundColor="lightgreen"
      >
        <Box>
          <Link to="/">
            <Text
              fontWeight="bold"
              fontSize="25px"
              cursor="pointer"
              backgroundColor="lightgreen"
            >
              Dashboard
            </Text>
          </Link>
        </Box>
        <Box
          backgroundColor="lightgreen"
          display="flex"
          gap="50px"
          fontWeight="bold"
          fontSize="22px"
        >
          <Link to="/transactionStatistics">
            <Text cursor="pointer" backgroundColor="lightgreen">
              Statistics
            </Text>
          </Link>
          <Link to="/transactionsChart">
            <Text cursor="pointer" backgroundColor="lightgreen">
              Charts
            </Text>
          </Link>
        </Box>
      </Box>
    </>
  );
};

export default Navbar;
