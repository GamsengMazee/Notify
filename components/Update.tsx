import React, { useEffect, useState } from "react";

interface FormData {
  secretKey: string;
  versionName: string;
  versionNumber: number | "";
}

function Update() {
  const [formData, setFormData] = useState({
    secretKey: "",
    versionName: "",
    versionNumber: "",
  });
  const [currentVersion, setCurrentVersion] = useState({
    verName: "",
    verNum: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: name === "versionNumber" ? Number(value) || "" : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          secret_key: formData.secretKey,
          version_name: formData.versionName,
          version_number: formData.versionNumber,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData?.message || "Server is down");
      }

      if (res.ok) {
        alert("App Update Request Sent Successfully");
      }
      getCurrentVersion()
    } catch (error) {
      alert("Unauthorized Access!");
      console.log(error);
    }
  };

  const getCurrentVersion = async () => {
    try {
      const response = await fetch(`/api/getupdate`);
      if (!response.ok) {
        throw new Error("Failed to fetch current version");
      }

      const responseData = await response.json();

      setCurrentVersion({
        verName: responseData.version_name,
        verNum: responseData.version_number,
      });
    } catch (error) {
      console.error("Failed to fetch current version:", error);
    }
  };

  useEffect(() => {
    getCurrentVersion();
  }, []);

  return (
    <>
      <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
  {/* Version Number Card */}
  <div className="rounded-2xl border border-blue-100 bg-white p-6 text-center shadow-sm transition-all hover:shadow-md">
    <div className="flex flex-col items-center">
      <span className="rounded-full bg-blue-100 p-2 text-blue-600">
        📦
      </span>
      <h3 className="mt-3 inline-block rounded-full bg-blue-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-blue-700">
        Current Version
      </h3>
    </div>

    <p className="mt-4 text-3xl font-extrabold text-blue-600">
      {currentVersion.verNum.toFixed(1)}
    </p>
  </div>

  {/* Version Name Card */}
  <div className="rounded-2xl border border-green-100 bg-white p-6 text-center shadow-sm transition-all hover:shadow-md">
    <div className="flex flex-col items-center">
      <span className="rounded-full bg-green-100 p-2 text-green-600">
        🚀
      </span>
      <h3 className="mt-3 inline-block rounded-full bg-blue-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-blue-700">
        Version Name
      </h3>
    </div>

    <p className="mt-4 text-3xl font-extrabold text-green-600">
      {currentVersion.verName}
    </p>
  </div>
</div>

      <form
        onSubmit={handleSubmit}
        className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow border border-gray-100 space-y-4"
      >
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
    </>
  );
}

export default Update;
