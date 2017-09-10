import React from 'react';

class Layout extends React.Component {
  render() {
    return (
      <html>
        <head>
          <title>{this.props.title}</title>
          <script type="text/javascript" src="/public/bundle.js"></script>
        </head>
        <body>
          {this.props.children}
        </body>
      </html>
    );
  }
}


export default Layout;