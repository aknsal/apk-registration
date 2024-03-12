import {
  NovuProvider,
  PopoverNotificationCenter,
  NotificationBell,
  useNovuTheme,
} from "@novu/notification-center";
import { useSelector } from "react-redux";
import theme from "../../themes/theme";

const notificationStyles = {
  notifications: {
    listItem: { 
      layout: { color: "#ffffff" } 
    }
  },
  layout: {
    root : {
      backgroundColor: '#192229',
      borderRadius: '#ffffff'
    }
  }
};

function NotificationCenterComp() {
  const result = useNovuTheme();
  const user = useSelector((state) => state.app.authUser);
  // console.log(result);
  // result.theme = {
  //   layout: {
  //     backgroundColor: "#ffffff",
  //   },
  // };
  return (
    <>
      <NovuProvider
        subscriberId={user.id.toString()}
        applicationIdentifier={process.env.NOVU_APPLICATION_IDENTIFIER}
        styles={theme.notificationStyles}
      >
        <PopoverNotificationCenter
          showUserPreferences={false}
          footer={() => <div></div>}
        >
          {({ unseenCount }) => <NotificationBell unseenCount={unseenCount} />}
        </PopoverNotificationCenter>
      </NovuProvider>
    </>
  );
}

export default NotificationCenterComp;
