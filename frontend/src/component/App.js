import React from "react";
import Items from "./items";

class App extends React.Component {
    render() {
        return (
            <div className="row">
                    <div className="container">
                        <Items />
                    </div>
            </div>
        )
    }
}

export default App;