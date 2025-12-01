"use client";

import { useCallback, useEffect, useState } from "react";
import { Bell, Send, Users, TrendingUp, Settings, Home, History } from "lucide-react";
import { previousNotifications } from "@/utils/data";
import SendNotification from "@/components/SendNotification";
import Login from "@/components/Login";


export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "bg-green-100 text-green-700";
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      case "failed":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  const stats = [
    { title: "Total Sent", value: "24,589", icon: Send, color: "text-blue-600" },
    { title: "Delivered", value: "24,124", icon: Bell, color: "text-green-600" },
    { title: "Active Users", value: "12,345", icon: Users, color: "text-purple-600" },
    { title: "Click Rate", value: "18.5%", icon: TrendingUp, color: "text-orange-600" },
  ];

  useEffect(() => {
     authenticate()
  },[])

  //check if user is already logged in
  const authenticate = useCallback( async() => {
     try {
      const response = await fetch("/api/auth0", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 201) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.log(error);
    }
  }, [])

  //function to trigger login state
  function checkLogIn(){
    setIsLoggedIn(true)
  }

  if(!isLoggedIn){
    return <Login checkLogIn = {checkLogIn}/>
  }else {
       return (
    <div className="min-h-screen flex bg-white">
      {/* Sidebar */}
      <aside className="w-64 border-r border-gray-200 p-6">
        <div className="flex items-center gap-2 mb-10">
          <div className="bg-blue-600 p-2 rounded-lg">
            <Bell className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">NotifyHub</h1>
            <p className="text-sm text-gray-500">Admin Dashboard</p>
          </div>
        </div>

        <nav className="space-y-2">
          {[
            { tab: "dashboard", label: "Dashboard", icon: Home },
            { tab: "send", label: "Send Notification", icon: Send },
            { tab: "history", label: "History", icon: History },
            { tab: "settings", label: "Settings", icon: Settings },
          ].map(({ tab, label, icon: Icon }) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`w-full flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition ${
                activeTab === tab
                  ? "bg-blue-600 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main */}
      <main className="flex-1 p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {activeTab === "dashboard" && "Dashboard Overview"}
          {activeTab === "send" && "Send New Notification"}
          {activeTab === "history" && "Notification History"}
          {activeTab === "settings" && "Settings"}
        </h2>
        <p className="text-gray-500 mb-8">
          {activeTab === "dashboard" && "Monitor your notification performance"}
          {activeTab === "send" && "Create and send push notifications"}
          {activeTab === "history" && "View your past campaigns"}
          {activeTab === "settings" && "Configure FCM settings"}
        </p>

        {/* Dashboard */}
        {activeTab === "dashboard" && (
          <div className="space-y-8">
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((s, i) => (
                <div
                  key={i}
                  className="p-6 bg-white rounded-xl shadow border border-gray-100"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-gray-500">{s.title}</p>
                      <p className="text-2xl font-semibold text-gray-900">
                        {s.value}
                      </p>
                    </div>
                    <div className={`p-2 rounded-lg bg-gray-100 ${s.color}`}>
                      <s.icon className="w-6 h-6" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Recent Notifications */}
            <div className="p-6 bg-white rounded-xl shadow border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Recent Notifications
              </h3>
              <div className="space-y-4">
                {previousNotifications.slice(0, 3).map((n) => (
                  <div
                    key={n.id}
                    className="flex justify-between items-center p-4 bg-gray-50 rounded-lg"
                  >
                    <div>
                      <h4 className="font-medium text-gray-900">{n.title}</h4>
                      <p className="text-sm text-gray-600">{n.body}</p>
                      <p className="text-xs text-gray-400 mt-1">
                        {formatDate(n.sent)}
                      </p>
                    </div>
                    <div className="text-right">
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(
                          n.status
                        )}`}
                      >
                        {n.status}
                      </span>
                      <p className="text-sm text-gray-600 mt-1">
                        {n.delivered.toLocaleString()} delivered
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Send Notification */}
        {activeTab === "send" && (
          <SendNotification />
        )}

        {/* History */}
        {activeTab === "history" && (
          <div className="space-y-6">
            {previousNotifications.map((n) => (
              <div
                key={n.id}
                className="p-6 bg-white rounded-xl shadow border border-gray-100"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-semibold text-gray-900">{n.title}</h4>
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(
                          n.status
                        )}`}
                      >
                        {n.status}
                      </span>
                    </div>
                    <p className="text-gray-600">{n.body}</p>
                    <p className="text-sm text-gray-500 mt-2">
                      Sent: {formatDate(n.sent)} • Target: {n.target}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Delivered</p>
                    <p className="font-semibold text-green-600">
                      {n.delivered.toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">Clicked</p>
                    <p className="font-semibold text-blue-600">
                      {n.clicked.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Settings */}
        {activeTab === "settings" && (
          <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow border border-gray-100 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Server Key
              </label>
              <input
                type="password"
                placeholder="••••••••••"
                className="w-full border px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Project ID
              </label>
              <input
                type="text"
                placeholder="your-firebase-project-id"
                className="w-full border px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Web API Key
              </label>
              <input
                type="password"
                placeholder="••••••••••"
                className="w-full border px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <button className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition">
              Save Configuration
            </button>
          </div>
        )}
      </main>
    </div>
  );
  }

  
}
