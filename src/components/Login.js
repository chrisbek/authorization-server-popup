import React, {useState, useEffect} from 'react';
import {useForm} from 'react-hook-form';
import styles from '../styles/login.scss';
import Utils from "../services/Utils";


export default function OauthLogin() {
    const {register, handleSubmit, formState: {errors}} = useForm();
    const [authErrors, setAuthErrors] = useState(undefined);
    const [publicKey, setPublicKey] = useState(undefined);

    useEffect(async () => {
        const pkey = await Utils.getPublicKeyFromWellKnownEndpoint(
            "https://authorization-server.local/auth/.well-known/openid-configuration"
        );
        setPublicKey(pkey);
    }, []);

    async function onSubmit(data) {
        let token = Utils.getCookieValue('authorization_info');
        let cookieData = Utils.getDictFromJwt(token, publicKey);

        let authUrl = 'https://authorization-server.local/auth/login';
        try {
            let response = await Utils.synchronousPostLogin(authUrl, {
                redirect_uri: cookieData['redirect_uri'],
                client_id: cookieData['client_id'],
                state: cookieData['state'],
                scope: cookieData['scope'],
                email: data.email,
                password: data.password
            });
            Utils.redirect(
                response.data['redirect_uri'],
                response.data['code'],
                response.data['state'],
                response.data['client_id'],
            );
        } catch (error) {
            if (error.response.status === 401) {
                //    incorrect credentials
                setAuthErrors(['Invalid credentials']);
            } else {
                // server error
                setAuthErrors(['Unexpected error']);
            }
        }

    }

    function getAuthorizationMessage() {
        if (publicKey === undefined) {
            return undefined;
        }

        let token = Utils.getCookieValue('authorization_info');
        let cookieData = Utils.getDictFromJwt(token, publicKey);
        let request_scope = cookieData['scope'].split(',')

        let message = "Local Authorization server wants access to your ";
        if (request_scope.length > 0) {
            for (let i = 0; i < request_scope.length - 1; i++) {
                message += request_scope[i] + ", ";
            }
            message += request_scope[request_scope.length - 1];
        } else {
            message += 'email';
        }

        return message;
    }

    return (
        <div className={styles.container}>
            <div className={styles.background}/>
            <form onSubmit={handleSubmit(onSubmit)}>
                {/*<div className={styles.message}>{getAuthorizationMessage()}</div>*/}
                <input className={styles.email} type="email"
                       placeholder="Email" {...register('email', {required: true})} />
                <input className={styles.password} type="password"
                       placeholder="Password" {...register('password', {required: true})} />
                {/*/!*{errors.email && <p>Last name is required.</p>}*!/*/}
                {/*/!*{errors.age && <p>Please enter number for age.</p>}*!/*/}
                <button className={styles.btn} type="submit">Log in</button>
                {authErrors ? <div className={styles.authErrors}>{authErrors}</div> : undefined}
            </form>

        </div>
    );
}