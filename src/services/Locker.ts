import {Ekey} from "@models/dto/Ekey";
import {BleManager, Device, Subscription, UUID} from "react-native-ble-plx";

import {getLockStatusFlag} from "@bikairproject/ble-decoder";

const BLE_TIMEOUT = 30000;

export default class Locker {
    static _bleManager: BleManager | null = null;
    static _bleDevice: Device | null = null;
    static _lockName: string | null = null;
    static _deviceId: string | null = null;
    static _status: string | string[] | null = null;
    static _characteristicUUID: string | null = null;
    static _stateUUID: UUID | null = null;
    static _serviceUUID: UUID | null = null;
    static _eKey: string[] | null = null;
    static _passKey: string | null = null;
    static _monitoring: Subscription | null = null;
    static _monitoringCallback: any = null;
    static _isWriting = false;

    static getBleManager(): BleManager {
        if (Locker._bleManager === null) {
            console.log("--- NEW BLE MANAGER ---");
            Locker._bleManager = new BleManager();
        }
        return Locker._bleManager;
    }

    static async getBleState() {
        return await this.getBleManager().state();
    }

    static reset() {
        this.stopMonitoring();
        this._bleDevice = null;
        this._lockName = null;
        this._deviceId = null;
        this._characteristicUUID = null;
        this._stateUUID = null;
        this._serviceUUID = null;
        this._eKey = null;
        this._passKey = null;
        this._monitoringCallback = null;
    }

    static scanAndConnect(data: Ekey) {
        return new Promise(async (resolve, reject) => {
            const timeout = setTimeout(() => {
                this.getBleManager().stopDeviceScan();
                resolve("TIMEOUT");
            }, BLE_TIMEOUT);

            // Ensure all device are disconnected
            await this.disconnect();

            console.log("...Start device scan...");
            this._lockName = data.name;
            console.log("Looking for ", this._lockName);
            this.getBleManager().startDeviceScan(null, null,
                async (error, device) => {
                    if (error || device === null) {
                        // Handle error (scanning will be stopped automatically)
                        this.getBleManager().stopDeviceScan();
                        console.log("Error while scanning devices");
                        console.log(error);
                        reject(error);
                        clearTimeout(timeout);
                        return;
                    }

                    // console.log('-[INFO]------device.id------', device.id);
                    // console.log('-[INFO]------device.name------', device.name);
                    // console.log('-[INFO]------lockName------', lockName);

                    // Check if it is a device you are looking for based on advertisement data
                    // or other criteria.
                    if (device.name === this._lockName) {
                        // Stop scanning as it's not necessary since we are scanning for one device.
                        console.log("-[INFO]------device.id------", device.id);
                        console.log("-[INFO]------device.name------", device.name);
                        this.getBleManager().stopDeviceScan();

                        // Store device id
                        this._deviceId = device.id;
                        this._serviceUUID = data.serviceUUID;
                        this._stateUUID = data.stateUUID;
                        this._characteristicUUID = data.characteristicUUID;
                        this._eKey = data.eKey;
                        this._passKey = data.passKey[0];

                        try {
                            const connectedDevice = await device.connect({
                                autoConnect: false,
                                timeout: BLE_TIMEOUT,
                                refreshGatt: "OnConnected",
                            }); // Open device connection
                            this._bleDevice = await connectedDevice.discoverAllServicesAndCharacteristics();
                            await this.monitor();
                            resolve("CONNECTED");
                        } catch (error) {
                            console.log("Error while connecting to device");
                            console.log(error);
                            await this.disconnect();
                            this.reset();
                            reject(error);
                        } finally {
                            clearTimeout(timeout);
                        }
                    }
                });
        });
    }

    static getStateCharacteristics = async () => {
        try {
            if(!!this._bleDevice && !!this._serviceUUID && !!this._stateUUID) {
                return await this._bleDevice.readCharacteristicForService(this._serviceUUID, this._stateUUID);
            } else {
                return null;
            }
        } catch (error) {
            console.log("Error while fetching characteristics");
            console.log(error);
            return null;
        }
    };

    static setMonitoringCallback = (callback: any = null) => {
        this._monitoringCallback = callback;
    };

    static monitor = async () => {
        const characteristics = await this.getStateCharacteristics();
        if (characteristics) {
            this.stopMonitoring();
            this._monitoring = characteristics.monitor(
                async (error, characteristic) => {
                    if (error) {
                        console.log("--[ERROR]--------characteristic-monitor-----------", error);
                        console.log("--[ERROR]--------characteristic-----------", characteristic);
                        // We need to handle error
                        this._monitoring = null;
                        return;
                    }
                    if (characteristic) {
                        const status = getLockStatusFlag(characteristic.value);
                        this._status = status;
                        console.log("--[LOCK-STATE]-------------------", status);
                        if (typeof this._monitoringCallback === "undefined" || this._monitoringCallback === null) {
                            console.log("No state change function defined");
                        } else {
                            this._monitoringCallback(status);
                        }
                    }
                });
        } else {
            console.log("No characteristics provided, can't monitor");
        }
    };

    static stopMonitoring = () => {
        if (this._monitoring) {
            console.log("remove monitoring");
            this._monitoring.remove();
            this._monitoring = null;
        }
    };

    static getState = () => {
        return new Promise<string | string[]>(async (resolve, reject) => {
            const timeout = setTimeout(() => {
                resolve("TIMEOUT");
            }, BLE_TIMEOUT);
            try {
                const characteristic = await this.getStateCharacteristics();
                const status = getLockStatusFlag(characteristic?.value ?? null);
                resolve(status);
            } catch (error) {
                reject(error);
            } finally {
                clearTimeout(timeout);
            }
        });
    };

    static write = async () => {
        if(!!this._bleDevice && !!this._serviceUUID && !!this._characteristicUUID) {
            this._isWriting = true;
            try {
                console.log("==========writeToDevice============");
                if (this._eKey && this._passKey) {
                    for (let i = 0; i < this._eKey.length; i++) {
                        await this._bleDevice.writeCharacteristicWithResponseForService(
                            this._serviceUUID,
                            this._characteristicUUID,
                            this._eKey[i],
                        );
                    }
                    await this._bleDevice.writeCharacteristicWithResponseForService(
                        this._serviceUUID,
                        this._characteristicUUID,
                        this._passKey,
                    );
                }
            } catch (err) {
                console.log("---[ERROR]--------------", err);
                throw err;
            } finally {
                this._isWriting = false;
            }
        }
    };

    static async disconnect() {
        try {
            this.stopMonitoring();
            this._bleDevice = null;
            if (!this._deviceId) {
                return;
            }

            await this.getBleManager().cancelDeviceConnection(this._deviceId);
        } catch (err) {
            console.log("--[ERROR]--disconnected", err);
        } finally {
            this.reset();
        }
    }
}
