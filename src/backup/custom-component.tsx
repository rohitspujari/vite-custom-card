import { TCard } from 'react-semaphor';

export function MyComponent({ card }: { card: TCard }) {
  // const data = card?.data;
  return <pre>{JSON.stringify(card?.data || {}, null, 2)}</pre>;
}
