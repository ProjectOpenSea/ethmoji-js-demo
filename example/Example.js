import React, { Component } from "react";
import Web3 from "web3";
import EthmojiAPI from "ethmoji-js";

import {
  Button,
  Input,
  Container,
  Title,
  Loader,
  Spacer,
  Avatar
} from "./components";

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
    this.getAvatar = this.getAvatar.bind(this);
  }

  async setEthmojiAPI() {
    const api = new EthmojiAPI();
    await api.init(this.web3.currentProvider);
    this.setState({ api: api, status: "loaded" });
  }

  async getAvatar(address) {
    this.setState({
      status: "loading"
    });
    const avatar = await this.state.api.getAvatar(address);
    this.setState({ avatar: avatar, status: "loaded", address: address });
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
        <Spacer />
        <form
          onSubmit={e => {
            e.preventDefault();
            this.getAvatar(this.refs.address.value);
          }}
        >
          <Input
            type="text"
            ref="address"
            placeholder="Enter Ethereum address..."
            defaultValue={this.state.address}
            disabled={this.state.status === "loading"}
          />
          <Spacer inline />
          <Button type="submit">Fetch Ethmoji Avatar</Button>
        </form>
        <Spacer />
        {this.state.status === "loading" && <Loader>Loading...</Loader>}
        {this.state.avatar !== undefined && (
          <Avatar src={this.state.avatar.imageUrl} />
        )}
      </Container>
    );
  }
}
