import { Component } from 'react';

class AMComponent extends Component {
    setInput (param) {
        this.setState((state) => {
            state.input = Object.assign(state.input, param);
            return state;
        });
    }

    isLoading (loadingArray) {
        return loadingArray.some(loading => loading);
    }
}

export default AMComponent;