export async function createNewUser(formData) {
  console.log(formData);

  try {
    const response = await fetch("http://localhost:3000/api/addUsers", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();
    // console.log("User created successfully:", result);
    return result;
  } catch (error) {
    console.error("Error creating user:", error.message);
  }
}
