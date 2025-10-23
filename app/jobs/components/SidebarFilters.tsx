'use client'
import React from 'react'


interface Props {
location: string
setLocation: (v: string) => void
type: string
setType: (v: string) => void
experience: string
setExperience: (v: string) => void
remoteOnly: boolean
setRemoteOnly: (v: boolean) => void
clearFilters: () => void
}


export default function SidebarFilters({ location, setLocation, type, setType, experience, setExperience, remoteOnly, setRemoteOnly, clearFilters }: Props) {
return (
<aside className="hidden lg:block w-72 p-4 bg-white border rounded-lg">
<h3 className="text-lg font-semibold mb-3">Filters</h3>


<div className="mb-4">
<label className="block text-sm font-medium mb-1">Location</label>
<select value={location} onChange={e => setLocation(e.target.value)} className="w-full border p-2 rounded">
<option value="">All Tamil Nadu</option>
<option value="Chennai">Chennai</option>
<option value="Coimbatore">Coimbatore</option>
<option value="Salem">Salem</option>
</select>
</div>


<div className="mb-4">
<label className="block text-sm font-medium mb-1">Job Type</label>
<select value={type} onChange={e => setType(e.target.value)} className="w-full border p-2 rounded">
<option value="">All</option>
<option value="Full-time">Full-time</option>
<option value="Part-time">Part-time</option>
</select>
</div>


<div className="mb-4">
<label className="block text-sm font-medium mb-1">Experience</label>
<select value={experience} onChange={e => setExperience(e.target.value)} className="w-full border p-2 rounded">
<option value="">All</option>
<option value="Fresher">Fresher</option>
<option value="1-3 years">1-3 years</option>
<option value="3-5 years">3-5 years</option>
</select>
</div>


<div className="mb-4">
<label className="inline-flex items-center">
<input type="checkbox" checked={remoteOnly} onChange={e => setRemoteOnly(e.target.checked)} className="mr-2" />
Remote only
</label>
</div>


<div className="flex gap-2">
<button onClick={clearFilters} className="flex-1 border p-2 rounded">Clear</button>
</div>
</aside>
)
}