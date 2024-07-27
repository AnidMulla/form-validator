import React, { useState } from "react";

const Form = () => {
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(null);
  const [emailStatusMessage, setEmailStatusMessage] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(null);
  const [passwordStatusMessage, setPasswordStatusMessage] = useState("");

  // Email validation function
  const validateEmailInput = (email) => {
    const errors = [];
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email.includes("@")) errors.push("Email must contain an '@' symbol.");
    if (!emailRegex.test(email)) errors.push("Email is not valid.");

    return {
      isValid: errors.length === 0,
      errors,
    };
  };

  // Password validation function
  const validatePasswordInput = (password) => {
    const errors = [];
    const isLengthValid = password.length > 6;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);

    if (!isLengthValid)
      errors.push("Password must be longer than 6 characters.");
    if (!hasUpperCase)
      errors.push("Password must contain at least one uppercase letter.");
    if (!hasLowerCase)
      errors.push("Password must contain at least one lowercase letter.");
    if (!hasNumber) errors.push("Password must contain at least one number.");

    return {
      isValid: isLengthValid && hasUpperCase && hasLowerCase && hasNumber,
      errors,
    };
  };

  const handleEmailInputChange = (e) => {
    const value = e.target.value;
    setEmailInput(value);
    const { isValid, errors } = validateEmailInput(value);
    setIsEmailValid(isValid);
    setEmailStatusMessage(isValid ? "Email is valid" : errors.join(" "));
  };

  const handlePasswordInputChange = (e) => {
    const value = e.target.value;
    setPasswordInput(value);
    const { isValid, errors } = validatePasswordInput(value);
    setIsPasswordValid(isValid);
    setPasswordStatusMessage(isValid ? "Password is valid" : errors.join(" "));
  };
  const isFormValid = isEmailValid && isPasswordValid;
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50 p-6">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">
          React Form Validator
        </h1>
        <p className="text-lg text-gray-600">Validate your form on the go</p>
      </div>
      <div className="w-full max-w-md bg-white border border-gray-300 rounded-lg shadow-sm p-6">
        <form>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-medium mb-1"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={emailInput}
              onChange={handleEmailInputChange}
              className={`block w-full py-2 px-3 border rounded-md ${
                isEmailValid === null
                  ? "border-gray-300"
                  : isEmailValid
                  ? "border-green-500"
                  : "border-red-500"
              }`}
              placeholder="Enter your email"
            />
            <p
              className={`text-sm mt-1 ${
                isEmailValid === true ? "text-green-600" : "text-red-600"
              }`}
            >
              {emailStatusMessage}
            </p>
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-medium mb-1"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={passwordInput}
              onChange={handlePasswordInputChange}
              className={`block w-full py-2 px-3 border rounded-md ${
                isPasswordValid === null
                  ? "border-gray-300"
                  : isPasswordValid
                  ? "border-green-500"
                  : "border-red-500"
              }`}
              placeholder="Enter your password"
            />
            <p
              className={`text-sm mt-1 ${
                isPasswordValid === true ? "text-green-600" : "text-red-600"
              }`}
            >
              {passwordStatusMessage}
            </p>
          </div>
          <button
            type="submit"
            disabled={!isFormValid}
            className={`w-full py-2 px-4 rounded-md ${
              isFormValid
                ? "bg-blue-500 hover:bg-blue-600"
                : "bg-blue-300 cursor-not-allowed"
            } text-white font-medium`}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Form;
