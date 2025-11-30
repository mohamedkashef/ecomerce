import { Config } from "core/services/config";


export function initializeApp(configService: Config){
    return () => configService.loadRuntimeConfig();
}
