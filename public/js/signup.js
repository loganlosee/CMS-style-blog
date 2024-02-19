const signupFormHandler = async (event) => {
    event.preventDefault();
  
    const username = document.querySelector("#username-signup").value.trim();
    const password = document.querySelector("#password-signup").value.trim();
  
    if (username && password) {
      const response = await fetch("/api/users", {
        method: "POST",
        body: JSON.stringify({
          username,
          password,
        }),
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) {
        alert(response.statusText);
      } else {
        console.log("success");
        document.location.replace("/dashboard");
      }
    }
  };
  
  document
    .querySelector("#signup-form")
    .addEventListener("submit", signupFormHandler);