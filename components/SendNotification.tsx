"use client";
import React, { useEffect, useState } from "react";

type DeviceInfo = {
  api_level: string;
  device_id: string;
  device_ip: string;
  device_name: string;
  fcm_token: string;
  last_update: string;
  version: string;
};

function SendNotification() {
  const [devices, setDevices] = useState<DeviceInfo[]>([]);
  const [form, setForm] = useState({
    title: "",
    body: "",
    target: "",
    imageUrl: "",
  });

  const [token, setToken] = useState("");
  useEffect(() => {
    fetchDevices();
  }, []);

  //fetch available devices
  async function fetchDevices() {
    const res = await fetch("api/getuser");
    const data = await res.json();

    const mappedData: DeviceInfo[] = data.result.map((data: DeviceInfo) => {
      const device = {
        api_level: data.api_level,
        device_id: data.device_id,
        device_ip: data.device_ip,
        device_name: data.device_name,
        fcm_token: data.fcm_token,
        last_update: data.last_update,
        version: data.version,
      };

      return device;
    });

    setDevices(mappedData);
  }

  //Bind the forms input
  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  //handle send notifications
  const handleSend = async () => {
    if (form.target == "topic") {
      //send topic
      try {
        const res = await fetch("/api/sendtopic", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: form.title,
            topic: "goodnews",
            message_body: form.body,
          }),
        });

        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData?.message || "Server is down");
        }

        if (res.ok) {
          alert("Notification Send Successfully");
        }
      } catch (error) {
        alert("Failed to send Notifications");
        console.log(error)
      }
    }else {
       try {
        const res = await fetch("/api/send", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: form.title,
            message_body: form.body,
             token: token,
          }),
        });

        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData?.message || "Server is down");
        }

        if (res.ok) {
          alert("Notification Send Successfully");
        }
      } catch (error) {
        alert("Failed to send Notifications");
        console.log(error)
      }
    }
  };

  //set topic
  const handleSetToken = (fcm: string) => {
    setToken(fcm);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow border border-gray-100 space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Title *
        </label>
        <input
          type="text"
          value={form.title}
          onChange={(e) => handleChange("title", e.target.value)}
          className="w-full text-gray-600 border border-gray-400  px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Message Body *
        </label>
        <textarea
          rows={3}
          value={form.body}
          onChange={(e) => handleChange("body", e.target.value)}
          className="w-full text-gray-600 border border-gray-400 px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Target Audience *
        </label>
        <select
          value={form.target}
          onChange={(e) => handleChange("target", e.target.value)}
          className="w-full text-gray-600 border border-gray-400 px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
        >
          <option value="">Select target</option>
          <option value="topic">Topic</option>
          <option value="individual">Individual</option>
        </select>
      </div>

      {form.target == "individual" && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            User Id *
          </label>
          <select
            className="w-full text-gray-600 border border-gray-400 px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            onChange={(e) => handleSetToken(e.target.value)}
          >
            <option value="">Select target</option>

            {devices.map((dev) => {
              return (
                <option key={dev.device_id} value={dev.fcm_token}>
                  {" "}
                  {dev.device_name}{" "}
                </option>
              );
            })}
          </select>
        </div>
      )}

      <div className="flex gap-4">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Time to Live (sec)
          </label>
          <input
            type="number"
            onChange={(e) => handleChange("ttl", e.target.value)}
            className="w-full text-gray-600 border border-gray-400 px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
      </div>

      <button
        onClick={handleSend}
        disabled={!form.title || !form.body || !form.target || form.target == 'individual' && !token}
        className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition disabled:bg-gray-300"
      >
        Send Notification
      </button>
    </div>
  );
}

export default SendNotification;
