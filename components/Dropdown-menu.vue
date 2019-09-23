<template>
    <div class="dropdown">
        <span class="dropdown-title">
            {{title}}
            <chevron-down-icon size='0.8x'/>
        </span>
        <div class="dropdown-content">
            <a href='#' v-for='item in items'
             v-bind:key="item.text" 
             v-on:click='itemOnClick(item)'>
            <span v-if="inter" >
                {{$inter.formatMessage({ path: item.text })}}
            </span>
            <span v-else>
               {{ item.text }}
            </span>
            </a>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { ChevronDownIcon } from 'vue-feather-icons'
export default Vue.extend({
    props: {
        title:{
            type: String,
            default:'ddMenu'
        },
        items:{
            type: Array,
            default:[]
        },
        inter:{
            type: Boolean,
            default: true
        }
    },
    methods:{
        itemOnClick: function(item) {
            this.$parent[item.callback]()
            }
    },
    components: {
        ChevronDownIcon
    }
  });
</script>
<style scoped>
.dropdown {
  position: relative;
  display: inline-block;
  border-style: solid;
  border-width: 1px;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color:var(--body-bg);
  min-width: 130px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  padding: 4px 8px;
  top: 25px;
  z-index: 1;
}
.dropdown-content > a{
    Text-decoration: none; 
}
.dropdown-title{
    margin:5px;
}

.dropdown:hover .dropdown-content {
  display: block;
}
</style>

