import React from 'react';

class Layout extends React.Component {
    render() {
        return (
            <html>
            <head>
                <title>{this.props.title}</title>
                <link rel="stylesheet" href="styles.css" />
            </head>
            <body> 
                <div id="root">
                    {this.props.children}
                </div>
                <script type="text/javascript" src="./bundle.js"></script>
            </body>
            </html>
        );
    }
}

export default Layout;