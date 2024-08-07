"use client"

import { useState, createRef } from "react"

import { Country } from "@/models/country"
import { COUNTRIES } from "@/data/countries"
import { cn } from "@/lib/utils"

type CountryCodeSelectorProps = {
    selected: Country
    onSelect: (country: Country) => void
}

export function CountryCodeSelector({ selected, onSelect }: CountryCodeSelectorProps) {
    const [search, setSearch] = useState<string>("")
    const [open, setOpen] = useState<boolean>(false)

    const ref = createRef<HTMLDivElement>()

    const countries = search ? COUNTRIES.filter(c => c.name.toLowerCase().includes(search)) : COUNTRIES

    window.onclick = event => {
        if (!ref.current?.contains(event.target as Node)) {
            setOpen(false)
        }
    }

    return (
        <div 
            ref={ref} 
            onClick={() => setOpen(!open)} 
            className={cn("country-code-selector relative flex justify-center items-center gap-2 w-28 border hover:border-black rounded-md h-10 transition-all cursor-pointer", open && "border-primary")}
        >
            <span className="text-lg">
                {selected.flag}
            </span>

            <p className="text-sm text-zinc-600 tabular-nums">
                +{selected.code}
            </p>

            <div className={cn("z-50 top-11 left-0 absolute bg-white opacity-0 border rounded-md w-72 invisible overflow-hidden transition-all", open && "visible opacity-1")}>
                <input
                    onClick={e => e.stopPropagation()}
                    type="text"
                    placeholder="Search by name"
                    className="px-2 border-b w-full h-10 outline-none"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />

                <div className="max-h-[240px] overflow-y-scroll">
                    {countries.map((country, index) => (
                        <div 
                            key={index} 
                            className="flex justify-between items-center gap-5 hover:bg-zinc-100 px-2 border-b h-12 transition-colors cursor-pointer"
                            onClick={() => onSelect(country)}
                        >
                            <div className="flex items-center gap-2 truncate">
                                <span>
                                    {country.flag}
                                </span>

                                <p className="text-sm">
                                    {country.name}
                                </p>
                            </div>

                            <p className="text-sm text-zinc-600">
                                +{country.code}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}