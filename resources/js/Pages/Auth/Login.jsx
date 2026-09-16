import React from 'react';
import { Link, useForm } from '@inertiajs/react';
import { Lock, Mail, Play } from 'lucide-react';
import AuthLayout from '../../Layouts/AuthLayout';
import { TextField } from '../../Components/ui/Field';
import Button from '../../Components/ui/Button';

export default function Login() {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
        remember: true,
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        post('/login');
    };

    return (
        <AuthLayout
            title="Mayor login — City Island Clicker"
            tagline="Welcome back, Mayor. Your citizens have been busy."
            heading="Log in to your island"
            subheading="Enter your email and password to resume your progress."
        >
            <form onSubmit={handleSubmit} className="space-y-4">
                <TextField
                    label="Email address"
                    icon={<Mail className="h-3.5 w-3.5 text-slate-400" />}
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="mayor@cityisland.com"
                    value={data.email}
                    onChange={(event) => setData('email', event.target.value)}
                    error={errors.email}
                />

                <TextField
                    label="Password"
                    icon={<Lock className="h-3.5 w-3.5 text-slate-400" />}
                    type="password"
                    required
                    autoComplete="current-password"
                    placeholder="••••••••"
                    value={data.password}
                    onChange={(event) => setData('password', event.target.value)}
                    error={errors.password}
                />

                <label className="flex cursor-pointer items-center gap-2 text-xs font-bold text-slate-600">
                    <input
                        type="checkbox"
                        checked={data.remember}
                        onChange={(event) => setData('remember', event.target.checked)}
                        className="h-4 w-4 rounded border-slate-300 text-amber-500 focus:ring-amber-400"
                    />
                    Keep me logged in
                </label>

                <Button type="submit" block size="lg" variant="amber" disabled={processing} className="mt-2">
                    {processing ? (
                        'Logging in…'
                    ) : (
                        <>
                            <Play className="h-5 w-5 fill-current" />
                            Resume game
                        </>
                    )}
                </Button>

                <p className="border-t border-slate-100 pt-4 text-center text-sm font-semibold text-slate-500">
                    No account yet?{' '}
                    <Link href="/register" className="font-bold text-sky-600 underline hover:text-sky-800">
                        Register now
                    </Link>
                </p>
            </form>
        </AuthLayout>
    );
}
