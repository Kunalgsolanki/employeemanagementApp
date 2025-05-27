import { useState } from "react";
import {
  Flex,
  Heading,
  Input,
  Button,
  InputGroup,
  Stack,
  InputLeftElement,
  InputRightElement,
  chakra,
  Box,
  Avatar,
  FormControl,
  FormErrorMessage,
  Text,
  useToast,
} from "@chakra-ui/react";
import { FaUserAlt, FaLock } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { get, post } from "../../services/ApiEndpoint";

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

const Login = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    let isValid = true;
    const newErrors = { email: "", password: "" };

    if (!formData.email) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
      isValid = false;
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleShowClick = () => setShowPassword(!showPassword);

  const handleRoute = async () => {
    try {
      const request = await get("/api/admin/getuser");
      if (request.status === 200) {
        navigate("/admin");
      }
    } catch (error) {
      navigate("/employee");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const request = await post("/api/auth/login", formData);
      if (request.status === 200) {
        toast({
          title: "Login successful",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
        setTimeout(handleRoute, 2000); 
      }
    } catch (error) {
      toast({
        title: "Login failed",
        description: error.response?.data?.message || "Invalid credentials",
        status: "error",
        duration: 4000,
        isClosable: true,
        position: "top",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" })); 
  };

  return (
    <Flex
      minH="100vh"
      bg="gray.100"
      align="center"
      justify="center"
      p={4}
      flexDir="column"
      transition="all 0.3s ease"
    >
      <Stack
        spacing={6}
        w="full"
        maxW="md"
        bg="white"
        rounded="lg"
        boxShadow="lg"
        p={{ base: 6, md: 8 }}
        align="center"
      >
        <Avatar size="lg" bg="blue.500" />
        <Heading
          fontSize={{ base: "2xl", md: "3xl" }}
          color="blue.600"
          textAlign="center"
        >
          KGS Employee Portal
        </Heading>
        <form onSubmit={handleSubmit} style={{ width: "100%" }}>
          <Stack spacing={5}>
            <FormControl isInvalid={!!errors.email}>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <CFaUserAlt color="gray.400" />
                </InputLeftElement>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email address"
                  focusBorderColor="blue.500"
                  _placeholder={{ color: "gray.400" }}
                />
              </InputGroup>
              <FormErrorMessage>{errors.email}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.password}>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <CFaLock color="gray.400" />
                </InputLeftElement>
                <Input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                  focusBorderColor="blue.500"
                  _placeholder={{ color: "gray.400" }}
                />
                <InputRightElement width="4.5rem">
                  <Button
                    size="sm"
                    onClick={handleShowClick}
                    variant="ghost"
                    colorScheme="blue"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </Button>
                </InputRightElement>
              </InputGroup>
              <FormErrorMessage>{errors.password}</FormErrorMessage>
            </FormControl>

            <Button
              type="submit"
              colorScheme="blue"
              isLoading={isLoading}
              loadingText="Logging in..."
              size="lg"
              rounded="md"
              _hover={{ bg: "blue.600" }}
            >
              Login
            </Button>
          </Stack>
        </form>
      </Stack>
      <Text mt={4} fontSize="sm" color="gray.600">
        New to us?{" "}
        <Link to="/register" style={{ color: "blue.500", fontWeight: "semibold" }}>
          Register
        </Link>
      </Text>
    </Flex>
  );
};

export default Login;