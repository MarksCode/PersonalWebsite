import React from 'react';
import Layout from './layout';
import NetworkCanvas from '../lib/components/NetworkCanvas/Canvas.jsx';

class Index extends React.Component {
  render() {
    return (
    	<Layout title={this.props.title}>
    	</Layout>
    );
  }
}

export default Index;