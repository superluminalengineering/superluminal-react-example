import React from 'react'
import Superluminal from 'superluminal-react'

import { TailSpin } from 'react-loader-spinner'

import './App.css'

interface Props { }

interface State {
    authToken: string | null
}

class App extends React.Component<Props, State> {
    superluminalRef = React.createRef<Superluminal>()

    constructor(props: Props) {
        super(props);
        this.state = { authToken: null };
        // Generate a random test user ID
        var userID = localStorage.getItem('testUserID');
        if (!userID) {
            function getRandomInt(max: number) {
                return Math.floor(Math.random() * max);
            }
            userID = `${getRandomInt(1000000000)}`;
            localStorage.setItem('testUserID', userID);
        }
        // Perform initialization on the back-end
        fetch(`http://localhost:3000/initialize`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                userID: userID,
                projectID: 'main',
            })
        })
        .then((response) => response.json())
        .then((json) => {
            this.setState({ authToken: json.token });
        })
    }

    componentDidMount(): void {
        // Optionally use the `setUser` method to set user info when available. The user's 
        // name will default to 'User' in the chat if left blank.
        this.superluminalRef.current?.setUser({ id: '', name: 'Test User' });
    }

    render() {
        const { authToken } = this.state;
        if (authToken) {
            return <div className="App">
                <div style={{ flexGrow: 1, height: '100%' }}></div>
                <div style={{ display: 'flex', flexDirection: 'column', width: '420px', height: '100%', flexShrink: 0 }}>
                    <div style={{ width: '100%', height: '100%' }}>
                        <Superluminal
                            ref={this.superluminalRef}
                            authToken={authToken}
                            userProfilePictureStyle={{ background: '#4F39EF' }}
                            sendButtonStyle={{ background: '#4F39EF' }}
                            style={{ border: 'none', borderLeft: 'solid 1px #0000001A' }}
                        />
                    </div>
                </div>
            </div>
        } else {
            return <div className="App" style={{ alignItems: 'center', justifyContent: 'center' }}>
                <TailSpin width="32px" height="32px" color="black" />
            </div>
        }
    }
}

export default App
