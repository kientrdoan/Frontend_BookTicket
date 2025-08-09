"use client";

import React, { useState, useEffect } from "react";
import { Route, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import Header from "./HomeLayout/Header/Header";

export const ProfileTemplate = (props) => {
  const { Component, ...restProps } = props;
  const [select, setSelect] = useState(0);
  const location = useLocation();

  // Update active tab based on current route
  useEffect(() => {
    if (location.pathname === "/profile") {
      setSelect(0);
    } else if (location.pathname === "/history") {
      setSelect(1);
    }
  }, [location.pathname]);

  const tabs = [
    {
      id: 0,
      path: "/profile",
      title: "Thông tin tài khoản",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
      ),
    },
    {
      id: 1,
      path: "/history",
      title: "Lịch sử đặt vé",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
  ];

  return (
    <Route
      {...restProps}
      render={(propsRoute) => {
        return (
          <React.Fragment>
            <Header {...propsRoute} />

            {/* Main Container */}
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 pt-16">
              <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col lg:flex-row gap-8 max-w-7xl mx-auto">
                  {/* Sidebar Navigation */}
                  <div className="lg:w-80 flex-shrink-0">
                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden sticky top-24">
                      {/* Profile Header */}
                      <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-8 text-white">
                        <div className="text-center">
                          <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
                            <svg
                              className="w-10 h-10 text-white"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                              />
                            </svg>
                          </div>
                          <h2 className="text-xl font-bold mb-1">
                            Tài khoản của tôi
                          </h2>
                          <p className="text-blue-100 text-sm">
                            Quản lý thông tin cá nhân
                          </p>
                        </div>
                      </div>

                      {/* Navigation Menu */}
                      <div className="p-2">
                        {tabs.map((tab) => (
                          <Link
                            key={tab.id}
                            to={tab.path}
                            onClick={() => setSelect(tab.id)}
                            className={`flex items-center space-x-3 px-4 py-4 rounded-xl mb-2 transition-all duration-300 group ${
                              select === tab.id
                                ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg transform scale-105"
                                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                            }`}
                          >
                            <div
                              className={`p-2 rounded-lg transition-all duration-300 ${
                                select === tab.id
                                  ? "bg-white/20 text-white"
                                  : "bg-gray-100 text-gray-500 group-hover:bg-blue-100 group-hover:text-blue-600"
                              }`}
                            >
                              {tab.icon}
                            </div>
                            <span className="font-medium">{tab.title}</span>
                            {select === tab.id && (
                              <div className="ml-auto">
                                <svg
                                  className="w-4 h-4"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 5l7 7-7 7"
                                  />
                                </svg>
                              </div>
                            )}
                          </Link>
                        ))}
                      </div>

                      {/* Quick Stats */}
                      {/* <div className="px-6 py-4 border-t border-gray-100">
                        <div className="text-center">
                          <div className="flex justify-around text-sm">
                            <div className="text-center">
                              <div className="font-bold text-blue-600 text-lg">
                                0
                              </div>
                              <div className="text-gray-500">Vé đã đặt</div>
                            </div>
                            <div className="text-center">
                              <div className="font-bold text-purple-600 text-lg">
                                0
                              </div>
                              <div className="text-gray-500">Điểm tích lũy</div>
                            </div>
                          </div>
                        </div>
                      </div> */}
                    </div>
                  </div>

                  {/* Main Content */}
                  <div className="flex-1">
                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                      {/* Content Header */}
                      <div className="bg-gradient-to-r from-gray-50 to-blue-50 px-8 py-6 border-b border-gray-100">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-white rounded-lg shadow-sm">
                            {tabs.find((tab) => tab.id === select)?.icon}
                          </div>
                          <div>
                            <h1 className="text-2xl font-bold text-gray-900">
                              {tabs.find((tab) => tab.id === select)?.title}
                            </h1>
                            <p className="text-gray-600 text-sm">
                              {select === 0
                                ? "Cập nhật và quản lý thông tin cá nhân của bạn"
                                : "Xem lại các giao dịch và vé đã đặt"}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Content Body */}
                      <div className="p-8">
                        <Component {...propsRoute} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </React.Fragment>
        );
      }}
    />
  );
};
