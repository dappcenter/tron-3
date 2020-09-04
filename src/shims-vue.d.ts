declare module '*.vue' {
  import Vue from 'vue'
  export default Vue
}

declare module 'tronweb/dist/TronWeb' {
  import TronWeb from 'tronweb/dist/TronWeb'
  export default TronWeb 
}

interface Window {
  tronWeb: any
}