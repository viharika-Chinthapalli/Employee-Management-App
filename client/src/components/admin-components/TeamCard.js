import React from "react";
import { Box, Image, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const TeamCard = (props) => {
  const { title, image } = props;
  return (
    <Link to={`/teams/${title}`} style={{ marginRight: "16px" }}>
      <Box
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        m={4}
        p={4}
        boxShadow="md"
        bg="white"
        cursor="pointer"
        transition="transform 0.2s"
        _hover={{ transform: "scale(1.05)" }}
        _active={{ transform: "scale(0.95)" }}
      >
        <Image src={image} alt={title} width="200px" height="200px" />
        <Text mt={2} fontWeight="semibold" fontSize="lg">
          {title}
        </Text>
      </Box>
    </Link>
  );
};

export default TeamCard;