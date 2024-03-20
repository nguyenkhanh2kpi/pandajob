import { Heading, HStack, SlideFade, VStack } from "@chakra-ui/react";
import React from "react";
import CompaniesContainer from "./CompaniesContainer";

const Companies = () => (
  <VStack>
    <SlideFade in={true} offsetY={20}>
      <Heading size={"lg"} m={"6"} mt={24}>
      </Heading>
    </SlideFade>
    <HStack align={"flex-start"} w={"80vw"} >
      <CompaniesContainer />  
    </HStack>
  </VStack>
);

export default Companies;
