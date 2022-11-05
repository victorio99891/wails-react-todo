export namespace xls {
	
	export class VehicleWorkbookStructure {
	    uuid: string;
	    status: string;
	    // Go type: time.Time
	    forwarderAdviceNoteDate?: any;
	    vinNumber: string;
	    productionNumberKnr: string;
	    dispositionType: string;
	    shippingClass: string;
	    weight: string;
	    fieldKey: string;
	    destination: string;
	    destinationStage: string;
	    model: string;
	    mrnNumber: string;
	    forwarderId: string;
	    forwarderName: string;
	    distributorName: string;
	    distributorStreet: string;
	    distributorPostalCode: string;
	    distributorCity: string;
	    extraDescription: string;
	
	    static createFrom(source: any = {}) {
	        return new VehicleWorkbookStructure(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.uuid = source["uuid"];
	        this.status = source["status"];
	        this.forwarderAdviceNoteDate = this.convertValues(source["forwarderAdviceNoteDate"], null);
	        this.vinNumber = source["vinNumber"];
	        this.productionNumberKnr = source["productionNumberKnr"];
	        this.dispositionType = source["dispositionType"];
	        this.shippingClass = source["shippingClass"];
	        this.weight = source["weight"];
	        this.fieldKey = source["fieldKey"];
	        this.destination = source["destination"];
	        this.destinationStage = source["destinationStage"];
	        this.model = source["model"];
	        this.mrnNumber = source["mrnNumber"];
	        this.forwarderId = source["forwarderId"];
	        this.forwarderName = source["forwarderName"];
	        this.distributorName = source["distributorName"];
	        this.distributorStreet = source["distributorStreet"];
	        this.distributorPostalCode = source["distributorPostalCode"];
	        this.distributorCity = source["distributorCity"];
	        this.extraDescription = source["extraDescription"];
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}

}

