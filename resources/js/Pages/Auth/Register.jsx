import React from 'react';
import { Link, useForm } from '@inertiajs/react';
import { Calendar, Globe, Lock, Mail, MapPin, Phone, Sparkles, User } from 'lucide-react';
import AuthLayout from '../../Layouts/AuthLayout';
import { CheckboxField, FormSection, SelectField, TextField } from '../../Components/ui/Field';
import Button from '../../Components/ui/Button';

export default function Register({ countries = [] }) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        surname: '',
        email: '',
        password: '',
        password_confirmation: '',
        phone: '',
        date_of_birth: '',
        address_street: '',
        address_city: '',
        address_country: countries[0] ?? 'United States',
        address_postcode: '',
        terms_accepted: false,
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        post('/register');
    };

    const bind = (field) => ({
        value: data[field],
        onChange: (event) => setData(field, event.target.value),
        error: errors[field],
    });

    return (
        <AuthLayout
            title="Mayor registration — City Island Clicker"
            tagline="Register as an island mayor and claim 250 coins + 50 gems"
            heading="Create your mayor account"
            subheading="A few details and your island citizenship is ready."
            width="max-w-2xl"
        >
            <form onSubmit={handleSubmit} className="space-y-6">
                <FormSection title="Personal details" icon={<User className="h-4 w-4 text-sky-500" />}>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <TextField label="First name" required placeholder="e.g. Alexander" autoComplete="given-name" {...bind('name')} />
                        <TextField label="Surname" required placeholder="e.g. Morgan" autoComplete="family-name" {...bind('surname')} />
                        <TextField
                            label="Phone number"
                            icon={<Phone className="h-3.5 w-3.5 text-slate-400" />}
                            type="tel"
                            required
                            placeholder="+1 555 123 4567"
                            autoComplete="tel"
                            {...bind('phone')}
                        />
                        <TextField
                            label="Date of birth"
                            icon={<Calendar className="h-3.5 w-3.5 text-slate-400" />}
                            type="date"
                            required
                            autoComplete="bday"
                            {...bind('date_of_birth')}
                        />
                    </div>
                </FormSection>

                <FormSection title="Account credentials" icon={<Lock className="h-4 w-4 text-amber-500" />}>
                    <div className="space-y-4">
                        <TextField
                            label="Email address"
                            icon={<Mail className="h-3.5 w-3.5 text-slate-400" />}
                            type="email"
                            required
                            placeholder="mayor@cityisland.com"
                            autoComplete="email"
                            {...bind('email')}
                        />

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <TextField
                                label="Password"
                                type="password"
                                required
                                placeholder="••••••••"
                                autoComplete="new-password"
                                hint="At least 8 characters."
                                {...bind('password')}
                            />
                            <TextField
                                label="Confirm password"
                                type="password"
                                required
                                placeholder="••••••••"
                                autoComplete="new-password"
                                {...bind('password_confirmation')}
                            />
                        </div>
                    </div>
                </FormSection>

                <FormSection title="Residential address" icon={<MapPin className="h-4 w-4 text-emerald-500" />}>
                    <div className="space-y-4">
                        <TextField
                            label="Street, house number, apartment"
                            required
                            placeholder="e.g. 742 Ocean Breeze Blvd, Apt 4B"
                            autoComplete="street-address"
                            {...bind('address_street')}
                        />

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                            <TextField label="City" required placeholder="e.g. Miami" autoComplete="address-level2" {...bind('address_city')} />
                            <SelectField
                                label="Country"
                                icon={<Globe className="h-3.5 w-3.5 text-slate-400" />}
                                required
                                options={countries}
                                autoComplete="country-name"
                                {...bind('address_country')}
                            />
                            <TextField label="Post code" required placeholder="e.g. 33139" autoComplete="postal-code" {...bind('address_postcode')} />
                        </div>
                    </div>
                </FormSection>

                <CheckboxField
                    className="border-t border-slate-100 pt-5"
                    checked={data.terms_accepted}
                    onChange={(event) => setData('terms_accepted', event.target.checked)}
                    error={errors.terms_accepted}
                    label={
                        <>
                            I agree to the{' '}
                            <Link href="/terms" target="_blank" className="font-bold text-sky-600 underline hover:text-sky-800">
                                Terms &amp; Conditions
                            </Link>{' '}
                            and{' '}
                            <Link href="/privacy" target="_blank" className="font-bold text-sky-600 underline hover:text-sky-800">
                                Privacy Policy
                            </Link>
                            .
                        </>
                    }
                />

                <Button type="submit" block size="lg" variant="amber" disabled={processing}>
                    {processing ? (
                        'Creating account…'
                    ) : (
                        <>
                            <Sparkles className="h-5 w-5 fill-current" />
                            Complete registration &amp; play
                        </>
                    )}
                </Button>

                <p className="text-center text-sm font-semibold text-slate-500">
                    Already have an island account?{' '}
                    <Link href="/login" className="font-bold text-sky-600 underline hover:text-sky-800">
                        Log in here
                    </Link>
                </p>
            </form>
        </AuthLayout>
    );
}
