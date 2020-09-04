`<template>
  <div class="home">
    <pre>
      __      __  ______   __       __ 
      /  \    /  |/      \ /  \     /  |
      $$  \  /$$//$$$$$$  |$$  \   /$$ |
      $$  \/$$/ $$ |__$$ |$$$  \ /$$$ |
        $$  $$/  $$    $$ |$$$$  /$$$$ |
        $$$$/   $$$$$$$$ |$$ $$ $$/$$ |
          $$ |   $$ |  $$ |$$ |$$$/ $$ |
          $$ |   $$ |  $$ |$$ | $/  $$ |
          $$/    $$/   $$/ $$/      $$/ 
    </pre>
    <ol>

      <li>
        <button @click="login">Connect Wallet</button>
      </li>

      <li>---------------------------------</li>

      <li>
        <button @click="getData">Get Data</button>
      </li>

      <li>---------------------------------</li>

      <li>Your Address <b>{{ tronweb.account }}</b></li>

      <li>---------------------------------</li>

      <li>Your YAM Balance {{ balanceVal }}</li>
      <li>Total supply 500,000,000</li>

      <li>---------------------------------</li>

      <li>Deposit WTRON</li>
      <li>Earn YAM</li>

      <li>---------------------------------</li>

      <li>YAMs earned {{ earnedVal }}</li>
      <li>WTRON Staked {{ stakeVal }}</li>

      <li>---------------------------------</li>

      <li>
        <button @click="harvest">Harvest</button>
      </li>
      <li>---------------------------------</li>
      <li>
        <button @click="approve">Approve WTRON</button>
      </li>
      <li>
        <button @click="stake">Staked WTRON</button>
      </li>
      <li>---------------------------------</li>
      <li>
        <button @click="unStake">Unstake</button>
      </li>
      <li>
        <button @click="exit">Harvest & Unstake</button>
      </li>
    </ol>

    <!-- <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/> -->
  </div>
</template>

<script>
import TronWeb from "tronweb/dist/TronWeb";
import { mapActions, mapState } from 'vuex'
import contract from '@/contract.json'

export default {
  data() {
    return {
      balanceVal: '0.000',
      earnedVal: '0.000',
      stakeVal: '0.000',
    }
  },
  created() {
    console.log("TronWeb", TronWeb, "TronWeb end");

    // const fullNode = "https://api.trongrid.io";
    // const solidityNode = "https://api.trongrid.io";
    // const eventServer = "https://api.trongrid.io/";

    // const tronWeb = new TronWeb(fullNode, solidityNode, eventServer);

    // console.log("tronWeb", tronWeb);
  },
  computed: {
    ...mapState(['tronweb']),
  },
  methods: {
    ...mapActions(['login', 'approveState', 'balanceOf', 'earned', 'approve', 'stake', 'unStake', 'harvest', 'exit']),
    async getData() {
      const balanceVal = await this.balanceOf({
        abiName: 'YAMLENDPool',
        contract: contract.yam.address
      })
      this.balanceVal = balanceVal

      const earnedVal = await this.earned()
      this.earnedVal = earnedVal

      const stakeVal = await this.balanceOf({
        abiName: 'YAMLENDPool',
        contract: contract.yam_lend_pool.address
      })
      this.stakeVal = stakeVal

      this.approveState()
    }
  }
}
</script>
