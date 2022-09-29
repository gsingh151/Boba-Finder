import './App.css';
import { ChakraProvider } from '@chakra-ui/react'
import {
  Center,
  Button,
  Heading,
  VStack,
  HStack,
  Text,
  Image,
  Link
} from '@chakra-ui/react'

import { useState, React } from "react";

function App() {
  const [bobaInfo, setBobaInfo] = useState(null)
  const findBoba = () =>{
    fetch("http://127.0.0.1:5000/boba")
      .then((response) => response.json())
      .then((data) => setBobaInfo(data));
  }
  return (
    <ChakraProvider>
      <Center bg="pink" color="white" padding={48}>
        <VStack>
          <Heading padding={4}>Boba Discovery App</Heading>
          <Button size="lg" color="black" onClick={findBoba}>Find Boba</Button>
          {
            bobaInfo != null && (
              <Center bg="pink" width="100%" color="white" padding={24}>
                <VStack>
                  <Image src={bobaInfo["image_url"]} alt="Boba" boxSize="400px" objectFit="cover"></Image>
                  <Link href={bobaInfo["url"]} isExternal>
                    <Heading>{bobaInfo["name"]}</Heading>
                  </Link>
                  <HStack spacing={24}>
                    <Text fontSize="3xl">{bobaInfo["review_count"]} Reviews</Text>
                    <Text fontSize="3xl">{bobaInfo["rating"]} Rating</Text>
                  </HStack>
                  <Text fontSize="2xl">{bobaInfo["location"]["address1"]}</Text>
                  <HStack padding={16} spacing={16}>
                    <Image src={bobaInfo["photos"][0]} boxSize="210px" objectFit="cover"></Image>
                    <Image src={bobaInfo["photos"][1]} boxSize="210px" objectFit="cover"></Image>
                    <Image src={bobaInfo["photos"][2]} boxSize="210px" objectFit="cover"></Image>
                  </HStack>
                </VStack>
              </Center>
            ) 
          }
        </VStack>
      </Center>
    </ChakraProvider>
  )
}

export default App;
