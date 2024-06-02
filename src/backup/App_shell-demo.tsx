import { useEffect, useState } from 'react';
import { AuthToken, useDashboard } from 'react-semaphor';
import '../node_modules/react-semaphor/dist/style.css'; // IMPORTANT! Make sure this is the correct path. This file assumes App component is at the root of the project.
import './index.css';
import CardWithTabs from '../demo-components/card-with-tabs';
import ApplicationShell from './application-shell';

const DASHBOARD_ID = 'd_1f9f95c3-934f-450c-bce0-52fb146e89f2';
const DASHBOARD_SECRET = 'ds_06e205d7-58a8-4841-affa-861da69fc950';
const TOKEN_URL = 'https://semaphor.cloud/api/v1/token';

function App() {
  const [authToken, setAuthToken] = useState<AuthToken>();
  useDashboard({
    id: DASHBOARD_ID,
    authToken,
  });

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

  return (
    <ApplicationShell>
      <div className=" flex h-full flex-col justify-between">
        <CardWithTabs />
        <div className=" mt-6 text-muted-foreground">
          <span className="text-foreground font-semibold">
            Growth in Order Volumes Over Time:
          </span>{' '}
          There's a noticeable increase in order volumes over the years,
          particularly evident from 2020 onwards. This could be due to various
          factors, including business expansion, effective marketing, or shifts
          in consumer behavior.{' '}
          <span className="text-foreground font-semibold">
            Seasonal Peaks in Orders:
          </span>{' '}
          The data suggests seasonal peaks, especially towards the end of each
          year, which could be aligned with holiday seasons or end-of-year sales
          events. High Profit Margins in Select Categories: The "Copiers"
          category shows exceptionally high profitability, suggesting that
          focusing on high-margin products could be a beneficial strategy.{' '}
          <br />
          <br />
          <span className="text-foreground font-semibold">
            Negative Profits in Some Categories:
          </span>{' '}
          Categories like "Tables" and "Supplies" showing negative profits
          indicate potential areas for cost reduction or pricing strategy
          adjustments. Preference for Standard Shipping: A significant
          preference for "Standard Class" shipping suggests that delivery speed
          may not be a critical factor for many customers, possibly allowing for
          cost savings in logistics.
        </div>
      </div>
    </ApplicationShell>
  );
}

export default App;
