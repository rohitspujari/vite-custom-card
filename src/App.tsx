import { useEffect, useState } from 'react';
import {
  AuthToken,
  // DashboardPlus as Dashboard,
  useDashboard,
} from 'react-semaphor';
import '../node_modules/react-semaphor/dist/style.css'; // IMPORTANT! Make sure this is the correct path. This file assumes App component is at the root of the project.
import './index.css';
import CardWithTabs from './demo-components/card-with-tabs';
import SomeText from './demo-components/some-text';
import AppShell from './app-shell';
// import CustomVisualApp from './backup/App_custom-visual';

const DASHBOARD_ID = 'd_80a08d34-3824-4944-9435-0275d3d9b952';
const DASHBOARD_SECRET = 'ds_22704682-f5cf-4537-b63f-40dbb5e0329f';
const TOKEN_URL = 'https://semaphor.cloud/api/v1/token';

function App() {
  const [authToken, setAuthToken] = useState<AuthToken>();

  useEffect(() => {
    async function fetchToken() {
      try {
        const response = await fetch(TOKEN_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            dashboardId: DASHBOARD_ID,
            dashboardSecret: DASHBOARD_SECRET,
          }),
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const token = await response.json();
        if (token?.accessToken) {
          setAuthToken(token);
        }
      } catch (error) {
        console.error('There was an error!', error);
      }
    }
    fetchToken();
  }, []);

  useDashboard({
    id: DASHBOARD_ID,
    authToken,
  });

  return (
    <AppShell>
      <div className=" grow flex flex-col justify-between">
        {/* Step 1: Rending dashboard as is in the app shell*/}
        {/* <Dashboard showControls id={DASHBOARD_ID} authToken={authToken} /> */}

        {/* Step 2: Render visuals in custom layoutt*/}
        <CustomLayout />
        {/* Step 3: See DEMO.md to publish this as a data app to Semaphor */}
      </div>
    </AppShell>
  );
}

function CustomLayout() {
  return (
    <>
      <CardWithTabs />
      <SomeText />
    </>
  );
}

export default App;
