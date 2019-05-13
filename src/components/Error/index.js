import React from "react";
import { Flex } from "@rebass/grid";

const Error = ({ title, message }) => (
  <Flex
    flexDirection="column"
    css={{ height: "100%" }}
    alignItems="center"
    justifyContent="center"
  >
    <h3>{title}</h3>
    <p>{message}</p>
  </Flex>
);

export default Error;
