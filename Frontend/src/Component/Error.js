// src/components/Error.js
import { Alert, AlertIcon, AlertTitle, AlertDescription } from '@chakra-ui/react';
import {Tr, Td} from "@chakra-ui/react"
const Error = () => (
  <Tr>
    <Td colSpan={11}>
      <Alert status="error">
        <AlertIcon />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>Failed to load data. Please try again later.</AlertDescription>
      </Alert>
    </Td>
  </Tr>
);

export default Error;