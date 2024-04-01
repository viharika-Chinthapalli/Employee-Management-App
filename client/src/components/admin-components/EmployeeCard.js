import React from "react";
import { Box, Image, Text, IconButton, Stack } from "@chakra-ui/react";
import { FiEdit } from "react-icons/fi";

const EmployeeCard = ({ employee }) => {
  const {
    name,
    role,
    team,
    dateOfJoining,
    dateOfBirth,
    email,
    profilePicture,
  } = employee;

  return (
    <Box
      maxW="sm"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p="4"
      boxShadow="md"
      bg="white"
    >
      <Image
        src={profilePicture}
        alt="Profile Picture"
        boxSize="100px"
        objectFit="cover"
        borderRadius="full"
        mx="auto"
      />
      <Stack spacing="2" mt="4">
        <Text fontWeight="bold" fontSize="xl" textAlign="center">
          {name}
        </Text>
        <Text textAlign="center">{role}</Text>
        <Text textAlign="center">{team}</Text>
        <Text textAlign="center">Date of Joining: {dateOfJoining}</Text>
        <Text textAlign="center">Date of Birth: {dateOfBirth}</Text>
        <Text textAlign="center">Email: {email}</Text>
        <IconButton
          icon={<FiEdit />}
          aria-label="Edit"
          variant="outline"
          colorScheme="blue"
          alignSelf="center"
        />
      </Stack>
    </Box>
  );
};

export default EmployeeCard;


// 
