import React, { useState } from "react";
import TeamCard from "./TeamCard";
import AdminNavbar from "./AdminNavbar";
import backendpic from '../../assets/backend.png';
import frontendpic from '../../assets/frontend.jpg';
import devopspic from '../../assets/dev.png';
import testingpic from '../../assets/testing.png';
import hrpic from '../../assets/hr.png';
import {
  extendTheme,
  ChakraProvider,
  Flex,
  SimpleGrid,
  Center
} from "@chakra-ui/react";
const customTheme = extendTheme({
  colors: {
    brandBlue: "#0A6EBD",
    brandLightBlue: "#45CFDD",
  },
});
const TeamList = () => {
  const teams = [
    { id: 1, title: "Frontend", imagePath: frontendpic },
    { id: 2, title: "Backend", imagePath: backendpic },
    { id: 3, title: "Devops", imagePath: devopspic },
    { id: 4, title: "Testing", imagePath: testingpic },
    { id: 5, title: "HR", imagePath: hrpic },
  ];
  const [selectedTeam, setSelectedTeam] = useState("");
  const handleSelectTeam = (teamTitle) => {
    setSelectedTeam(teamTitle);
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
        <Flex flexWrap="wrap" justifyContent="center">
          <SimpleGrid
            columns={{ base: 1, sm: 2, md: 3 }}
            spacing="6"
            maxW="900px"
            w="full"
          >
            {teams.map((team) => (
              <TeamCard
                key={team.id}
                title={team.title}
                image={team.imagePath}
                onSelectTeam={handleSelectTeam}
              />
            ))}
          </SimpleGrid>
        </Flex>
      </Center>
    </ChakraProvider>
  );
};
export default TeamList;