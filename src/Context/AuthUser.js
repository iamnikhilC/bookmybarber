import { createContext, useContext, useState, useEffect } from "react";
import axiosClient from '../front/axiosClient';

const AuthContext = createContext(null);
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [notification, setNotification] = useState([]);

    // Load user from localStorage on app start
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const getAvatarUrl = (name) =>
        `https://ui-avatars.com/api/?name=${encodeURIComponent(
            name || "User"
        )}&background=random&color=fff&rounded=true`;

    const avatar = getAvatarUrl(user?.name);

    useEffect(() => {
        if (!user?.id) return;
        const fetchNotification = async () => {
            const res = await axiosClient.get(
                `/notify/notification.php?id=${user.id}`
            );
            setNotification(res.data.data || []);
        };

        fetchNotification();
    }, [user]);
    return (
        <AuthContext.Provider value={{ user, avatar, notification, setNotification}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
