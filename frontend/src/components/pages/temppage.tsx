import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  Wrap,
} from "@chakra-ui/react";
import { FaBook } from "react-icons/fa6";

export const Temp = () => {
  return (
    <>
      <Flex mx={{ base: 4, md: 20 }} mb={5}>
        <Box>
          <FaBook size={70} />
        </Box>
        <Box flex={1}>
          <Input placeholder="教材名を入力" my={4} ml={4} />
        </Box>
      </Flex>
      <Box textAlign="right" mr={{ base: 0, md: 20 }}>
        <Menu>
          <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
            Actions
          </MenuButton>
          <MenuList>
            <MenuItem>Download</MenuItem>
            <MenuItem>Create a Copy</MenuItem>
            <MenuItem>Mark as Draft</MenuItem>
            <MenuItem>Delete</MenuItem>
            <MenuItem>Attend a Workshop</MenuItem>
          </MenuList>
        </Menu>
      </Box>
    </>
  );
};
