import ConnectedAccounts from "../components/settings/ConnectedAccounts";
import DangerZone from "../components/settings/DangerZone";
import Notifications from "../components/settings/Notifications";
import Profile from "../components/settings/Profile";
import Security from "../components/settings/Security";

export default function SettingPage() {
  return (
    <main className="max-w-4xl mx-auto py-6 px-4 lg:px-8">
      <Profile />
      <Notifications />
      <Security />
      <ConnectedAccounts />
      <DangerZone />
    </main>
  );
}
