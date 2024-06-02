import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowRightIcon } from 'lucide-react';
import { DashboardCard, useCard } from 'react-semaphor';

export default function CardWithTabs() {
  const totalSales = useCard('12b58925-df32-4e0f-ae64-a2f928ec50d9');

  const totalProducts = useCard('ff380205-8eb0-40bc-a4a2-526928c9113e');

  const { card: ordersbyCategoryCard } = useCard(
    '84236926-98db-479e-9bd8-279856cd222b'
  );

  const { card: salesByCategoryCard } = useCard(
    '5b4e282f-f5cd-4b8c-92be-e441e49f6665'
  );

  const { card: salesByShipmodeCard } = useCard(
    'a902861b-09ea-4ed7-9188-15ce55ed93b8'
  );

  function formattedNumber(number: number) {
    return number ? Number(number.toFixed(0)).toLocaleString() : null;
  }

  const totalSalesKPI = totalSales.data?.[0]?.['total_sales'];
  const totalProductsKPI = totalProducts.data?.[0]?.['total_products'];

  const formattedTotalProductsKPI = formattedNumber(totalProductsKPI);
  const formattedSalesKPI = formattedNumber(totalSalesKPI);

  return (
    <div className="grow flex">
      <Tabs
        defaultValue="account"
        className=" flex flex-col  w-full outline outline-2 outline-muted rounded-md"
      >
        <TabsList className=" w-full justify-start h-42 bg-background border-b p-0 items-stretch rounded-none">
          <TabsTrigger
            className="  border-muted h-20 w-36 rounded-none  border-r data-[state=active]:border-b-2 data-[state=active]:border-b-primary"
            value="account"
          >
            <div className="space-y-2">
              <div>Sales</div>
              <div className="text-xl">${formattedSalesKPI}</div>
            </div>
          </TabsTrigger>
          <TabsTrigger
            className=" h-20 w-36 rounded-none border-r border-muted data-[state=active]:border-b-2 data-[state=active]:border-b-primary"
            value="password"
          >
            <div className="space-y-2">
              <div>Orders</div>
              {/* //format number in K */}
              <div className="text-xl">{formattedTotalProductsKPI}</div>
            </div>
          </TabsTrigger>
        </TabsList>
        <TabsContent
          className=" flex grow mt-0 data-[state=active]:h-full "
          value="account"
        >
          {salesByCategoryCard && (
            <DashboardCard
              className=" shadow-none h-full grow w-full border-none "
              card={salesByCategoryCard}
              footer={
                <div className="flex w-full flex-row justify-between gap-2">
                  <Label className="flex gap-1 items-center text-blue-800 hover:underline">
                    More sales performance metrics{' '}
                    <ArrowRightIcon className="size-4 hover:cursor-pointer" />{' '}
                  </Label>
                  <Label className=" text-blue-800 hover:underline hover:cursor-pointer">
                    Have a question? Send email
                  </Label>
                </div>
              }
            />
          )}
        </TabsContent>
        <TabsContent
          className="flex grow mt-0  data-[state=active]:h-full "
          value="password"
        >
          {ordersbyCategoryCard && (
            <div className="flex grow  ">
              <div className="w-3/4">
                <DashboardCard
                  className=" grow shadow-none  border-none"
                  card={ordersbyCategoryCard}
                />
              </div>
              <div className="w/3 border-l">
                <DashboardCard
                  className=" grow shadow-none  border-none"
                  card={salesByShipmodeCard}
                  footer={
                    <div className=" py-6 w-full flex justify-center">
                      <Label className="flex gap-1 items-center text-blue-800 hover:underline">
                        Shipping performance metrics{' '}
                        <ArrowRightIcon className="size-4 hover:cursor-pointer" />{' '}
                      </Label>
                    </div>
                  }
                />
              </div>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
