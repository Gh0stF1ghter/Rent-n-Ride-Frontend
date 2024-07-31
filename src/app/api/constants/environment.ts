export const gateway = "https://localhost:7237";

export const catalogServiceEndpoints = {
    carModels: `${gateway}/catalog/car-models`,
    manufacturers: `${gateway}/catalog/manufacturer`,
    vehicles: `${gateway}/catalog/vehicle`
}

export const rentServiceEndpoint = `${gateway}/rent/history-of-use`

export const userServiceEndpoint = `${gateway}/users/client`