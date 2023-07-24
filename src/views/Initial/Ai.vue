<template>
  <div class="content">

    <div :class="{ 'hide': isConfirmation }">

      <h1 class="heading">Welcome Sai!</h1>

      <div class="chat_box">
        <div class="chat_select_occupation">
          <div class="heading">Please Choose the following👇</div>
          <div class="box">
            <div class="item engineer">
              <div class="image" ref="engineer_image"></div>
              <div class="label">Engineer</div>
            </div>
            <div class="item designer">
              <div class="image" ref="designer_image"></div>
              <div class="label">Designer</div>
            </div>
            <div class="item business">
              <div class="image" ref="business_image"></div>
              <div class="label">Business</div>
            </div>
            <div class="clear"></div>
          </div>
        </div>
      </div>

      <div class="question_box">

        <div class="chat_box">
          <div class="chat_ai">
            Your name
          </div>
        </div>

        <div class="chat_box">
          <div class="input_user">
            <input type="text" class="form-control" v-model="inputs.name" placeholder="" />
          </div>
        </div>

        <div class="chat_box">
          <div class="chat_ai">
            Your comment
          </div>
        </div>

        <div class="chat_box">
          <div class="input_user">
            <input type="text" class="form-control" v-model="inputs.comment" placeholder="" />
          </div>
        </div>

        <div class="chat_box">
          <div class="chat_ai">
            Please tell me the work period above
          </div>
        </div>

        <div class="chat_box">
          <div class="period_user">
            
            <div class="heading">Start Period</div>

            <div class="row mx-0">
              <div class="col-2 text-center"><div class="label">Year</div></div>
              <div class="col-3">
                <select class="form-control" v-model="inputs.started_year">
                  <option v-for="year in this.years" :key="year" :value="year">{{ year }}</option>
                </select>
              </div>
              <div class="col-2 text-center"><div class="label">Month</div></div>
              <div class="col-3">
                <select class="form-control" v-model="inputs.started_month">
                  <option v-for="month in this.months" :key="month.value" :value="month.value">{{ month.label }}</option>
                </select>
              </div>
            </div>

            <div class="heading">End Period</div>

            <div class="row mx-0">
              <div class="col-2 text-center"><div class="label">Year</div></div>
              <div class="col-3">
                <select class="form-control" v-model="inputs.finished_year">
                  <option v-for="year in this.years" :key="year" :value="year">{{ year }}</option>
                </select>
              </div>
              <div class="col-2 text-center"><div class="label">Month</div></div>
              <div class="col-3">
                <select class="form-control" v-model="inputs.finished_month">
                  <option v-for="month in this.months" :key="month.value" :value="month.value">{{ month.label }}</option>
                </select>
              </div>
            </div>

          </div>
        </div>

        <div class="my-5 py-1"></div>

        <div class="chat_box">
          <div class="chat_ai">
            What kind of company was it?
          </div>
        </div>

        <div class="chat_box">
          <div class="input_user">
            <textarea class="form-control" rows="5" v-model="inputs.kind" placeholder="e.g.) The company was a tech startup that created an innovative system to visualize and manage human resource capabilities, thus transforming HR practices across various industries." />
          </div>
        </div>

        <div class="chat_box">
          <div class="chat_ai">
            What were your main responsibilities, the goals and accomplishments to be achieved, and the challenges and difficulties you faced in doing so?<br/>
            And how did you deal with those difficulties?
          </div>
        </div>

        <div class="chat_box">
          <div class="input_user">
            <textarea class="form-control" rows="5" v-model="inputs.reponsibility" placeholder="e.g.) As a project manager, I led a team to deliver software projects on time, within budget, and up to quality standards. Challenges included changing scopes, resource issues, and stakeholder expectations. To navigate these, I used proactive planning, clear communication, and effective resource management, ensuring successful project completion." />
          </div>
        </div>

        <div class="chat_box">
          <div class="chat_ai">
            What was your roll in your team?
          </div>
        </div>

        <div class="chat_box">
          <div class="input_user">
            <textarea class="form-control" rows="5" v-model="inputs.roll" placeholder="e.g.) CTO, Lead Tech, Manager, Senior, Junior etc..."></textarea>
          </div>
        </div>

      </div>

      <div class="form-group text-center">
        <div class="mint_button d-block" @click="analysis">Proceed to SBT Generation</div>
      </div>

    </div>


    <div class="loading_box" :class="{ 'hide': !isConfirmation }">
      <h1 class="heading">Generating your SBT...</h1>
      <div ref="loading_image" class="image"></div>
    </div>

  </div>
</template>

<script>
// @ is an alias to /src
import Web3 from "web3";
import lottie from 'lottie-web';

export default {
  name: 'InitialAi',
  components: {
  },
  data: () => ({
    walletAddress: null,
    inputs: {
      name: "",
      comment: "",
      kind: "",
      reponsibility: '',
      roll: '',
      started_year: "2010",
      started_month: "1",
      finished_year: "2023",
      finished_month: "1",
    },
    isConfirmation: false,
    years: Array.from({ length: 2023 - 1990 + 1 }, (_, index) => index + 1990),
    months:  [
      {value: 1, label: "January"},
      {value: 2, label: "February"},
      {value: 3, label: "March"},
      {value: 4, label: "April"},
      {value: 5, label: "May"},
      {value: 6, label: "June"},
      {value: 7, label: "July"},
      {value: 8, label: "August"},
      {value: 9, label: "September"},
      {value: 10, label: "October"},
      {value: 11, label: "November"},
      {value: 12, label: "December"},
    ],
  }),
  computed: {
    analyzeParams() {
      const analyzeParams = {
        name: this.inputs.name,
        comment: this.inputs.comment,
        input_text: "What kind of company was it?:" + "\r\n" + this.inputs.kind + "\r\n\r\n" + "What were your main responsibilities, the goals and accomplishments to be achieved, and the challenges and difficulties you faced in doing so? And how did you deal with those difficulties?:" + "\r\n" + this.inputs.reponsibility + "\r\n\r\n" + "What was your roll in your team?:" + "\r\n" + this.inputs.roll,
        started_at: this.inputs.started_year + "-" + this.inputs.started_month,
        finished_at: this.inputs.finished_year + "-" + this.inputs.finished_month,
      };
      return analyzeParams;
    },
  },
  async mounted() {
    if (window.ethereum) {
      this.walletAddress = await this.$store.dispatch('getAccount');
      if(this.walletAddress != this.$store.state.walletAddress) {
        this.$router.push("/");
      }
    } else {
      this.$router.push("/");
    }
    this.loadAnimation();
  },
  methods: {
    analysis: async function() {
      let res;
      this.isConfirmation = true;
      try {
        res = await this.apiPostAiAnalysis(this.analyzeParams, this.walletAddress, false);
        if(res.data?.status) {
          this.mint(res.data.calldata, res.data.sbt_address, res.data.gas_limit, res.data.gas_price);
        } else {
          this.isConfirmation = false;
        }
      } catch (error) {
        this.$log.error(error);
        this.isConfirmation = false;
        return;
      }
    },

    skip: async function() {
      let res;
      this.isConfirmation = true;
      try {
        res = await this.apiPostAiAnalysis(this.analyzeParams, this.walletAddress, true);
        if(res.data?.status) {
          this.mint(res.data.calldata, res.data.sbt_address, res.data.gas_limit, res.data.gas_price);
        } else {
          this.isConfirmation = false;
        }
      } catch (error) {
        this.$log.error(error);
        this.isConfirmation = false;
        return;
      }
    },

    mint: async function(calldata, sbt_address, gas_limit, gas_price) {

      const params = [
        {
          from: this.$store.state.walletAddress,
          to: sbt_address,
          gas: Web3.utils.toHex(parseInt(gas_limit)),
          gasPrice: Web3.utils.toHex(parseInt(gas_price)),
          value: "0x0",
          data: calldata,
          // maxFeePerGas: Web3.utils.toHex(parseInt(gas_price)), // 追加: 手数料上限の調整
          // maxPriorityFeePerGas: Web3.utils.toHex(parseInt(gas_price) * 2), // 追加: 手数料上限の調整
        },
      ];

      window.ethereum.request({
        method: 'eth_sendTransaction',
        params,
      })
      .then((result) => {
        this.wait();
      })
      .catch((error) => {
        this.isConfirmation = false;
        console.info(error)
      });

    },

    wait: async function() {
      let index = 0;
      while(true) {

        const sbt_id = await this.confirmation();

        if(sbt_id != -1) {
          this.$store.commit("setSbtId", sbt_id);
          break;
        }

        await new Promise(resolve => setTimeout(resolve, 2000));
        index++;
      }
      this.isConfirmation = false;
      this.$router.push("/mypage");
    },

    confirmation: async function() {
      let res
      try {
        res = await this.apiGetSbtAccount(this.walletAddress);
        return res.data?.sbt_id;
      } catch (error) {
        return -1;
      }
    },


    loadAnimation() {
      const engineerImageData = require('@/assets/json/mechanical-engineer.json');
      const designerImageData = require('@/assets/json/uiux-designer.json');
      const businessImageData = require('@/assets/json/businessman-taking-notes.json');
      const loadingImageData = require('@/assets/json/loading.json');

      lottie.loadAnimation({
        container: this.$refs.engineer_image,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        animationData: engineerImageData,
      });
      lottie.loadAnimation({
        container: this.$refs.designer_image,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        animationData: designerImageData,
      });
      lottie.loadAnimation({
        container: this.$refs.business_image,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        animationData: businessImageData,
      });
      lottie.loadAnimation({
        container: this.$refs.loading_image,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        animationData: loadingImageData,
      });

    },

  },
}
</script>
