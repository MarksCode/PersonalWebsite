import React from 'react';
import Layout from './Layout.jsx';
import NetworkCanvas from './components/NetworkCanvas/Canvas.jsx';
import Cube from './components/Cube/Cube.jsx';

class Index extends React.Component {
  render() {
    return (
    	<Layout title={this.props.title}>
            <Cube />
    	</Layout>
    );
  }
}

export default Index;