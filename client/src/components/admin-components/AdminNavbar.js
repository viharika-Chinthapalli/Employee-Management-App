import React, { useState } from "react";
import {
  Flex,
  Box,
  Text,
  IconButton,
  extendTheme,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  VStack,
  ChakraProvider,
  useMediaQuery,
} from "@chakra-ui/react";
import { FaUserCircle, FaBars } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";

const customTheme = extendTheme({
  colors: {
    brandBlue: "#0A6EBD",
  },
});

const AdminNavbar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isLargerThanMd] = useMediaQuery("(min-width: 768px)");
  const location = useLocation();
  const navigate = useNavigate(); // Added useNavigate hook

  const isCurrentRoute = (path) => {
    return location.pathname === path;
  };

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const navigateTo = (path) => {
    navigate(path);
    setIsDrawerOpen(false); // Close the drawer after navigation
  };

  return (
    <ChakraProvider theme={customTheme}>
      <Box
        as="nav"
        position="sticky"
        top="0"
        zIndex="sticky"
        backgroundColor="blue.500"
        color="white"
      >
        <Flex align="center" justify="space-between" padding="1rem">
          <Box display="flex" alignItems="center">
            <IconButton
              as={FaUserCircle}
              fontSize="2xl"
              marginRight="1rem"
              variant="unstyled"
              onClick={() => navigateTo("/profile")}
            />
            <Text fontSize="xl" fontWeight="bold">
              Staff Minder
            </Text>
          </Box>
          {isLargerThanMd ? (
            <Box display="flex" alignItems="center">
              <Text
                p="4"
                color={
                  isCurrentRoute("/leave-requests") ? "blue.300" : "white"
                }
                fontWeight="bold"
                onClick={() => navigateTo("/leave-requests")}
                cursor="pointer"
              >
                Leave Requests
              </Text>
              <Text
                p="4"
                color={isCurrentRoute("/timesheets") ? "blue.300" : "white"}
                fontWeight="bold"
                onClick={() => navigateTo("/timesheets")}
                cursor="pointer"
              >
                Timesheets
              </Text>
              <Text
                p="4"
                color={isCurrentRoute("/employees") ? "blue.300" : "white"}
                fontWeight="bold"
                onClick={() => navigateTo("/employees")}
                cursor="pointer"
              >
                Employees
              </Text>
              <Text
                p="4"
                color={isCurrentRoute("/teams") ? "blue.300" : "white"}
                fontWeight="bold"
                onClick={() => navigateTo("/teams")}
                cursor="pointer"
              >
                Teams
              </Text>
            </Box>
          ) : (
            <IconButton
              as={FaBars}
              fontSize="2xl"
              variant="unstyled"
              onClick={toggleDrawer}
              aria-label="Toggle Navigation"
            />
          )}
          <Drawer
            isOpen={isDrawerOpen}
            placement="right"
            onClose={toggleDrawer}
          >
            <DrawerOverlay>
              <DrawerContent bg="gray.100">
                <DrawerCloseButton />
                <DrawerHeader borderBottomWidth="1px">Menu</DrawerHeader>
                <DrawerBody>
                  <VStack spacing={4} align="stretch">
                    <Text
                      p="4"
                      color="black"
                      fontWeight="bold"
                      onClick={() => navigateTo("/leave-requests")}
                      cursor="pointer"
                    >
                      Leave Requests
                    </Text>
                    <Text
                      p="4"
                      color="black"
                      fontWeight="bold"
                      onClick={() => navigateTo("/timesheets")}
                      cursor="pointer"
                    >
                      Timesheets
                    </Text>
                    <Text
                      p="4"
                      color="black"
                      fontWeight="bold"
                      onClick={() => navigateTo("/employees")}
                      cursor="pointer"
                    >
                      Employees
                    </Text>
                    <Text
                      p="4"
                      color="black"
                      fontWeight="bold"
                      onClick={() => navigateTo("/teams")}
                      cursor="pointer"
                    >
                      Teams
                    </Text>
                  </VStack>
                </DrawerBody>
              </DrawerContent>
            </DrawerOverlay>
          </Drawer>
        </Flex>
      </Box>
    </ChakraProvider>
  );
};

export default AdminNavbar;
