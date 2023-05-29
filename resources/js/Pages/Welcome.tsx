import { Link, Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import EmailTemplate from '../Components/Email/EmailTemplate'

export default function Welcome({ auth, laravelVersion, phpVersion }: PageProps<{ laravelVersion: string, phpVersion: string }>) {
    return (
        <>
            <Head title="Welcome" />

            <EmailTemplate></EmailTemplate>


        </>
    );
}
