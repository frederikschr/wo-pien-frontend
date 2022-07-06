<template>
  <div>
    <div class="form-group">
      <label style="margin-top: 2em">Items</label>
      <div class="items-add">
          <input id="item" v-model='item_name' type="text" class="form-control" maxlength="20" placeholder="Enter Item"/>
          <input type="number" v-model='item_amount' class="form-control" placeholder="Amount">
          <button type="button" @click="addItem(this.target)" class="btn btn-primary btn-lock" style="float: right; margin-top: .5em; max-width: 20%; background-color: rgba(0, 136, 169, 1); border: none;">Add</button>
      </div>
      <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" style="margin: 1em;">
      <label class="form-check-label" for="flexCheckDefault" style="margin: 1em; color: rgb(0, 136, 169)">
        Host
      </label>
    </div>

    <div v-if="target.length !== 0" class="items">
      <table class="items-table">
        <thead>
          <tr>
            <td><b>Item</b></td>
            <td align="center"><b>Amount</b> </td>
          </tr>
        </thead>
        <tbody>
          <tr class="item" v-for="item in target" :key="item" style="color: black">
            <td v-if="!item.byHost">{{ item.name }}</td>
            <td v-if="!item.byHost" align="center">{{ item.amount }}</td>
            <td v-if="item.byHost" style="color: rgba(0, 136, 169, 1)">{{ item.name }}</td>
            <td v-if="item.byHost" align="center" style="color: rgba(0, 136, 169, 1)">{{ item.amount }}</td>
            <button class="del-item" @click="delItem(item, this.target, this.delItems)"><i class="fa fa-close" style="color: red;"></i></button>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { item } from '../mixins'

export default {
  name: 'ItemManager',
  mixins: [item],
  props: {
    target: {
      type: Array,
      required: true
    },
    delItems: {
      type: Array,
      required: false
    }
  },
  data () {
    return {
      item_name: '',
      item_amount: 1
    }
  }
}

</script>

<style>
.del-item {
    cursor: pointer;
    color: red;
    background-color: white;
    float: right;
}

#item {
  width: 50%;
}

.items-add input {
  display: inline-block;
  width: 15%;
  margin-right: 10%;
}

.items {
  max-height: 10em;
  overflow-y: scroll;
}

.items-table {
  width: 100%;
  table-layout: fixed;
  overflow-wrap: break-word;
}

.items-table td:first-child {
  width: 50%;
}

.items-table td:nth-child(2) {
  width: 25%;
}

@media only screen and (max-width: 700px) {
    .items-add input {
      margin-right: 5%;
      width: 20%;
    }

}

</style>
