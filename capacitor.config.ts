import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.jurnal.pkl',
  appName: 'Jurnal PKL',
  webDir: 'dist',
  plugins: {
    StatusBar: {
      overlaysWebView: true,
      hidden: true,
    },
  },
};

export default config;