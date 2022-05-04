import { buildQueryFromSelectionSet } from "@apollo/client/utilities";

export function getMethod(method: string): string {
    switch(method) {
        case "v60":
            return "V60";
        case "aeropress":
            return "Aeropress";        
    } 

    return "UNKNOWN"
}

export function getName(name: string): string {
    switch(name) {
        case "2pour":
            return "Bloom and 2 Pours";
        case "3pour":
            return "Bloom and 3 Pours";        
        case "standard":
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

export function getStep(name: string, start_timestamp: number, end_timestamp, weight?: number): string {
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
    const minutesString = minutes == 0 ? "0" : String(minutes);
    const secondsString = seconds == 0 ? "00" : String(seconds);

    return minutesString + ":" + secondsString;
}