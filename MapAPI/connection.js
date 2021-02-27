export default class Connection{
	constructor(key){
		this.key = key
	}
}

export function  generateAPIString(myKey){

	const Link = "https://maps.googleapis.com/maps/api/js?key="+myKey.key; 
	return Link; 
}

