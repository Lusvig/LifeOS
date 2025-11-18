import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electron', {
  invoke: (channel: string, ...args: unknown[]) => ipcRenderer.invoke(channel, ...args),
  on: (channel: string, func: (event: unknown, ...args: unknown[]) => void) => {
    ipcRenderer.on(channel, func);
  },
  once: (channel: string, func: (event: unknown, ...args: unknown[]) => void) => {
    ipcRenderer.once(channel, func);
  },
  removeListener: (channel: string, func: (event: unknown, ...args: unknown[]) => void) => {
    ipcRenderer.removeListener(channel, func);
  },
});
