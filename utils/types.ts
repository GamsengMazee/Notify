//types of device info to be encrypted

export type device_info_for_encryption = {
    last_update: string,
    api_level: string,
    version: string,
    device_ip: string
}

export type dbData = {
    _id: object,
    device_id: string,
    device_info: string,
    __v?: number
}