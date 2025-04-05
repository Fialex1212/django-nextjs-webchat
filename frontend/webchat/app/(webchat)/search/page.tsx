import { Suspense } from 'react';
import Search from "@/components/Searching";

export default function SearchPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Search />
        </Suspense>
    );
};
