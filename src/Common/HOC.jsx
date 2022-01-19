import React, { Fragment, Component } from "react";
import Footer from "./Footer/Footer.jsx";
import Header from "./Header/Header.jsx";
import HeaderAfterLogin from "./Header/HeaderAfterLogin.jsx";
const HOC = (Wcomponent) => {
    return class extends Component {
        render() {
            let isAuth = localStorage.getItem("isAuth")
            return (
                <Fragment>
                    <div className="app-container-hoc main-margin">
                        {!isAuth ? <Header {...this.props} /> : <HeaderAfterLogin {...this.props} />}
                        <div>
                            <Wcomponent {...this.props} />
                        </div>
                        <Footer {...this.props} />
                    </div>
                </Fragment>
            );
        }
    };
};

export default HOC;
