import React, { Component } from "react";
import Web3 from "web3";
import EthmojiAPI from "ethmoji-js";

import {
  Button,
  Input,
  Container,
  Title,
  Spacer,
  Avatar,
  Error
} from "./components";

export default class Example extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: "unset",
      address: "",
      api: undefined,
      avatar: undefined,
      error: undefined
    };

    this.setEthmojiAPI();
    this.getAvatar = this.getAvatar.bind(this);
    this.updateAddress = this.updateAddress.bind(this);
  }

  async setEthmojiAPI() {
    try {
      const api = new EthmojiAPI(global.web3.currentProvider);
      await api.init();
      this.setState({ api: api, status: "set" });
    } catch (error) {
      this.setState({ status: "error", error: error });
    }
  }

  async getAvatar() {
    this.setState({ status: "loading" });
    const avatar = await this.state.api.getAvatar(this.state.address);
    this.setState({ avatar: avatar, status: "loaded" });
  }

  updateAddress(event) {
    this.setState({ address: event.target.value });
  }

  render() {
    return (
      <Container>
        <Title>Ethmoji Avatar Demo</Title>
        <Spacer />
        {this.state.error !== undefined && (
          <div>
            <Error>{this.state.error.message}</Error>
            <Spacer />
          </div>
        )}

        {this.state.status === "unset" ? (
          <div>Preparing...</div>
        ) : (
          <div>
            <form
              onSubmit={e => {
                e.preventDefault();
                this.getAvatar();
              }}
            >
              <Input
                type="text"
                ref="address"
                placeholder="Enter Ethereum address..."
                onChange={event => this.updateAddress(event)}
                disabled={this.state.status === "loading"}
              />
              <Spacer inline />
              <Button
                type="submit"
                disabled={
                  this.state.status === "loading" ||
                  this.state.status === "error" ||
                  this.state.address === ""
                }
              >
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
