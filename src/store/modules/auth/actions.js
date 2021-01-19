export default {
  login() {},
  async signup(context, payload) {
    const newUser = {
      email: payload.email,
      password: payload.password,
      returnSecureToken: true
    };
    const response = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.AUTH_KEY}`,
      {
        method: 'POST',
        body: JSON.stringify(newUser)
      }
    );

    const responseData = await response.json();
    if (!response.ok) {
      const error = new Error(
        responseData.message ||
          'Something when wrong while creating your profile, please try again'
      );
      throw error;
    }
    const localUser = {
      token: responseData.idToken,
      userId: responseData.localId,
      tokenExpiration: responseData.expiresIn
    };
    context.commit('setUser', localUser);
  }
};
