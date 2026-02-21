import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthUser";
import BackButton from "../front/components/BackButton";
import { Icons } from "../front/components/Icons";
import axiosClient from "../front/axiosClient";
import empty from "../images/empty.png";

export default function Notifications() {
  const navigate = useNavigate();
  const { notification, setNotification } = useAuth();
  const [loading, setLoading] = useState(false);

  const markAsRead = async (id) => {
    try {
      await axiosClient.post(
        "/notify/notification.php",
        { id },
        { headers: { "Content-Type": "application/json" } }
      );

      // Update UI immediately (optimistic update)
      setNotification((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, is_read: 1 } : item
        )
      );
    } catch (error) {
      console.error("Failed to mark notification as read", error);
    }
  };

  return (
    <div className="notifications grid">
      {/* Header */}
      <div className="card-header">
        <Link to="" style={{ fontSize: "20px", color: "gray" }}>
          <BackButton />
        </Link>
        <h4 style={{ fontSize: "16px", fontWeight: 600 }}>
          Notifications
        </h4>
      </div>

      {/* Empty State */}
      {!notification || notification.length === 0 ? (
        <div className="empty-state">
          <img src={empty} alt="No notifications" />
          <p>No Notifications.</p>
        </div>
      ) : (
        /* Notification List */
        <div className="notification-list">
          {notification.map((notify) => (
            <div
              key={notify.id}
              className={`notification ${
                notify.is_read ? "read" : "unread"
              }`}
              onClick={() => markAsRead(notify.id)}
            >
              <Link to={notify.nav_link}>
                <div className="bell">
                  <Icons.Bell />
                </div>

                <div className="content">
                  <h4>{notify.title}</h4>
                  <p>{notify.message}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
