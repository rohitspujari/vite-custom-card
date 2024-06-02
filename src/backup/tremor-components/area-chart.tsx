import { AreaChart, BarChart } from '@tremor/react';
import {
  TCard,
  useCard,
  useDashboardActions,
  DashboardCard,
} from 'react-semaphor';

const dataFormatter = (number: number) =>
  `$${Intl.NumberFormat('us').format(number).toString()}`;

function getKeys(data: unknown[] | undefined) {
  const keys = Object.keys(data?.[0] || {});
  return keys;
}

export function AreaChartComponent() {
  const { data, isLoading, isFetching } = useCard(
    '522c8b48-1e1e-4433-b503-b7392329748a'
  );

  console.log(isFetching, isLoading, data);

  const keys = getKeys(data);

  if (isLoading || isFetching) {
    return <div>Loading...</div>;
  }

  if (!data || data.length === 0) {
    return null;
  }

  return (
    <BarChart
      className="h-80"
      data={data}
      index={keys?.[0] || ''}
      // categories={[]}
      categories={[...keys].slice(1)}
      colors={['indigo', 'rose']}
      valueFormatter={dataFormatter}
      yAxisWidth={60}
      onValueChange={(v) => console.log(v)}
    />
  );
}

export function SingleVisual() {
  const { card } = useCard('522c8b48-1e1e-4433-b503-b7392329748a');
  if (!card) {
    return null;
  }

  return <DashboardCard className="size-1/2" card={card} />;
}

export function AreaChartCustomComponent({ card }: { card: TCard }) {
  const { handleDataPointClickAction } = useDashboardActions();
  const data = card.data;
  const keys = getKeys(card.data);
  const xAxisColumn = keys?.[0];
  const restOfColumns = [...keys].slice(1);

  if (!data || data.length === 0) {
    return null;
  }

  return (
    <AreaChart
      className="h-96"
      data={data}
      index={xAxisColumn}
      categories={restOfColumns}
      colors={['indigo', 'rose']}
      valueFormatter={dataFormatter}
      yAxisWidth={60}
      onValueChange={(v) => {
        const value = v?.[xAxisColumn];
        handleDataPointClickAction(card, {
          columnName: xAxisColumn,
          columnValue: value,
        });
      }}
    />
  );
}
