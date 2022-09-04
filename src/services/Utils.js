import jwt from 'jwt-simple';
import axios from "axios";

class Utils {
    // jwt_decode(token) {
    //     let base64Url = token.split('.')[1];
    //     let base64 = base64Url.replace('-', '+').replace('_', '/');
    //     return JSON.parse(window.atob(base64));
    // }


    // getAuthorizationEndpoint() {
    //     let authServer = "https://localhost:3000/dev/oauth2";
    //     let endpoint = "/auth";
    //
    //     return authServer + endpoint;
    // }
    //
    // getLogoutEndpoint() {
    //     return "https://localhost:3000/dev/auth/logout";
    // }
    //
    // getParameterFromUrlParameters(parameterName) {
    //     let query = location.search.substring(1);
    //     let params = query.split("&");
    //     let parameterValue = undefined;
    //     params.forEach((param, index) => {
    //         let key = param.split("=")[0];
    //         let value = param.split("=")[1];
    //         if (key === parameterName) parameterValue = value;
    //     });
    //
    //     return parameterValue;
    // }

    // removeQueryParametersFromUrl() {
    //     window.history.pushState({}, document.title, window.location.pathname);
    // }

    async synchronousPostLogin(url, data_dict) {
        return await axios.post(url, data_dict);
    }

    addCookie(name, path, value) {
        document.cookie = name + '=' + value + '; path=' + path;
    }

    getCookieValue(name) {
        return document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)')?.pop() || undefined;
    }

    getDictFromJwt(token, publicKey) {
        return jwt.decode(token, publicKey, true, "RS256");
    }

    createJwtFromDict(dict) {
        return jwt.encode(dict, 'dummy-secret');
    }

    async getPublicKeyFromWellKnownEndpoint(endpoint) {
        let response = await axios.get(endpoint);
        return response.data.public_key;
    }

    redirect(redirect_uri, code, state, client_id) {
        let args = new URLSearchParams({
            code: code,
            state: state,
            client_id: client_id
        });
        window.location = redirect_uri + "?" + args;
    }

    // removeCookie(name, path = "/") {
    //     document.cookie = name + '=; Path=' + path + '; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    // }
    //
    // getUserDataFromCookie() {
    //     let userDataJson = this.getCookieValue('user_info');
    //     if (userDataJson === undefined) {
    //         return undefined;
    //     }
    //     let encodedString = userDataJson.slice(1,-1);
    //     return this.getDictFromEncodedString(encodedString);
    // }
    //
    // getUserNameFromCookie() {
    //     let userData = this.getUserDataFromCookie();
    //     try {
    //         return userData.name;
    //     } catch (e) {
    //         return "";
    //     }
    // }
    //
    // getDictFromEncodedString(encodedString) {
    //     return JSON.parse(window.atob(encodedString));
    // }
}


export default new Utils();