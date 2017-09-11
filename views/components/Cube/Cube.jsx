import React from 'react';

class Cube extends React.Component {

    componentDidMount() {
        console.log("SUHHH");
        this.el.innerText = "YOYOY";
    }

	render() {
        return (
            <div>
                <h1
                    ref={(el) => {this.h1 = el;}}>
                    Hello
                </h1>
            </div>
        );
	}
}

export default Cube;