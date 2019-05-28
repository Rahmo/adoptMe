import React from "react";
import ReactDOM from "react-dom";

import { Router } from "@reach/router";
import Results from "./Results";
import Details from "./Details";
import SearchParams from './SearchBox';
import { Provider } from "./SearchContext";

class App extends React.Component {
    render() {
        return (
            <div>
                <Provider value={this.state}>
                <Router>
                    <Results path="/" />
                    <SearchParams path="/search-params" />
                    <Details path="/details/:id" />
                </Router>
                </Provider>
            </div>
        );
    }
}

ReactDOM.render(React.createElement(App), document.getElementById("root"));

export default App;