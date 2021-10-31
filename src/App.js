import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomePage from "./Pages/homePage/homePage";
import ShopPage from "./Pages/shoppage/shopPage";
import Header from "./components/header/header";
import SignInAndUp from "./Pages/sign in and up/sign-in-up";
import { auth, createUserProfileDocument } from "./firebase/firebase";
class App extends React.Component {
    constructor() {
        super();
        this.state = {
            currentUser: null,
        };
    }
    unsubscribeFormAuth = null;

    componentDidMount() {
        this.unsubscribeFormAuth = auth.onAuthStateChanged(async (userAuth) => {
            if (userAuth) {
                const userRef = await createUserProfileDocument(userAuth);
                userRef.onSnapshot((snapshot) => {
                    this.setState({
                        currentUser: {
                            id: snapshot.id,
                            ...snapshot.data(),
                        },
                    });
                    console.log(this.state);
                });
            }

            this.setState({ currentUser: userAuth });
        });
    }
    componentWillUnmount() {
        this.unsubscribeFormAuth();
    }
    render() {
        return (
            <div>
                <Router>
                    <Header currentUser={this.state.currentUser} />
                    <Switch>
                        <Route exact path="/" component={HomePage} />
                        <Route exact path="/shop" component={ShopPage} />
                        <Route exact path="/signin" component={SignInAndUp} />
                    </Switch>
                </Router>
            </div>
        );
    }
}

export default App;
