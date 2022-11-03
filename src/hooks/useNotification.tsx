import React from "react";
// import { toast } from "react-toastify";

const useNotification = () => {
    const defaultNotificationPos = {
        // position: toast.POSITION.TOP_RIGHT,
    };

    const notify = (message: string, type: "success" | "error" | "warning") => {
        switch (type) {
            case "success":
                // toast.success(message, {
                //     ...defaultNotificationPos,
                // });
                break;
            case "error":
                // toast.error(message, { ...defaultNotificationPos });
                break;
            default:
                break;
        }
    };

    return notify;
};

export default useNotification;
