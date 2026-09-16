<?php

namespace App\Services;

class CountryService
{
    /**
     * Forbidden countries as requested
     */
    public const EXCLUDED_COUNTRIES = [
        'Afghanistan',
        'Belarus',
        'Central African Republic',
        'Cuba',
        'Dem. Rep. of the Congo',
        'Democratic Republic of the Congo',
        'Haiti',
        'Iran',
        'Iraq',
        'Mali',
        'Myanmar (Burma)',
        'Myanmar',
        'North Korea',
        'Korea, Democratic People\'s Republic of',
        'Russia',
        'Russian Federation',
        'Somalia',
        'South Sudan',
        'Sudan',
        'Syria',
        'Syrian Arab Republic',
        'Venezuela',
        'Venezuela, Bolivarian Republic of',
        'Yemen',
        'Zimbabwe',
    ];

    /**
     * Get sorted list of allowed world countries
     */
    public static function getAllowedCountries(): array
    {
        $allCountries = [
            'Albania', 'Algeria', 'Andorra', 'Angola', 'Antigua and Barbuda', 'Argentina', 'Armenia',
            'Australia', 'Austria', 'Azerbaijan', 'Bahamas', 'Bahrain', 'Bangladesh', 'Barbados',
            'Belgium', 'Belize', 'Benin', 'Bhutan', 'Bolivia', 'Bosnia and Herzegovina', 'Botswana',
            'Brazil', 'Brunei', 'Bulgaria', 'Burkina Faso', 'Burundi', 'Cabo Verde', 'Cambodia',
            'Cameroon', 'Canada', 'Chad', 'Chile', 'China', 'Colombia', 'Comoros', 'Congo (Republic)',
            'Costa Rica', 'Croatia', 'Cyprus', 'Czech Republic', 'Denmark', 'Djibouti', 'Dominica',
            'Dominican Republic', 'Ecuador', 'Egypt', 'El Salvador', 'Equatorial Guinea', 'Eritrea',
            'Estonia', 'Eswatini', 'Ethiopia', 'Fiji', 'Finland', 'France', 'Gabon', 'Gambia',
            'Georgia', 'Germany', 'Ghana', 'Greece', 'Grenada', 'Guatemala', 'Guinea', 'Guinea-Bissau',
            'Guyana', 'Honduras', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Ireland', 'Israel',
            'Italy', 'Ivory Coast', 'Jamaica', 'Japan', 'Jordan', 'Kazakhstan', 'Kenya', 'Kiribati',
            'Kuwait', 'Kyrgyzstan', 'Laos', 'Latvia', 'Lebanon', 'Lesotho', 'Liberia', 'Libya',
            'Liechtenstein', 'Lithuania', 'Luxembourg', 'Madagascar', 'Malawi', 'Malaysia', 'Maldives',
            'Malta', 'Marshall Islands', 'Mauritania', 'Mauritius', 'Mexico', 'Micronesia', 'Moldova',
            'Monaco', 'Mongolia', 'Montenegro', 'Morocco', 'Mozambique', 'Namibia', 'Nauru',
            'Nepal', 'Netherlands', 'New Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'North Macedonia',
            'Norway', 'Oman', 'Pakistan', 'Palau', 'Panama', 'Papua New Guinea', 'Paraguay', 'Peru',
            'Philippines', 'Poland', 'Portugal', 'Qatar', 'Romania', 'Rwanda', 'Saint Kitts and Nevis',
            'Saint Lucia', 'Saint Vincent and the Grenadines', 'Samoa', 'San Marino', 'Sao Tome and Principe',
            'Saudi Arabia', 'Senegal', 'Serbia', 'Seychelles', 'Sierra Leone', 'Singapore', 'Slovakia',
            'Slovenia', 'Solomon Islands', 'South Africa', 'South Korea', 'Spain', 'Sri Lanka',
            'Suriname', 'Sweden', 'Switzerland', 'Taiwan', 'Tajikistan', 'Tanzania', 'Thailand',
            'Timor-Leste', 'Togo', 'Tonga', 'Trinidad and Tobago', 'Tunisia', 'Turkey', 'Turkmenistan',
            'Tuvalu', 'Uganda', 'Ukraine', 'United Arab Emirates', 'United Kingdom', 'United States',
            'Uruguay', 'Uzbekistan', 'Vanuatu', 'Vatican City', 'Vietnam', 'Zambia',
        ];

        // Filter out any excluded countries
        $filtered = array_filter($allCountries, function ($country) {
            return ! in_array($country, self::EXCLUDED_COUNTRIES, true);
        });

        sort($filtered);

        return array_values($filtered);
    }

    /**
     * Check if country is allowed
     */
    public static function isAllowed(string $country): bool
    {
        if (in_array($country, self::EXCLUDED_COUNTRIES, true)) {
            return false;
        }

        return in_array($country, self::getAllowedCountries(), true);
    }
}
