import React, { useState, useEffect } from "react";
import AdminNavbar from "./AdminNavbar";
import axios from "axios";
import {
  Box,
  Heading,
  Input,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Flex,
  Select,
  extendTheme,
  ChakraProvider,
  Center,
  Text,
} from "@chakra-ui/react";

const customTheme = extendTheme({
  colors: {
    brandBlue: "#0A6EBD",
    brandLightBlue: "#45cfdd",
  },
});

const AdminLeaveRequests = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [shortLeaveRequests, setShortLeaveRequests] = useState([]);
  const [leaveRequests, setLeaveRequests] = useState([]);

  useEffect(() => {
    axios
      .get(
        "https://staff-minder-backend.onrender.com/api/employees/leaverequest"
      )
      .then((response) => {
        setLeaveRequests(response.data);
      })
      .catch((error) => {
        console.error("Error fetching leave requests:", error);
      });

    axios
      .get(
        "https://staff-minder-backend.onrender.com/api/employees/shortleaverequest"
      )
      .then((response) => {
        setShortLeaveRequests(response.data);
      })
      .catch((error) => {
        console.error("Error fetching short leave requests:", error);
      });
  }, []);

  const filteredshortLeaveRequests = shortLeaveRequests.filter((request) => {
    const normalizedQuery = searchQuery.toLowerCase();
    const normalizedEmployeeName = request.employeeName.toLowerCase();
    const matchSearchQuery = normalizedEmployeeName.includes(normalizedQuery);
    const matchStatus =
      filterStatus === "all" || request.status === filterStatus;
    return matchSearchQuery && matchStatus;
  });

  const filteredleaveRequests = leaveRequests.filter((request) => {
    const normalizedQuery = searchQuery.toLowerCase();
    const normalizedEmployeeName = request.employeeName.toLowerCase();
    const matchSearchQuery = normalizedEmployeeName.includes(normalizedQuery);
    const matchStatus =
      filterStatus === "all" || request.status === filterStatus;
    return matchSearchQuery && matchStatus;
  });

  const handleStatusChange = (requestId, newStatus) => {
    axios
      .put(
        `https://staff-minder-backend.onrender.com/api/employees/shortleaverequest/${requestId}/${newStatus}`,
        {
          status: newStatus,
        }
      )
      .then((response) => {
        const updatedshortLeaveRequests = shortLeaveRequests.map((request) => {
          if (request.id === requestId) {
            return { ...request, status: newStatus };
          }
          return request;
        });
        setShortLeaveRequests(updatedshortLeaveRequests);
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error updating leave request status:", error);
      });
  };
  const handleStatusChanges = (requestId, newStatus) => {
    axios
      .put(
        `https://staff-minder-backend.onrender.com/api/employees/leaverequest/${requestId}/${newStatus}`,
        {
          status: newStatus,
        }
      )
      .then((response) => {
        const updatedLeaveRequests = leaveRequests.map((request) => {
          if (request.id === requestId) {
            return { ...request, status: newStatus };
          }
          return request;
        });
        setLeaveRequests(updatedLeaveRequests);
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error updating leave request status:", error);
      });
  };

  return (
    <ChakraProvider theme={customTheme}>
      <AdminNavbar />
      <Center bgGradient="linear(to-b, brandBlue, brandLightBlue)" minH="100vh"
        py="12"
        flexDir="column">
        <Box w="100%" maxW="1200px" p={10} mt={4}>
          <Heading size="lg" mb={4} textAlign="center" color="white">
            Leave Requests
          </Heading>
          <Flex
            direction={{ base: "column", md: "row" }}
            flexWrap="wrap"
            justifyContent="space-between"
            mb={4}
          >
            <Box
              flex={{ base: "1", sm: "auto" }}
              mb={{ base: "4", sm: "0" }}
              width={{ base: "100%", sm: "auto" }}
            >
              <Input
                placeholder="Search Employee"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                mr={2}
                mb={{ base: "2", sm: "0" }}
                _placeholder={{
                  color: "white",
                }}
              />
            </Box>
            <Box
              flex={{ base: "1", sm: "auto" }}
              width={{ base: "100%", sm: "auto" }}
            >
              <Select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                width="100%"
              >
                <option value="all">All</option>
                <option value="pending">Pending</option>
                <option value="approve">Approve</option>
                <option value="reject">Reject</option>
              </Select>
            </Box>
          </Flex>
          {filteredshortLeaveRequests.length === 0 ? (
            <Center my={8}>
              <Text fontSize="lg" color="white">
                No pending requests
              </Text>
            </Center>
          ) : (
            <Box overflowX="auto">
              <Heading size="lg" mb={4} textAlign="center" color="white">
                Short Leave Requests
              </Heading>
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th bg="brandBlue" color="white" py={2}>
                      Request ID
                    </Th>
                    <Th bg="brandBlue" color="white" py={2}>
                      Employee Name
                    </Th>
                    <Th bg="brandBlue" color="white" py={2}>
                      Leave Type
                    </Th>
                    <Th bg="brandBlue" color="white" py={2}>
                      Status
                    </Th>
                    <Th bg="brandBlue" color="white" py={2}>
                      Action
                    </Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {filteredshortLeaveRequests.map((request) => (
                    <Tr key={request.id}>
                      <Td>{request._id}</Td>
                      <Td>{request.employeeName}</Td>
                      <Td>{request.leaveType}</Td>
                      <Td>
                        <Button
                          colorScheme={
                            request.status === "pending"
                              ? "yellow"
                              : request.status === "approve"
                              ? "green"
                              : "red"
                          }
                          size="sm"
                        >
                          {request.status}
                        </Button>
                      </Td>

                      <Td>
                        {request.status === "pending" && (
                          <>
                            <Button
                              colorScheme="green"
                              size="sm"
                              mr={2}
                              onClick={() =>
                                handleStatusChange(request._id, "approve")
                              }
                            >
                              Approve
                            </Button>
                            <Button
                              colorScheme="red"
                              size="sm"
                              onClick={() =>
                                handleStatusChange(request._id, "reject")
                              }
                            >
                              Reject
                            </Button>
                          </>
                        )}
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </Box>
          )}

          {filteredleaveRequests.length > 0 && (
            <Box overflowX="auto">
              <Heading size="lg" m={5} textAlign="center" color="white">
                Leave Requests
              </Heading>

              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th bg="brandBlue" color="white" py={2}>
                      Request ID
                    </Th>
                    <Th bg="brandBlue" color="white" py={2}>
                      Employee Name
                    </Th>
                    <Th bg="brandBlue" color="white" py={2}>
                      Leave Type
                    </Th>
                    <Th bg="brandBlue" color="white" py={2}>
                      Status
                    </Th>
                    <Th bg="brandBlue" color="white" py={2}>
                      From
                    </Th>
                    <Th bg="brandBlue" color="white" py={2}>
                      To
                    </Th>
                    <Th bg="brandBlue" color="white" py={2}>
                      Action
                    </Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {filteredleaveRequests.map((request) => (
                    <Tr key={request.id}>
                      <Td>{request._id}</Td>
                      <Td>{request.employeeName}</Td>
                      <Td>{request.leaveType}</Td>
                      <Td>
                        <Button
                          colorScheme={
                            request.status === "pending"
                              ? "yellow"
                              : request.status === "approve"
                              ? "green"
                              : "red"
                          }
                          size="sm"
                        >
                          {request.status}
                        </Button>
                      </Td>
                      <Td>{request.fromDate.slice(0,10)}</Td>
                      <Td>{request.toDate.slice(0,10)}</Td>
                      <Td>
                        {request.status === "pending" && (
                          <>
                            <Button
                              colorScheme="green"
                              size="sm"
                              mr={2}
                              onClick={() =>
                                handleStatusChanges(request._id, "approve")
                              }
                            >
                              Approve
                            </Button>
                            <Button
                              colorScheme="red"
                              size="sm"
                              onClick={() =>
                                handleStatusChanges(request._id, "reject")
                              }
                            >
                              Reject
                            </Button>
                          </>
                        )}
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </Box>
          )}
        </Box>
      </Center>
    </ChakraProvider>
  );
};

export default AdminLeaveRequests;
