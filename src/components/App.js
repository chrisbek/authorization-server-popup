import React from 'react';
import NewWindow from 'react-new-window'
import OauthLogin from "./Login";

export default class App extends React.Component {
    render() {
        return (
            // <NewWindow features={{width: 650, height: 650}} center={'screen'}>
            //     <OauthLogin />
            // </NewWindow>
            <OauthLogin />
        );
    }
}
