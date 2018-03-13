import React, { Component } from "react";
import Web3 from "web3";
import styled from "react-emotion";
import EthmojiAPI from "ethmoji-js";

const Container = styled("div")`
  text-align: center;
  padding: 20px;
  font-family: Helvetica, Arial, sans-serif;
`;

const Title = styled("h1")`
  font-weight: normal;
  font-size: 2em;
  margin: 0 0 10px;
`;

const Loading = styled("div")`
  color: #aaa;
`;

const PageContainer = styled("div")`
  width: 640px;
  margin: 0 auto 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  @media (max-width: 700px) {
    width: 100%;
  }
`;

const Error = styled("div")`
  background-color: #bb0000;
  border: 1px solid #aa0000;
  border-radius: 3px;
  padding: 10px;
  display: inline-block;
  color: #fff;
`;

export default class Example extends Component {
  constructor(props) {
    super(props);

    this.state = {
      status: "loading",
      api: undefined,
      avatar: undefined,
      address: ""
    };

    this.setEthmojiAPI();
  }

  async setEthmojiAPI() {
    this.state.api = new EthmojiAPI();
    await this.state.api.init(this.web3.currentProvider);
    this.state.status = "loaded";
  }

  async getAvatar() {
    this.state.avatar = await this.api.getAvatar(this.state.address);
  }

  get web3() {
    return new Web3(
      new Web3.providers.HttpProvider(
        "https://rinkeby.infura.io/0zY4DU8r3wE3iXqvSxp1"
      )
    );
  }

  render() {
    return (
      <Container>
        <Title>Ethmoji Avatar</Title>
        <form
          onSubmit={e => {
            e.preventDefault();
            this.getAvatar(this.refs.address.value);
          }}
        >
          <input type="text" ref="address" defaultValue={this.state.address} />
          <input type="submit" value="Fetch Ethmoji Avatar" />
        </form>
      </Container>
    );
  }
}
