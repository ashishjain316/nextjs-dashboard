import Search from '@/app/ui/search';
import Table from '@/app/ui/customers/table';
import { lusitana } from '@/app/ui/fonts';
import { CustomersTableSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';
import { Metadata } from 'next';
import { fetchFilteredCustomers } from '@/app/lib/data';
 
export const metadata: Metadata = {
    title: 'Customers',
};
 
export default async function Page(props: { searchParams?: Promise<{query?: string}>}) {
    const searchParams = await props.searchParams;
    const query = searchParams?.query || '';
    const customers = await fetchFilteredCustomers(query);
    
    return (
        <div className="w-full">
            <div className="w-full">
                <h1 className={`${lusitana.className} mb-8 text-xl md:text-2xl`}>
                    Customers
                </h1>
                <Search placeholder="Search customers..." />
            </div>
            <Suspense fallback={<CustomersTableSkeleton />}>
                <Table customers={customers} />
            </Suspense>
        </div>
    );
}