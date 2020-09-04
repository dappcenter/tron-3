import Vue from 'vue'
import abi from '@/helpers/abi'
import contract from '@/contract.json'
import { formatUnits, parseUnits } from '@ethersproject/units'

console.log('abi', abi)
console.log('contract', contract)

const state: {
  account: String,
  defaultAddress: Object
} = {
  account : '',
  defaultAddress: Object.create(null)
}


const mutations = {
  SET_ACCOUNT(_state: any, data: String) {
    Vue.set(_state, 'account', data)
  },
  SET_DEFAULT_ADDRESS(_state: any, data: Object) {
    Vue.set(_state, 'defaultAddress', data)
  }
  
}


const YAMLENDPool = () => {
  let address = window.tronWeb.address.fromHex(contract.yam_lend_pool.address)
  return window.tronWeb.contract(abi.YAMLENDPool, address)
}
const YAMPool = () => {
  let address = window.tronWeb.address.fromHex(contract.yam.address)
  return window.tronWeb.contract(abi.YAM, address)
}

const WTRONPool = () => {
  let address = window.tronWeb.address.fromHex(contract.wtron.address)
  return window.tronWeb.contract(abi.WTRON, address)
}

const actions = {
  login: async ({ commit, rootState }: any) => {

    if (window.tronWeb.ready) {

      await commit('SET_ACCOUNT', window.tronWeb.defaultAddress.base58)
      await commit('SET_DEFAULT_ADDRESS', window.tronWeb.defaultAddress)

      return window.tronWeb.ready
    } else {
      return false
    }
  },
  // get balanceOf
  balanceOf: async ({ rootState }: any, { abiName, contract }: any) => {
    try {
      let address = window.tronWeb.address.fromHex(contract)
      const pool =  window.tronWeb.contract(abi[abiName], address)
      const coinbase = rootState.tronweb.account
      const balanceOf = await pool.methods.balanceOf(coinbase).call()
      let balance = parseFloat(formatUnits(balanceOf.toString(), 18))

      console.log('balanceOf', balance)
      return balance
    } catch (e) {
      console.log('e', e)
      return Promise.reject()
    }
  },
  // get earned
  earned: async ({ rootState }: any) => {
    try {
      const pool = YAMLENDPool()
      const coinbase = rootState.tronweb.account
      const balanceOf = await pool.methods.earned(coinbase).call()
      let balance = parseFloat(formatUnits(balanceOf.toString(), 18))

      console.log('earned', balance)
      return balance
    } catch (e) {
      console.log('e', e)
      return Promise.reject()
    }
  },
  approveState: async ({ rootState }: any) => {
    try {
      let address = window.tronWeb.address.fromHex(contract.yam_lend_pool.address)
      const pool = WTRONPool()
      const coinbase = rootState.tronweb.account
      const balanceOf = await pool.methods.allowance(coinbase, address).call()
      let balance = parseFloat(formatUnits(balanceOf.toString(), 18))

      console.log('approveState', balance)
      return balance
    } catch (e) {
      console.log('e', e)
      return Promise.reject()
    }
  },
  approve: async ({ rootState }: any) => {
    try {
      const pool = WTRONPool()
      const coinbase = rootState.tronweb.account
      let address = window.tronWeb.address.fromHex(contract.yam_lend_pool.address)
      const amount = parseUnits('100').toString()
      const res = await pool.methods.approve(address, amount).send({
        from: coinbase
      })

      console.log('approve', res)
      return res
    } catch (e) {
      console.log('e', e)
      return Promise.reject()
    }
  },
  stake: async ({ rootState }: any) => {
    try {
      const pool = YAMLENDPool()
      const coinbase = rootState.tronweb.account
      const amount = parseUnits('20').toString()
      const res = await pool.methods.stake(amount).send({
        from: coinbase
      })

      console.log('stake', res)
      return res
    } catch (e) {
      console.log('e', e)
      return Promise.reject()
    }
  },
  unStake: async ({ rootState }: any) => {
    try {
      const pool = YAMLENDPool()
      const coinbase = rootState.tronweb.account
      const amount = parseUnits('20').toString()
      const res = await pool.methods.withdraw(amount).send({
        from: coinbase
      })

      console.log('unStake', res)
      return res
    } catch (e) {
      console.log('e', e)
      return Promise.reject()
    }
  },
  harvest: async ({ rootState }: any) => {
    try {
      const pool = YAMLENDPool()
      const coinbase = rootState.tronweb.account
      const res = await pool.methods.getReward().send({
        from: coinbase
      })

      console.log('harvest', res)
      return res
    } catch (e) {
      console.log('e', e)
      return Promise.reject()
    }
  },
  exit: async ({ rootState }: any) => {
    try {
      const pool = YAMLENDPool()
      const coinbase = rootState.tronweb.account
      const res = await pool.methods.exit().send({
        from: coinbase
      })

      console.log('exit', res)
      return res
    } catch (e) {
      console.log('e', e)
      return Promise.reject()
    }
  },
}


export default {
  state,
  mutations,
  actions
}
