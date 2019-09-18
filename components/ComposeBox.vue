<template>
  <div class="compose-box">
    <div class="form-group">
      <input
        type="text"
        :placeholder="$inter.formatMessage({ path: 'editor.titlePlaceholder' })"
        v-model="actualNote.title"
      />
    </div>
    <div class="form-group">
      <textarea
        v-model="actualNote.content"
        rows="10"
        autofocus
        :placeholder="$inter.formatMessage({ path: 'editor.contentPlaceholder' })"
      ></textarea>
    </div>
    <button type="button" :disabled="saving || !actualNote.content" @click="save">
      <format-message :path="saving ? 'editor.saving' : 'editor.save'" />
    </button>
    <button type="button" v-if="handleCancel" @click="cancel">
      <format-message path="editor.cancel" />
    </button>
  </div>
</template>

<script>
import Vue from 'vue'
import { uid } from '../utils/uid'

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
        tags: []
      },
      saving: false
    }
  },

  methods: {
    async save() {
      this.saving = true
      const note = { ...this.actualNote }
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