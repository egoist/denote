<template>
  <div class="compose-box">
    <div class="form-group">
      <input type="text" placeholder="Title (optional)" v-model="actualNote.title" />
    </div>
    <div class="form-group">
      <textarea v-model="actualNote.content" rows="10" autofocus placeholder="Type something.."></textarea>
    </div>
    <button
      type="button"
      :disabled="saving || !actualNote.content"
      @click="save"
    >{{ saving ? 'Saving' : 'Save' }}</button>
    <button type="button" v-if="handleCancel" @click="cancel">Cancel</button>
  </div>
</template>

<script>
import Vue from 'vue'
import {uid} from '../utils/uid'

export default Vue.extend({
  props: {
    handleSave: {
      type: Function,
      required: true
    },
    handleCancel: {
      type: Function
    },
    note: {
      type: Object
    }
  },

  data() {
    return {
      actualNote: this.note || {
        id: uid(),
        title: '',
        content: '',
        tags: [],
      },
      saving: false
    }
  },

  methods: {
    async save() {
      this.saving = true
      const note = {...this.actualNote}
      if (!note.createdAt) {
        note.createdAt = new Date()
      }
      note.updatedAt = new Date()
      await this.handleSave(note)
      this.saving = false
      this.actualNote.title = ''
      this.actualNote.content = ''
      this.actualNote.tags = []
    },

    cancel() {
      this.handleCancel(this.note)
    }
  }
})
</script>