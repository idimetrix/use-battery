import { useState, useEffect } from "react";

interface BatteryManager extends EventTarget {
  charging: boolean;
  chargingTime: number;
  dischargingTime: number;
  level: number;
}

type NavigatorWithBattery = Navigator & {
  getBattery: () => Promise<BatteryManager>;
};

// Define the shape of the battery state with proper types
interface BatteryState {
  supported: boolean;
  loading: boolean;
  level: number | null;
  charging: boolean | null;
  chargingTime: number | null;
  dischargingTime: number | null;
}

export function useBattery(): BatteryState {
  // Initialize the state with default values
  const [state, setState] = useState<BatteryState>({
    supported: true,
    loading: true,
    level: null,
    charging: null,
    chargingTime: null,
    dischargingTime: null,
  });

  useEffect(() => {
    // If the Battery API is not supported, update state accordingly
    if (!(navigator as NavigatorWithBattery).getBattery) {
      setState((prevState) => ({
        ...prevState,
        supported: false,
        loading: false,
      }));
      return;
    }

    let battery: BatteryManager | null = null;

    // Function to handle changes in battery properties
    const handleChange = () => {
      if (battery) {
        setState({
          supported: true,
          loading: false,
          level: battery.level,
          charging: battery.charging,
          chargingTime: battery.chargingTime,
          dischargingTime: battery.dischargingTime,
        });
      }
    };

    // Retrieve the BatteryManager object and set event listeners
    (navigator as NavigatorWithBattery).getBattery().then((_) => {
      battery = _;
      handleChange(); // Initialize state with current battery values

      // Set up event listeners for changes in battery properties
      battery.addEventListener("levelchange", handleChange);
      battery.addEventListener("chargingchange", handleChange);
      battery.addEventListener("chargingtimechange", handleChange);
      battery.addEventListener("dischargingtimechange", handleChange);
    });

    // Clean up event listeners on component unmount
    return () => {
      if (battery) {
        battery.removeEventListener("levelchange", handleChange);
        battery.removeEventListener("chargingchange", handleChange);
        battery.removeEventListener("chargingtimechange", handleChange);
        battery.removeEventListener("dischargingtimechange", handleChange);
      }
    };
  }, []);

  // Return the current battery state
  return state;
}
