import { writable } from 'svelte/store'
import api from "builderStore/api"

export function fetchData (url) {
	const store = writable({status: 'LOADING', data: {}, error: {}})
	
	async function get() {
		store.update(u => ({...u, status: 'SUCCESS'}))
		try {
			const response = await api.get(url)
            store.set({data: await response.json(), status: 'SUCCESS'})
		} catch(e) {
            store.set({data: {}, error: e, status: 'ERROR'})
		}
	}
	
	get()
	
	return {subscribe: store.subscribe, refresh: get}
}