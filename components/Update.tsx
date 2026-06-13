import React, { useState } from 'react';

interface FormData {
  secretKey: string;
  versionName: string;
  versionNumber: number | '';
}


function Update() {
  const [formData, setFormData] = useState({
    secretKey: '',
    versionName: '',
    versionNumber: '',
  });

  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        name === 'versionNumber' ? Number(value) || '' : value,
    }));
  };

  const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {

    e.preventDefault();
    try {
        const res = await fetch("/api/update", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            secret_key: formData.secretKey,
            version_name: formData.versionName,
            version_number: formData.versionNumber
          }),
        });

        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData?.message || "Server is down");
        }

        if (res.ok) {
         alert("App Update Request Sent Successfully")
        }
      } catch (error) {
        alert("Server Error!");
        console.log(error)
      }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow border border-gray-100 space-y-4">
      <input
        type="password"
        name="secretKey"
        value={formData.secretKey}
        onChange={handleChange}
        placeholder="Enter secret key"
        className="w-full border px-3 py-2 rounded-lg"
      />

      <input
        type="text"
        name="versionName"
        value={formData.versionName}
        onChange={handleChange}
        placeholder="Version Name"
        className="w-full border px-3 py-2 rounded-lg"
      />

      <input
        type="number"
        name="versionNumber"
        value={formData.versionNumber}
        onChange={handleChange}
        placeholder="Version Number"
        className="w-full border px-3 py-2 rounded-lg"
      />

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-lg"
      >
        Update
      </button>
    </form>
  );
}

export default Update;