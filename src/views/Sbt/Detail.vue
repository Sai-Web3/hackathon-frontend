<template>
  <div class="content">

    <h1 class="heading">SBT Detail</h1>

    <div class="tab_box">
      <div class="tabs">
        <button
          v-for="(tab, index) in tabs"
          :key="index"
          :class="{ active: activeTab === index }"
          @click="changeTab(index)"
        >
          {{ tab.title }}
        </button>
      </div>
      <div class="tab-content">
        <div v-for="(tab, index) in tabs" :key="index" v-show="activeTab === index">
          <div v-if='tab.title == "Top"'>
            <table class="table">
              <thead>
                <tr>
                  <th>Best SS</th>
                  <th>Best HS</th>
                  <th>Reputation</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{{soft_skills.length > 0 ? soft_skills[0].skill_name : ""}}</td>
                  <td>{{hard_skills.length > 0 ? hard_skills[0].skill_name : ""}}</td>
                  <td rowspan="3" class="text-center border-0">A</td>
                </tr>
                <tr>
                  <td>{{soft_skills.length > 1 ? soft_skills[1].skill_name : ""}}</td>
                  <td>{{hard_skills.length > 1 ? hard_skills[1].skill_name : ""}}</td>
                </tr>
                <tr>
                  <td>{{soft_skills.length > 2 ? soft_skills[2].skill_name : ""}}</td>
                  <td>{{hard_skills.length > 2 ? hard_skills[2].skill_name : ""}}</td>
                </tr>
              </tbody>
            </table>
            <div class="my-3">
              <label>Name</label>
              <input type="text" name="" class="form-control" v-model="name" :disabled="$store.state.sbt_id != sbt_id">
            </div>
            <div class="my-3">
              <label>Description</label>
              <input type="text" name="" class="form-control" v-model="description" :disabled="$store.state.sbt_id != sbt_id">
            </div>
            <div class="text-center mt-5">
              <button class="btn btn-primary" @click="update">Update</button>
            </div>
          </div>
          <div v-else-if='tab.title == "Soft Skill"'>
            <table class="table">
              <thead>
                <tr>
                  <th>Skill Name/Description</th>
                  <th>Relevance</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(soft_skill, index) in soft_skills" :key="soft_skill.skill_name">
                  <td>
                    <div class="heading">{{soft_skill.skill_name}}</div>
                    <div class="detail" :class="{ open: isSoftSkillContentOpen[index] }">{{soft_skill.description}}</div>
                  </td>
                  <td class="align-top">
                    <div class="value">{{soft_skill.value}}</div>
                  </td>
                  <td class="align-top">
                    <div class="icon" @click="toggleSoftSkillContentAccordion(index)">
                      <span v-html="isSoftSkillContentOpen[index] ? closeIcon : openIcon"></span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div v-else-if='tab.title == "Hard Skill"'>
            <table class="table">
              <thead>
                <tr>
                  <th>Skill Name/Description</th>
                  <th>Relevance</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(hard_skill, index) in hard_skills" :key="hard_skill.skill_name">
                  <td>
                    <div class="heading">{{hard_skill.skill_name}}</div>
                    <div class="detail" :class="{ open: isHardSkillContentOpen[index] }">{{hard_skill.description}}</div>
                  </td>
                  <td class="align-top">
                    <div class="value">{{hard_skill.value}}</div>
                  </td>
                  <td class="align-top">
                    <div class="icon" @click="toggleHardSkillContentAccordion(index)">
                      <span v-html="isHardSkillContentOpen[index] === true ? closeIcon : openIcon"></span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div v-else-if='tab.title == "Career Detail"'>
            
            <h4>Connect Account</h4>
            <div class="connect_account_box">
              <div class="item">
                <div class="image"><img src="@/assets/BsGithub.png"></div>
                GitHub
              </div>
              <div class="item">
                <div class="image"><img src="@/assets/BsLinkedin.png"></div>
                LinkedIn
              </div>
            </div>

            <table class="table">
              <thead>
                <tr>
                  <th>Career Title</th>
                  <th>Position</th>
                  <th>Period</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <div class="career_title">Ethereum Foundation</div>
                  </td>
                  <td>
                    <div class="position">Founder</div>
                  </td>
                  <td>
                    <div class="period">Jun. 05, 2022 - <br/>Feb. 04, 2023</div>
                  </td>
                  <td>
                    <div class="description">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div class="career_title">Ethereum Foundation</div>
                  </td>
                  <td>
                    <div class="position">Founder</div>
                  </td>
                  <td>
                    <div class="period">Jun. 05, 2022 - <br/>Feb. 04, 2023</div>
                  </td>
                  <td>
                    <div class="description">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div class="career_title">Ethereum Foundation</div>
                  </td>
                  <td>
                    <div class="position">Founder</div>
                  </td>
                  <td>
                    <div class="period">Jun. 05, 2022 - <br/>Feb. 04, 2023</div>
                  </td>
                  <td>
                    <div class="description">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div v-else-if='tab.title == "Matching"'>

            <div class="my-3">
              <router-link to="/looking/job" class="btn btn-primary me-3">Look for jobs</router-link>
              <router-link to="/looking/buddy/create" class="btn btn-primary">Look for buddies</router-link>
            </div>

            <div class="h4 mt-5 mb-2">Your registerd job list</div>
            <div class="">
             <div class="row">
               <div class="col-4" v-for="(register_job, index) in register_jobs" :key="index">
                  <div class="">
                    <div class="">{{register_job.title}}</div>
                    <div class=""><router-link :to="`/looking/job/detail/${register_job.id}`" class="btn btn-primary">Detail</router-link></div>
                  </div>
               </div>
             </div> 
            </div>

            <div class="h4 mt-5 mb-2">Your applied job list</div>
            <div class="">
             <div class="row">
               <div class="col-4" v-for="(application_job, index) in application_jobs" :key="index">
                <div class="">
                  <div class="">{{application_job.title}}</div>
                    <div class=""><router-link :to="`/looking/job/detail/${application_job.id}`" class="btn btn-primary">Detail</router-link></div>
                </div>
               </div>
             </div> 
            </div>

            <div class="h4 mt-5 mb-2">Candidate buddies list</div>
            <div class="">
             <div class="row">
               <div class="col-4" v-for="(offer_sbt, index) in offer_sbts" :key="index">
                  <div class="">
                    <div class="">SBT ID: {{offer_sbt.sbt_id}}</div>
                    <div class=""><span @click="link(offer_sbt.sbt_id)" class="btn btn-primary">Detail</span></div>
                  </div>
               </div>
             </div> 
            </div>

          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'SbtDetail',
  components: {
  },
  data: () => ({
    walletAddress: null,
    sbt_id: -1,
    soft_skills: [],
    hard_skills: [],
    tabs: [
      { title: 'Top',  },
      { title: 'Soft Skill',  },
      { title: 'Hard Skill',  },
      { title: 'Career Detail', },
      { title: 'Matching',  },
    ],
    activeTab: 0,
    isSoftSkillContentOpen: [],
    isHardSkillContentOpen: [],
    openIcon: '<i class="fa fa-chevron-down"></i>',
    closeIcon: '<i class="fa fa-chevron-up"></i>',
    register_jobs: [],
    application_jobs: [],
    offer_sbts: [],
    name: "",
    description: ""
  }),
  computed: {
  },
  async mounted() {
    if (window.ethereum) {
      this.walletAddress = await this.getAccount()
      if(this.walletAddress != this.$store.state.walletAddress) {
        this.$router.push("/");
      }
    } else {
      this.$router.push("/");
    }
    await this.initialize();
  },
  methods: {
    changeTab(index) {
      this.activeTab = index;
    },
    toggleSoftSkillContentAccordion(index) {
      this.$set(this.isSoftSkillContentOpen, index, !this.isSoftSkillContentOpen[index]);
    },
    toggleHardSkillContentAccordion(index) {
      this.$set(this.isHardSkillContentOpen, index, !this.isHardSkillContentOpen[index]);
    },
    getAccount: async function() {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      return accounts[0];
    },

    initialize: async function() {

      this.sbt_id = this.$route.params.sbt_id;

      let res;
      try {
        res = await this.apiGetSbtDetail(this.sbt_id);
        const skills = res.data?.data || "";
        this.register_jobs = res.data?.register_jobs || [];
        this.application_jobs = res.data?.application_jobs || [];
        this.offer_sbts = res.data?.offer_sbts || [];

        for(let index in skills) {
          if(skills[index].skill_type_id == 1) {
            this.soft_skills.push(skills[index]);
            this.isSoftSkillContentOpen.push(false);
          } else if(skills[index].skill_type_id == 2) {
            this.hard_skills.push(skills[index])
            this.isHardSkillContentOpen.push(false);
          }
        }

      } catch (error) {
        this.$log.error(error);
        return;
      }
    },

    update: async function() {

      let res;
      try {
        res = await this.apiPostUserUpdate(this.$store.state.sbt_id, this.name, this.description);

      } catch (error) {
        this.$log.error(error);
        return;
      }
    },

    link(id) {
      this.$router.push(`/sbt/detail/${id}`);
      location.reload();
    }

  },
}
</script>
