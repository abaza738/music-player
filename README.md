# Simple Music Player

This simple web app was made using Vue 3 + TypeScript + Vite.

## Installation

### 1. Clone the Project

```bash
$ git clone https://github.com/abaza738/music-player.git
$ cd ./music-player
```

### 2. Install Dependencies

```bash
$ npm install
```

### 3. Set Environment Variables

Currently only 1 environment variable exists, which is the URL for your backend:

```env
VITE_API_URL="http://localhost:3000"
```

### 4. Run

```bash
$ npm run dev
```

By default, Vite will use the default port which is `5173`.  
If you wish to change it, add `port` in your `vite.config.ts` file as follows:

```ts
export default defineConfig({
   server: {
      port: 3126,
   },
  //...
}
```
