
import React, { useState } from "react";
import { MultiSelect } from 'primereact/multiselect';

export default function GroupedDoc() {
    const [selectedCities, setSelectedCities] = useState(null);
    const groupedCities = [
        {
            label: 'Germany',
            code: 'DE',
            items: [
                { label: 'Berlin', value: 'Berlin' },
                { label: 'Frankfurt', value: 'Frankfurt' },
                { label: 'Hamburg', value: 'Hamburg' },
                { label: 'Munich', value: 'Munich' }
            ]
        },
        {
            label: 'USA',
            code: 'US',
            items: [
                { label: 'Chicago', value: 'Chicago' },
                { label: 'Los Angeles', value: 'Los Angeles' },
                { label: 'New York', value: 'New York' },
                { label: 'San Francisco', value: 'San Francisco' }
            ]
        },
        {
            label: 'Japan',
            code: 'JP',
            items: [
                { label: 'Kyoto', value: 'Kyoto' },
                { label: 'Osaka', value: 'Osaka' },
                { label: 'Tokyo', value: 'Tokyo' },
                { label: 'Yokohama', value: 'Yokohama' }
            ]
        }
    ];

    const groupedItemTemplate = (option) => {
        return (
            <div className="flex align-items-center">
                {/* <img alt={option.label} src="https://primefaces.org/cdn/primereact/images/flag/flag_placeholder.png" className={`mr-2 flag flag-${option.code.toLowerCase()}`} style={{ width: '18px' }} /> */}
                {/* <div>{option.label}</div> */}
                <input type="checkbox" className="mr-2" checked={selectedCities.includes(option.value)} onChange={(e) => setSelectedCities(e.checked ? [...selectedCities, option.value] : selectedCities.filter(val => val !== option.value))} />
                <label htmlFor="">{option.label}</label>
            </div>
        );
    };

    return (
        <div className="card flex justify-content-center">
            <MultiSelect value={selectedCities} options={groupedCities} onChange={(e) => setSelectedCities(e.value)} optionLabel="label" 
                optionGroupLabel="label" optionGroupChildren="items" optionGroupTemplate={groupedItemTemplate}
                placeholder="Select Cities" display="chip" className="w-full md:w-20rem" />
        </div>
    );
}
        