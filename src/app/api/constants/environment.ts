export const gateway = "https://localhost:7237";

export const catalogServiceEndpoints = {
    carModels: `${gateway}/catalog/car-models`,
    manufacturers: `${gateway}/catalog/manufacturer`,
    vehicles: `${gateway}/catalog/vehicle`
}

export const rentServiceEndpoint = `${gateway}/rent/history-of-use`

export const userServiceEndpoint = `${gateway}/users/client`

export const AdminPanelServiceEndpoints = {
    general: `${gateway}/dashboard`,
    carModels: `${gateway}/dashboard/model`,
    users: `${gateway}/dashboard/client`,
    manufacturers: `${gateway}/dashboard/manufacturer`,
    historyOfUse: `${gateway}/dashboard/history-of-use`,
    vehicles: `${gateway}/dashboard/vehicle`
}