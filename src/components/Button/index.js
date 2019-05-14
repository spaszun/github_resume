import styled from "styled-components";

const Button = styled.button`
  display: inline-block;
  border-radius: 3px;
  padding: 0.5rem 0;
  margin: 0.5rem 1rem;
  width: 20rem;
  background: transparent;
  color: ${({ disabled }) => (disabled ? "#DCDAD1" : "black")};
  border: ${({ disabled }) => `2px solid ${disabled ? "#DCDAD1" : "black"}`};
`;

export default Button;
