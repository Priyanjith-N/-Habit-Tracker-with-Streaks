export const ErrorCode = Object.freeze({
    CREDENTIALS_NOT_GIVEN_OR_NOT_FOUND: "404x1 Required credentials not found or not given",
    PROVIDE_VAILD_EMAIL: "400x1 Not a vaild email provide a vaild email",
    PASSWORD_INVAILD: "400x2 both password and confirm password didn't match",
    EMAIL_TAKEN: "400x3 email is in use",
    USERNAME_TAKEN: "400x4 username is in use",
    USER_NOT_FOUND: "404x2 user with that email not found",
    PASSWORD_INCORRECT: "400x5 password incorrect",
    TOKEN_NOT_FOUND: "404x3 token not found not AUTHENTICATED",
    TOKEN_PAYLOAD_NOT_VALID: "400x6 token payload not vaild",
    TOKEN_EXPIRED_NEW_TOKEN_NEEDED: "401x1 token expired new token needed",
    PASSWORD_MIN_LENGTH_NOT_MEET: "400x7 Should contain least 8 characters in password"
});