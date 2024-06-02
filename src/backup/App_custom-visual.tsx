import { useEffect, useState } from 'react';
import {
  AuthToken,
  DashboardPlus as Dashboard,
  // DashboardPlus,

  // DashboardProvider,
  useDashboard,
} from 'react-semaphor';
// ximport '../../node_modules/react-semaphor/dist/style.css'; // IMPORTANT! Make sure this is the correct path. This file assumes App component is at the root of the project.

import { AreaChartCustomComponent } from './tremor-components/area-chart';
// import '../../index.css';

import CardWithTabs from '../demo-components/card-with-tabs';
import { Label } from '../components/ui/label';
import { ArrowRightIcon } from 'lucide-react';

// const DASHBOARD_ID = 'd_f2a630ab-a668-4422-88b5-e1a13d9906fd';
// const DASHBOARD_SECRET = 'ds_f020222d-7a15-4827-9b89-3c26fd8af479';

//Custom Dashboard
const DASHBOARD_ID = 'd_42cb8165-fa4d-453a-820a-9b7bf2d92c49';
const DASHBOARD_SECRET = 'ds_f3d45f6d-4337-4b4f-b9a3-1c98f1a7477c';

const TOKEN_URL = 'https://semaphor.cloud/api/v1/token';

export default function CustomVisualApp() {
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

  const customCards = [
    {
      cardId: '27f98a2b-c49c-4c48-9bab-8ac4d99f5511',
      content: AreaChartCustomComponent,
    },
    {
      cardId: '13d2bc79-0ac6-408b-b764-d5e230c28be8',
      content: CardWithTabs,
      replaceDefault: true,
      footer: () => (
        <div className="flex flex-col gap-2">
          <Label className="flex gap-1 items-center text-blue-800 hover:underline">
            More sales performance metrics{' '}
            <ArrowRightIcon className="size-4 hover:cursor-pointer" />{' '}
          </Label>
          <Label className=" text-blue-800 hover:underline hover:cursor-pointer">
            Have a question? Send email
          </Label>
        </div>
      ),
    },
  ];

  return (
    <div className="bg-background ">
      <Dashboard
        authToken={authToken}
        id={DASHBOARD_ID}
        currentTheme="system"
        customCards={customCards}
        showControls
      />
    </div>
  );
}
