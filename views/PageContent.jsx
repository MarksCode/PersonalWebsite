import React from 'react';
import ReactDOM from 'react-dom';
import Cube from './components/Cube/Cube.jsx';

class PageContent extends React.Component {
    render() {
        return (
            <Cube />
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