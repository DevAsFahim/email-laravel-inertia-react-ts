import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import EmailTemplate from '../Components/Email/EmailTemplate'

export default function Dashboard({ auth, templates }: PageProps<{ auth: Object | null, templates: Object }>) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">

                        <h1 className='text-2xl'>Dashboard Page</h1>

                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
