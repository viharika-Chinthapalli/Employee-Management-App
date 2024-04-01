import React, { useState, useEffect } from "react";
import { SimpleGrid, extendTheme, ChakraProvider, Center, Text } from "@chakra-ui/react";
import EmployeeCard from "./EmployeeCard";
import avatar from "../../assets/profile.png";
import { format } from "date-fns";
import AdminNavbar from "./AdminNavbar";
import { useParams } from "react-router-dom";
const customTheme = extendTheme({
  colors: {
    brandBlue: "#0A6EBD",
    brandLightBlue: "#45CFDD",
  },
});
const Employee = () => {
  const { team } = useParams();
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch(
          "https://staff-minder-backend.onrender.com/api/employees"
        );
        const data = await response.json();
        setEmployees(data);
        setLoading(false);
      } catch (error) {
        console.log("Error fetching employees:", error);
        setLoading(false);
      }
    };
    fetchEmployees();
  }, []);
  const filteredEmployees = employees.filter((employee) => {
    return employee.team.toLowerCase() === team.toLowerCase(); 
  });
  return (
    <ChakraProvider theme={customTheme}>
      <AdminNavbar />
      <Center
        bgGradient="linear(to-b, brandBlue, brandLightBlue)"
        minH="100vh"
        py="12"
        flexDir="column"
      >
        {loading ? (
          <Text>Loading...</Text>
        ) : filteredEmployees.length === 0 ? (
          <Text>No employees in the selected team.</Text>
        ) : (
          <SimpleGrid
            columns={{ base: 1, sm: 2, md: 3 }}
            spacing="6"
            maxW="900px"
            w="full"
          >
            {filteredEmployees.map((employee) => (
              <EmployeeCard
                key={employee._id}
                employee={{
                  name: employee.name,
                  role: `Role: ${employee.role}`,
                  team: `Team: ${employee.team}`,
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
        )}
      </Center>
    </ChakraProvider>
  );
};
export default Employee;