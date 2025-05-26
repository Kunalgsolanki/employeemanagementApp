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
  Link,
  Avatar,
  FormControl,
  FormHelperText,
  InputRightElement,
  useToast
} from "@chakra-ui/react";
import { FaUserAlt, FaLock } from "react-icons/fa";
import { post } from "../../services/ApiEndpoint";

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

const Login = () => {
  const toast = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleShowClick = () => setShowPassword(!showPassword);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { email, password } = formData;
      const request = await post('/api/auth/login', { email, password });
      const response = request.data;
      console.log("Login Successful:", response);

      // Example toast on success
      toast({
        title: "Login successful",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      // TODO: handle login (store token, navigate, etc.)

    } catch (error) {
      console.error("Login failed:", error);

      toast({
        title: "Login failed",
        description: error.response?.data?.message || "Invalid credentials",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
  };

  return (
    <Flex
      flexDirection="column"
      width="100wh"
      height="100vh"
      backgroundColor="gray.200"
      justifyContent="center"
      alignItems="center"
    >
      <Stack
        flexDir="column"
        mb="2"
        justifyContent="center"
        alignItems="center"
      >
        <Avatar bg="blue.500" />
        <Heading color="blue.400">Welcome</Heading>
        <Box minW={{ base: "90%", md: "468px" }}>
          <form onSubmit={handleSubmit}>
            <Stack
              spacing={4}
              p="1rem"
              backgroundColor="whiteAlpha.900"
              boxShadow="md"
            >
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<CFaUserAlt color="gray.300" />}
                  />
                  <Input
                    required
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    placeholder="Email address"
                  />
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<CFaLock color="gray.300" />}
                  />
                  <Input
                    required
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    placeholder="Password"
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                      {showPassword ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <FormHelperText textAlign="right">
                  <Link href="#">Forgot password?</Link>
                </FormHelperText>
              </FormControl>
              <Button
                borderRadius={0}
                type="submit"
                variant="solid"
                colorScheme="blue"
                width="full"
              >
                Login
              </Button>
            </Stack>
          </form>
        </Box>
      </Stack>
      <Box>
        New to us?{" "}
        <Link color="blue.500" href="/Register">
          Register
        </Link>
      </Box>
    </Flex>
  );
};

export default Login;
