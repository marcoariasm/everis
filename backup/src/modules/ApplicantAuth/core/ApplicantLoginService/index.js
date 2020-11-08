import loginPlaceholderJSON from './login-response.json';
import Persistence from './persistence';
import { ACCESS_TOKEN, HOST } from './constants';

export const login = async(payload) => {
    try {
        // Send payload to api
        const api = `https://jsonplaceholder.typicode.com/todos/1`;
        const response = await fetch(api);
        const userSession = { "accessToken":"lUZt1GVLPeTMwFAE4vNDPDu3tZwFMbhZ3ks9DrOprTL313yz3ZLKYAQoBZc0eREFtWqNrk70rXCvSTPX2wTqkCnv7wKj" };// response.json();
        Persistence.addValue(ACCESS_TOKEN, userSession.accessToken);
        return loginPlaceholderJSON;
    } catch (error) {
        console.trace(error);
    }
}

export const autoLogin = (token) => {
    try {
        const api = `${HOST}api/v1/auth/auto-login/${token}`;
        return { applicantId: 1 }; // fetch user with token GET
    } catch (error) {
        console.trace(error);
    }
}


export const resendVerification = async(payload) => {
    const api = `https://jsonplaceholder.typicode.com/todos/1`;
    const response = await fetch(api);
    const userSession = { status: 200 }; //response.json();
    if (userSession.status === 200) {
        return loginPlaceholderJSON;
    }
}

export const createAccount = async(payload) => {
  // Send payload to api
  const api = `https://jsonplaceholder.typicode.com/todos/1`;
  const response = await fetch(api);
  if (response) return response;
}

export const resendEmail = async(email) => {
    // Send payload to api
    const api = `https://jsonplaceholder.typicode.com/todos/1`;
    const response = await fetch(api);
    if (response) return response;
}

export const completeRegistration = async(payload) => {
    // Send payload to api
    try {
        const api = `https://jsonplaceholder.typicode.com/todos/1`;
        const response = await fetch(api);
        const userSession = { "accessToken":"lUZt1GVLPeTMwFAE4vNDPDu3tZwFMbhZ3ks9DrOprTL313yz3ZLKYAQoBZc0eREFtWqNrk70rXCvSTPX2wTqkCnv7wKj" };// response.json();
        await Persistence.addValue(ACCESS_TOKEN, userSession.accessToken);
        return loginPlaceholderJSON;
    } catch (error) {
        console.trace(error);
    }
}