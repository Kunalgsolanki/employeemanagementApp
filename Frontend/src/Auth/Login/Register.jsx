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
import { FaUserAlt, FaLock, FaUserCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { post } from "../../services/ApiEndpoint";

const CFaUserCircle = chakra(FaUserCircle);
const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

const Register = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState({ name: "", email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    let isValid = true;
    const newErrors = { name: "", email: "", password: "" };

    if (!formData.name.trim()) {
      newErrors.name = "Full name is required";
      isValid = false;
    } else if (formData.name.length < 2) {
      newErrors.name = "Name must be at least 2 characters";
      isValid = false;
    }

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const { data } = await post("/api/auth/register", formData);
      toast({
        title: "Registration successful",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      setFormData({ name: "", email: "", password: "" });
      setTimeout(() => navigate("/login"), 1500); 
    } catch (error) {
      toast({
        title: "Registration failed",
        description: error.response?.data?.message || "Something went wrong",
        status: "error",
        duration: 4000,
        isClosable: true,
        position: "top",
      });
    } finally {
      setIsLoading(false);
    }
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
        <Avatar size="lg" bg="blue.500" icon={<FaUserCircle />} />
        <Heading
          fontSize={{ base: "2xl", md: "3xl" }}
          color="blue.600"
          textAlign="center"
        >
          Create Your Account
        </Heading>
        <form onSubmit={handleSubmit} style={{ width: "100%" }}>
          <Stack spacing={5}>
            <FormControl isRequired isInvalid={!!errors.name}>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <CFaUserCircle color="gray.400" />
                </InputLeftElement>
                <Input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Full Name"
                  focusBorderColor="blue.500"
                  _placeholder={{ color: "gray.400" }}
                />
              </InputGroup>
              <FormErrorMessage>{errors.name}</FormErrorMessage>
            </FormControl>

            <FormControl isRequired isInvalid={!!errors.email}>
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

            <FormControl isRequired isInvalid={!!errors.password}>
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
                    aria-label={showPassword ? "Hide password" : "Show password"}
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
              loadingText="Registering..."
              size="lg"
              rounded="md"
              _hover={{ bg: "blue.600" }}
            >
              Register
            </Button>
          </Stack>
        </form>
      </Stack>
      <Text mt={4} fontSize="sm" color="gray.600">
        Already have an account?{" "}
        <Link
          to="/login"
          style={{ color: "blue.500", fontWeight: "semibold" }}
          _hover={{ textDecoration: "underline" }}
        >
          Login
        </Link>
      </Text>
    </Flex>
  );
};

export default Register;