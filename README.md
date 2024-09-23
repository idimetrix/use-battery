# use-battery3

Track the battery status of a user’s device with useBattery.

## Installation

To install the package, use npm:

```bash
pnpm add use-battery3

yarn install use-battery3

npm install use-battery3
```

## Usage

```tsx
import React from "react";
import { useBattery } from "use-battery3";

const BatteryStatus: React.FC = () => {
   const { supported, loading, level, charging, chargingTime, dischargingTime } = useBattery();

   if (!supported) {
      return <p>Your browser does not support the Battery API.</p>;
   }

   if (loading) {
      return <p>Loading battery status...</p>;
   }

   return (
     <div>
        <h2>Battery Status</h2>
        <p>Battery Level: {level !== null ? (level * 100).toFixed(0) : "N/A"}%</p>
        <p>Charging: {charging !== null ? (charging ? "Yes" : "No") : "N/A"}</p>
        {charging ? (
          <p>
             Charging Time:{" "}
             {chargingTime !== null ? chargingTime + " seconds" : "N/A"}
          </p>
        ) : (
          <p>
             Discharging Time:{" "}
             {dischargingTime !== null ? dischargingTime + " seconds" : "N/A"}
          </p>
        )}
     </div>
   );
};

export default BatteryStatus;
```

## tsup

Bundle your TypeScript library with no config, powered by esbuild.

https://tsup.egoist.dev/

## How to use this

1. install dependencies

```
# pnpm
$ pnpm install

# yarn
$ yarn install

# npm
$ npm install
```

2. Add your code to `src`
3. Add export statement to `src/index.ts`
4. Test build command to build `src`.
   Once the command works properly, you will see `dist` folder.

```zsh
# pnpm
$ pnpm run build

# yarn
$ yarn run build

# npm
$ npm run build
```

5. Publish your package

```zsh
$ npm publish
```

## test package

https://www.npmjs.com/package/use-battery3
