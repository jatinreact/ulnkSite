import React, { Fragment, Component } from "react";
import Footer from "./Footer/Footer.jsx";
import HeaderForLinks from "./Header/HeaderForLinks.jsx";


const HOC1 = (Wcomponent) => {
    return class extends Component {
        render() {
            return (
                <Fragment>
                    <div className="app-container-hoc main-margin">
                        <HeaderForLinks {...this.props} />
                        <div>
                            <Wcomponent {...this.props} />
                        </div>
                        <Footer />
                    </div>
                </Fragment>
            );
        }
    };
};

export default (HOC1);
