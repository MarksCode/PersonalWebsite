import React from 'react';
import ReactDOM from 'react-dom';
import NetworkCanvas from './components/NetworkCanvas/Canvas.jsx';
import Cube from './components/Cube/Cube.jsx';

class PageContent extends React.Component {
    render() {
        return (
            <div>
                <NetworkCanvas />
                <Cube />
            </div>
        );
    }
}

if (typeof window !== 'undefined') {
    ReactDOM.render(     
        <PageContent />,
        document.getElementById('root')        
    );
}

export default PageContent;