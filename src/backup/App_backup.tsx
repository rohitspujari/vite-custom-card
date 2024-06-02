import { useEffect, useState } from 'react';
import {
  AuthToken,
  // DashboardPlus,

  // DashboardProvider,
  useDashboard,
} from 'react-semaphor';
// import '../node_modules/react-semaphor/dist/style.css'; // IMPORTANT! Make sure this is the correct path. This file assumes App component is at the root of the project.

import './index.css';
import CardWithTabs from '../demo-components/card-with-tabs';

// const DASHBOARD_ID = 'd_f2a630ab-a668-4422-88b5-e1a13d9906fd';
// const DASHBOARD_SECRET = 'ds_f020222d-7a15-4827-9b89-3c26fd8af479';

//Custom Dashboard
const DASHBOARD_ID = 'd_42cb8165-fa4d-453a-820a-9b7bf2d92c49';
const DASHBOARD_SECRET = 'ds_f3d45f6d-4337-4b4f-b9a3-1c98f1a7477c';

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

  // const customCards = [
  //   {
  //     cardId: '522c8b48-1e1e-4433-b503-b7392329748a',
  //     content: AreaChartComponentPass,
  //   },
  //   {
  //     cardId: '13d2bc79-0ac6-408b-b764-d5e230c28be8',
  //     content: CardWithTabs,
  //     replaceDefault: true,
  //     footer: () => (
  //       <div className="flex flex-col gap-2">
  //         <Label className="flex gap-1 items-center text-blue-800 hover:underline">
  //           More sales performance metrics{' '}
  //           <ArrowRightIcon className="size-4 hover:cursor-pointer" />{' '}
  //         </Label>
  //         <Label className=" text-blue-800 hover:underline hover:cursor-pointer">
  //           Have a question? Send email
  //         </Label>
  //       </div>
  //     ),
  //   },
  // ];

  // const c = useCard('522c8b48-1e1e-4433-b503-b7392329748a');
  // console.log('loading', c.data);

  return (
    <div className="bg-background h-[60vh] mt-32 w-3/4 mx-auto flex">
      {/* <AreaChartComponent /> */}
      {/* <DashboardPlus
        authToken={authToken}
        id={DASHBOARD_ID}
        currentTheme="system"
        customCards={customCards}
        showControls
      /> */}
      <div>
        Growth in Order Volumes Over Time: There's a noticeable increase in
        order volumes over the years, particularly evident from 2020 onwards.
        This could be due to various factors, including business expansion,
        effective marketing, or shifts in consumer behavior. Seasonal Peaks in
        Orders: The data suggests seasonal peaks, especially towards the end of
        each year, which could be aligned with holiday seasons or end-of-year
        sales events. High Profit Margins in Select Categories: The "Copiers"
        category shows exceptionally high profitability, suggesting that
        focusing on high-margin products could be a beneficial strategy.
        Negative Profits in Some Categories: Categories like "Tables" and
        "Supplies" showing negative profits indicate potential areas for cost
        reduction or pricing strategy adjustments. Preference for Standard
        Shipping: A significant preference for "Standard Class" shipping
        suggests that delivery speed may not be a critical factor for many
        customers, possibly allowing for cost savings in logistics.
      </div>
      <CardWithTabs />

      {/* <SingleVisual /> */}
      {/* <AreaChartComponent /> */}
    </div>
  );
}

export default App;
