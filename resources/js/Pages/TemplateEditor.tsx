import React from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageProps } from '@/types';
import { Link } from '@inertiajs/react';
import EmailTemplate from '@/Components/Email/EmailTemplate';

export default function TemplateEditor({ auth, template }: PageProps<{ auth: Object | null, template: Object }>) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">

                    <EmailTemplate auth={auth} template={template}></EmailTemplate>

                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}