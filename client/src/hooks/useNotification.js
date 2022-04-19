import { notification } from "antd";

export const useNotification = () => {
  const openNotification = (message) => {
    notification.open({
      description: message,
    });
  };

  return { openNotification };
};
