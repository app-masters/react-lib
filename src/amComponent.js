import { Component } from 'react';
import _ from 'lodash';

class AMComponent extends Component {
    setInput (key, value) {
        this.setState(state => {
            key = 'input.' + key;
            _.set(state, key, value);
            return state;
        });
    }

    isLoading (loadingArray) {
        return loadingArray.some(loading => loading);
    }
}

export default AMComponent;