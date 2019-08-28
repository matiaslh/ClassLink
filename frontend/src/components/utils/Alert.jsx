import { notification } from 'antd';

export const openNotification = (message, description, duration) => {
    const args = {
        message,
        description,
        duration: duration || 3,
    };
    notification.config({
        placement: 'bottomRight'
    })
    notification.open(args);
};
