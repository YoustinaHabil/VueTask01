<template>
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"/>
    
   <h1  class="animate__animated animate__bounce feed-title ">{{feedData.title}}</h1>
  <div class="div1"></div>
  <br>
 <div class="masonry-with-columns">
    <div v-for="item in newsList" :key="item.id" class="item">
      <img :src="item.enclosure.link" />
      <div class="content">
      <h2 class="title"><a :href="item.link" target="blank">{{ item.title.length >20  ? `${item.title.substring(0,50) }....` : item.title }}</a></h2>
      <p class="date" v-if="item.pubDate">{{formatDate(item.pubDate)}}</p>
     </div>
    </div>
   </div>
<div v-if="newsList.length < totalItemsLength" class="view-more">
<button @click="readMore">View More</button>
</div> 
</template>
<script>
import moment from "moment"
import axios from "axios";
export default {
  data() {
    return {
      feedData:{},
      newsList: [],
      restOfList: [],
      firstPageItems: 7,
      totalItemsLength : null
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    readMore() {
      this.newsList = [...this.newsList, ...this.restOfList];
    },
    formatDate(date) {
        return moment(date).format("MM/DD/YYYY");
      },
    fetchData() {
      axios
        .get(
          "https://api.rss2json.com/v1/api.json?rss_url=http://rss.cnn.com/rss/edition.rss"
        )
        .then((response) => {
          this.feedData = response.data.feed
          this.newsList = response.data.items.slice(0, this.firstPageItems);
          this.totalItemsLength = response.data.items.length;
          this.restOfList = response.data.items.slice(
          this.firstPageItems,
          this.totalItemsLength
          );
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style lang="scss">
.feed-title{
  font-size: 26px;
}
.div1{
  background-color: yellow;
   width: 55px; 
   height:7px;
}
.masonry-with-columns {
  display: flex;
  flex-wrap: wrap;
  .item {
    position: relative;
    margin: 0 10px 10px 0;
    text-align: center;
    font-weight: 900;
    font-size: 2rem;
    width: 30%;
    flex: 1 0 auto;
  }
  .content {
    position: absolute;
    bottom: 10px;
    padding-left: 10px;
    .title a{
    font-size: 15px;
    text-decoration:none;
    color: white;
    text-transform: capitalize;
    }
    .date{
      font-size: 12px;
      color: rgb(142, 135, 135);
      text-align: start;
    }
  }
  img {
    width: 100%;
    height: 300px;
    object-fit: cover;
  }
  .item:nth-child(1) {
    width: 60%;
  }
  .item:nth-child(7) {
    width: 60%;
  }
}
.view-more {
  display: flex;
  justify-content: center;
  button{
    border: 4px solid black;
    color: black;
    background-color: transparent;
    padding: 2px 25px;
    text-transform: uppercase;
    font-size: 13px;
  }
}
@media only screen and (min-width: 600px) and (max-width: 1000px) {
  .masonry-with-columns {
    .item {
      width: 35%;
    }
    .item:nth-child(1) {
      width: 55%;
    }
    .item:nth-child(7) {
      width: 55%;
    }
  }
}
@media only screen and (max-width: 600px) {
  .masonry-with-columns {
    .item {
      width: 100%;
    }
    .item:nth-child(1) {
      width: 100%;
    }
    .item:nth-child(7) {
      width: 100%;
    }
  }
}
.animate__animated.animate__bounce {
  --animate-duration: 2s;
}
</style>