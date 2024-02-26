export interface Battery {
  _id?: string;
  name: string;
  postcode: string;
  wattCapacity: string;
}
export interface BatteryFormProps {
  batteryData: Battery | null;
  isOpen: boolean;
  onClose: () => void;
  getAllBatteries: () => void;
}
export interface StatisticsProps {
  isLoading: boolean;
  totalWattCapacity: string;
  averageWattCapacity: string;
}

export interface StatCardProps {
  title: string;
  data: string;
}
