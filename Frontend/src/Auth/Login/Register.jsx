import { useState } from "react";
import {
  Flex,
  Heading,
  Input,
  Button,
  InputGroup,
  Stack,
  InputLeftElement,
  chakra,
  Box,
  
  Avatar,
  FormControl,
  InputRightElement,
  useToast,
} from "@chakra-ui/react";
import { FaLock, FaUserAlt, FaUserCircle } from "react-icons/fa";
import { post } from "../../services/ApiEndpoint";
import { Link, useNavigate } from "react-router-dom";


const CFaLock = chakra(FaLock);

const Register = () => {
  const toast = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleShowClick = () => setShowPassword(!showPassword);

  const handleChange = (field) => (e) =>
    setFormData({ ...formData, [field]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { name, email, password } = formData;
      const { data } = await post("/api/auth/register", { name, email, password });

      toast({
        title: "Registration successful",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
   navigate("/login")
    
      setFormData({ name: "", email: "", password: "" });
    } catch (error) {
      toast({
        title: "Registration failed",
        description: error.response?.data?.message || "Something went wrong",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
  };

  return (
    <Flex
      direction="column"
      w="100vw"
      h="100vh"
      bg="gray.200"
      justify="center"
      align="center"
    >
      <Stack spacing={4} align="center" mb={6}>
        <Avatar bg="blue.500" size="xl" />
        <Heading color="blue.600">Register</Heading>
      </Stack>

      <Box minW={{ base: "90%", md: "468px" }} bg="whiteAlpha.900" p={6} rounded="md" shadow="md">
        <form onSubmit={handleSubmit}>
          <Stack spacing={4}>
            <FormControl isRequired>
              <InputGroup>
                <InputLeftElement pointerEvents="none" children={<FaUserCircle color="gray.300" />} />
                <Input
                  type="text"
                  value={formData.name}
                  onChange={handleChange("name")}
                  placeholder="Full Name"
                />
              </InputGroup>
            </FormControl>

            <FormControl isRequired>
              <InputGroup>
                <InputLeftElement pointerEvents="none" children={<FaUserAlt color="gray.300" />} />
                <Input
                  type="email"
                  value={formData.email}
                  onChange={handleChange("email")}
                  placeholder="Email address"
                />
              </InputGroup>
            </FormControl>

            <FormControl isRequired>
              <InputGroup>
                <InputLeftElement pointerEvents="none" children={<FaLock color="gray.300" />} />
                <Input
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange("password")}
                  placeholder="Password"
                />
                <InputRightElement width="4.5rem">
                  <Button
                    h="1.75rem"
                    size="sm"
                    onClick={handleShowClick}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? "Hide" : "Show"}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>

            <Button type="submit" colorScheme="blue" width="full" borderRadius="md">
              Register
            </Button>
          </Stack>
        </form>
      </Box>

      <Box mt={4}>
        Already have an account?{" "}
        <Link  to="/Login">
          Login
        </Link>
      </Box>
    </Flex>
  );
};

export default Register;
