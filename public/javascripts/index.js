Vue.component('vote-count', {
  props: ['name', 'voteMembers'],
  data() {
    return {
      votes: 0
    }
  },
  template: `<div class="vote">
<span class="bold">Want to work with {{ name }}?</span>
<a href="#" @click="vote(name)"><img src="/images/thumbs-up.svg" alt="thumbs up" class="icon"/> Yes!</a>
<div>{{ votes | pluralize }} {{ findVote }}</div>
</div>`,
  computed: {
    findVote: function() {
      try {
        let member = this.voteMembers.find((member) => {
          return member.name === this.name
        })
        this.votes = member ? member.votes : 0
      } catch (err) {
        console.log(`Error in findVote function in index.js: ${err}`);
      }
  }},
  methods: {
    vote: function(name) {
      try {
        let member = this.voteMembers.find((member) => {
          return member.name === this.name
        })
        this.votes = member ? member.votes += 1 : this.votes += 1
        axios.post(`/members/${name}`).catch((err) => {
          console.log(`Error in POST request in vote function in index.js: ${err}`);
        })
      } catch (err) {
        console.log(`Error in vote function in index.js: ${err}`);
      }
    }
  },
  filters: {
    pluralize: function(val) {
      if (val > 1) {
        return `${val} people have said Yes!`
      } else if (val == 1) {
        return '1 person has said Yes!'
      }
      return 'No votes yet.'
    }
  }
})

let app = new Vue({
  el: '#app',
  data() {
    return {
      membersList: [],
      voteMembers: []
    }
  },
  created() {
    const url = process.env.API_URL;
    let roster = [];

    axios.get(url).then((memberRes) => {
      if (memberRes.status == 200) {
        this.membersList = memberRes.data

        for (let member of this.membersList) {
          roster.push(member.name)
        }
      }
    }).then(() => {
      axios.post('/members', {
        data: roster
      }).then((voteRes) => {
        if (voteRes.status == 200) {
          this.voteMembers = voteRes.data
        }
      }).catch((error) => {
        console.log(error)
      })
    }).catch((error) => {
      console.log(error)
    })
  }
})
