import React, { useState, useEffect } from "react";
import {
  SimpleGrid,
  extendTheme,
  ChakraProvider,
  Center,
  Box,
  Flex,
  InputGroup,
  Input,
  InputRightElement,
  Button,
  Select,
} from "@chakra-ui/react";
import EmployeeCard from "./EmployeeCard";
import avatar from "../../assets/profile.png";
import { FiSearch, FiPlus } from "react-icons/fi";
import AddEmployee from "./AddEmployee";
import { format } from "date-fns";
import AdminNavbar from "./AdminNavbar";

const customTheme = extendTheme({
  colors: {
    brandBlue: "#0A6EBD",
    brandLightBlue: "#45cfdd",
  },
});

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTeam, setSelectedTeam] = useState("");
  const [showAddEmployee, setShowAddEmployee] = useState(false);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch(
          "https://staff-minder-backend.onrender.com/api/employees"
        );
        const data = await response.json();
        setEmployees(data);
      } catch (error) {
        console.log("Error fetching employees:", error);
      }
    };

    fetchEmployees();
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleTeamChange = (event) => {
    setSelectedTeam(event.target.value);
  };

  const filteredEmployees = employees.filter((employee) => {
    const { name, dateOfJoining, dateOfBirth, email } = employee;
    const lowerCaseSearchTerm = searchTerm.toLowerCase();

    return (
      (name && name.toLowerCase().includes(lowerCaseSearchTerm)) ||
      (dateOfJoining && dateOfJoining.includes(searchTerm)) ||
      (dateOfBirth && dateOfBirth.includes(searchTerm)) ||
      (email && email.toLowerCase().includes(lowerCaseSearchTerm))
    );
  });

  const addEmployee = () => {
    setShowAddEmployee(true);
  };

  const closeAddEmployee = () => {
    setShowAddEmployee(false);
  };

  return (
    <ChakraProvider theme={customTheme}>
      <AdminNavbar />
      <Center
        bgGradient="linear(to-b, brandBlue, brandLightBlue)"
        minH="100vh"
        py="12"
        flexDir="column"
      >
        <Box maxW="xl" w="full" px="6" mb="6">
          <InputGroup>
            <Input
              placeholder="Search for an employee..."
              value={searchTerm}
              onChange={handleSearch}
              _placeholder={{ color: "white" }}
            />
            <InputRightElement pointerEvents="none">
              <FiSearch />
            </InputRightElement>
          </InputGroup>
        </Box>

        <Flex direction="column" align="center" mb="6" w="full" px="6">
          <Button
            leftIcon={<FiPlus />}
            colorScheme="blue"
            size="sm"
            onClick={addEmployee}
            w="full"
            maxW="300px"
          >
            Add Employee
          </Button>
        </Flex>
        <Flex
          flex="1"
          justify="center"
          align="center"
          px={{ base: "4", md: "6" }}
        >
          <SimpleGrid
            columns={{ base: 1, sm: 2, md: 3 }}
            spacing="6"
            maxW="1200px"
            w="full"
          >
            {filteredEmployees.map((employee) => (
              <EmployeeCard
                key={employee._id}
                employee={{
                  name: employee.name,
                  role: `Role: ${employee.role}`,
                  team: `Team : ${employee.team}`,
                  dateOfJoining: format(
                    new Date(employee.dateOfJoining),
                    "yyyy-MM-dd"
                  ),
                  dateOfBirth: format(
                    new Date(employee.dateOfBirth),
                    "yyyy-MM-dd"
                  ),
                  email: employee.email,
                  profilePicture: avatar,
                }}
              />
            ))}
          </SimpleGrid>
        </Flex>
        <AddEmployee isOpen={showAddEmployee} onClose={closeAddEmployee} />
      </Center>
    </ChakraProvider>
  );
};

export default Employees;
