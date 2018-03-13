import React, { Component } from "react";
import Web3 from "web3";
import EthmojiAPI from "ethmoji-js";

import { Button, Input, Container, Title, Spacer, Avatar } from "./components";

export default class Example extends Component {
  constructor(props) {
    super(props);

    this.state = {
      status: "unset",
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
    this.setState({ api: api, status: "set" });
  }

  async getAvatar(address) {
    this.setState({
      status: "loading"
    });
    const avatar = await this.state.api.getAvatar(address);
    this.setState({ avatar: avatar, status: "loaded", address: address });
  }

  get web3() {
    return new Web3(new Web3.providers.HttpProvider("http://localhost:8545/"));
  }

  render() {
    return (
      <Container>
        <Title>Ethmoji Avatar</Title>
        <Spacer />
        {this.state.status === "unset" ? (
          <div>Preparing...</div>
        ) : (
          <div>
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
              <Button type="submit" disabled={this.state.status === "loading"}>
                {this.state.status === "loading"
                  ? "Fetching..."
                  : "Fetch Ethmoji Avatar"}
              </Button>
            </form>
            <Spacer />
            {this.state.avatar !== undefined && (
              <Avatar src={this.state.avatar.imageUrl} />
            )}
          </div>
        )}
      </Container>
    );
  }
}
