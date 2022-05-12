export function getPriceWeightDisplay(coffee: any): string {
    const ounces: number = Math.ceil(coffee.priceTargetWeightGrams*0.035274);
    return `${ounces} oz / ${coffee.priceTargetWeightGrams} g`;
}

export function getCategory(category: string): string {
    switch(category) {
        case "Spices":
            return "Spice";
        case "NutsChocolate":
            return "Nuts & Choc";
        case "Candy":
            return "Candy"
        case "Floral":
            return "Floral"
        case "Fruity":
            return "Fruity"
        case "Acidic":
            return "Fruity"
        case "FermentationFunk":
            return "Funky Fermentation"        
        case "Roasted":
            return "Roasted"
    } 

    return "UNKNOWN"
}

export function getMethod(method: string): string {
    switch(method) {
        case "v60":
            return "V60";
        case "aeropress":
            return "Aeropress";        
        case "V60":
            return "V60";
        case "Aeropress":
            return "Aeropress";        
    } 

    return "UNKNOWN"
}

export function getName(name: string): string {
    switch(name) {
        case "TwoPour":
            return "Bloom and 2 Pours";
        case "ThreePour":
            return "Bloom and 3 Pours";        
        case "Standard":
            return "Standard Aeropress"
    } 

    return "UNKNOWN"
}

export function getStepName(name: string, pourStepCount?: number) {
    switch(name) {
        case "bloom":
            return "Bloom";
        case "swirl":
            return "Swirl";
        case "pour":
            return `Pour ${pourStepCount}`;
        case "stir":
            return "Stir";
        case "wait":
            return "Wait";
    }

    return "UNKNOWN";
}

export function getStep(name: string, start_timestamp: number, end_timestamp: number, weight?: number): string {
    const start_time_string = getTimeAsString(start_timestamp);
    const end_time_string = getTimeAsString(end_timestamp);

    switch(name) {
        case "bloom":
            return `Add water to ${weight}g. [~${start_time_string}-${end_time_string}]`;
        case "swirl":
            return `Swirl brewer to even out coffee bed.`;
        case "pour":
            return `Add water to ${weight}g. [~${start_time_string}-${end_time_string}]`;
        case "stir":
            return `Stir coffee bed to start whirpool.`;
        case "wait":
            return `Wait for all of the water to drain.`;
    }

    return "UNKNOWN"
}

function getTimeAsString(timestamp: number): string {
    const minutes = Math.floor(timestamp / 60);
    const seconds = timestamp % 60;
    const minutesString = String(minutes);
    const secondsString = String(seconds).padStart(2, "0");

    return minutesString + ":" + secondsString;
}