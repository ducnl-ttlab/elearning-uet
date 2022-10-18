import authVi from './vi/auth.vi';
import loginVi from './vi/login.vi';
import registerVi from './vi/register.vi';
import forgotPasswordVi from './vi/forgotPassword.vi';
import setPasswordVi from './vi/setPassword.vi';

const auth = {
    vi: {
        auth: authVi,
        login: loginVi,
        register: registerVi,
        forgotPassword: forgotPasswordVi,
        setPassword: setPasswordVi,
    },
};

export default auth;
