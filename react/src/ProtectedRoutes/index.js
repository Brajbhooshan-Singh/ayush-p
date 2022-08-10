import React from "react";
import { IsUser, IsUserCreator } from "../helper/CheckUserAuth";
import LoadingToRedirect from "./LoadingToRedirect";

export function User({ children: Component, ...rest }) {
    if (IsUser) {
        return (
            <React.Fragment {...rest}>
                {Component}
            </React.Fragment>
        );
    }
    else {
        return <LoadingToRedirect />;
    }
}

export function Creator({ children: Component, ...rest }) {
    if (IsUserCreator) {
        return (
            <React.Fragment {...rest}>
                {Component}
            </React.Fragment>
        );
    }
    else {
        return <LoadingToRedirect />;
    }
}