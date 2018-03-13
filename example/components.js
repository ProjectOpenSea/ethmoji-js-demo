import styled, { css } from "react-emotion";

export const Avatar = styled("img")`
  border-radius: 50%;
  max-height: 200px;
`;

export const Button = styled("button")`
  background-color: black;
  color: white;
  font-size: 1em;
  line-height: 1.2;
  font-weight: 500;
  display: inline-block;
  border-radius: 0.3em;
  padding: 0.8em 1em 0.75em 1em;
  border: 0;
  cursor: pointer;
  transition: all 0.15s ease-out;

  &:hover {
    box-shadow: 2px 5px 15px rgba(36, 37, 38, 0.13);
  }

  &:disabled {
    cursor: not-allowed;

    &:hover {
      box-shadow: none;
    }
  }

  &:active {
    background-color: black;
    box-shadow: 1px 2px 10px rgba(36, 37, 38, 0.13);
  }
`;

export const Input = styled("input")`
  font-size: 1em;
  line-height: 1.2;
  font-weight: 400;
  border-radius: 0.2em;
  padding: 0.7em 0.5em;
  transition: all 0.15s ease-out;
  vertical-align: top;
  border: 2px solid #a9bac9;

  &:hover,
  &:focus,
  &:active {
    outline: none;
  }
`;

export const Container = styled("div")`
  text-align: center;
  padding: 40px;
  font-family: Helvetica, Arial, sans-serif;
  width: 100%;
`;

export const Title = styled("h1")`
  font-weight: normal;
  font-size: 2em;
  margin: 0 0 10px;
`;

export const Loader = styled("div")``;

const spacerSize = (pads, props) => {
  return css`
    ${props.inline ? "width:" : "height:"} ${20 * pads}px;
  `;
};

export const Spacer = styled("div")`
  ${props => {
    if (props.big) return spacerSize(2, props);
    if (props.small) return spacerSize(0.5, props);
    if (props.size) return spacerSize(props.size, props);
    return spacerSize(1, props);
  }};
  ${props =>
    props.inline &&
    `
    display: inline-block;
  `};
`;
