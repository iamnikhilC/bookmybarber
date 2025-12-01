
export const ValidatePassword = (password) => {
    const PassErrors = [];
  
    if (password.length < 8) PassErrors.push("Password must be at least 8 characters");
    if (!/[A-Z]/.test(password)) PassErrors.push("Password must contain an uppercase letter");
    if (!/[a-z]/.test(password)) PassErrors.push("Password must contain a lowercase letter");
    if (!/[0-9]/.test(password)) PassErrors.push("Password must contain a number");
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) PassErrors.push("Password must contain a special character");
  
    return { valid: PassErrors.length === 0, PassErrors };
  };

  export const EyeIcon = ({ visible }) => {
    return visible ? (
      // Eye closed icon (flat)
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        width="20"
        height="20"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M13.875 18.825A10.05 10.05 0 0112 19c-5 0-9-5-9-5s1.5-2.5 4-4m3.5 1.5a3 3 0 104.25 4.25M15 12a3 3 0 01-3 3"
        />
      </svg>
    ) : (
      // Eye open icon (flat)
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        width="20"
        height="20"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
        />
      </svg>
    );
  };