async function handleSubmit() {
  const input = document.getElementById("jsonInput").value;
  const responseOptions = Array.from(
    document.getElementById("responseOptions").selectedOptions
  ).map((option) => option.value);

  try {
    JSON.parse(input); // Check if the input is valid JSON

    const res = await fetch("https://bajaj-nslb.onrender.com/bfhl", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: input,
    });

    if (!res.ok) throw new Error("Network response was not ok");

    const data = await res.json();
    displayResponse(data, responseOptions);
  } catch (error) {
    console.error(error);
    alert("Invalid JSON or Backend Error");
  }
}

function displayResponse(response, selectedOptions) {
  const filteredResponse = Object.fromEntries(
    Object.entries(response).filter(([key]) => selectedOptions.includes(key))
  );

  document.getElementById("responseDisplay").textContent = JSON.stringify(
    filteredResponse,
    null,
    2
  );
}
