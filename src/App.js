import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Layout, Input, Button } from "antd";
const { Header, Footer, Content } = Layout;

class App extends Component {
  render() {
    return (
      <Layout className="App">
        <Header className="App-header">
          <h1>Quick Todo</h1>
        </Header>
        <Content className="App-content">Content</Content>
        <Footer className="App-footer">&copy; My Company</Footer>
      </Layout>
    );
  }
}

export default App;
