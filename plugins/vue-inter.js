import Vue from 'vue'
import Inter from 'vue-inter'
import browserLang from 'browser-lang'

Vue.use(Inter)

const lang = browserLang({
  languages: ['zh_CN', 'en', 'fr'],
  fallback: 'en'
})

const messages = {
  en: {
    app: {
      reportBugs: 'Report bugs',
      donate: 'Donate',
      signOut: 'Sign out',
      signIn: 'Sign In',
      slogan: 'A Decentralized Note-Taking App',
      features() {
        return [
          {
            title: 'Your notes.. decentralized',
            content: `Do you want to keep sensitive data in your notes? If you don't want to give your data away, Denote is just for you!`
          },
          {
            title: 'Free and Open Source',
            content: `Denote is a <a href="https://github.com/egoist/denote">free and open source app</a>, our goal is to become one of the best note apps on blockstack.`
          },
          {
            title: 'Simple and easy-to-use',
            content: `Inspired by the simple design of Google Keep, Denote is just about notes and nothing else!`
          }
        ]
      }
    },
    editor: {
      addNote: 'Add note..',
      saving: 'Saving',
      save: 'Save',
      cancel: 'Cancel',
      titlePlaceholder: 'Title (optional)',
      contentPlaceholder: 'Type something..'
    },
    note: {
      delete: 'Delete',
      deleting: 'Deleting..',
      edit: 'Edit',
      confirmDelete: 'Are you sure?'
    }
  },
  fr: {
    app: {
      reportBugs: 'Signaler des bugs',
      donate: 'Faire un don',
      signOut: 'Se déconnecter',
      signIn: 'Se connecter',
      slogan: 'Une application décentralisée de notes',
      features() {
        return [
          {
            title: 'Vos notes.. décentralisées',
            content: `Souhaitez-vous conserver des données sensibles dans vos notes ? Si vous ne voulez pas partager vos données, Denote est fait pour vous !`
          },
          {
            title: 'Gratuit et open source',
            content: `Denote est une <a href="https://github.com/egoist/denote">application gratuite et open source</a>, notre but est de devenir l'une des meilleures applications de note sur blockstack.`
          },
          {
            title: 'Simple et intuitif',
            content: `Inspiré par le design simple de Google Keep, Denote est uniquement pour les notes et rien d'autre !`
          }
        ]
      }
    },
    editor: {
      addNote: 'Ajouter une note..',
      saving: 'Sauvegarde en cours',
      save: 'Sauvegarder',
      cancel: 'Annuler',
      titlePlaceholder: 'Titre (facultatif)',
      contentPlaceholder: 'Saisissez quelquechose..'
    },
    note: {
      delete: 'Supprimer',
      deleting: 'Suppression en cours..',
      edit: 'Modifier',
      confirmDelete: 'Êtes-vous sûr ?'
    }
  },
  zh_CN: {
    app: {
      reportBugs: '报告问题',
      donate: '捐赠',
      signOut: '登出',
      signIn: '登录',
      slogan: '一个去中心化的笔记应用',
      features() {
        return [
          {
            title: '你的笔记.. 去中心化',
            content: `你会在笔记中存储包含隐私的内容吗? 如果你想保证数据绝对安全, Denote 就是你的选择!`
          },
          {
            title: '免费并开源',
            content: `Denote 是一个 <a href="https://github.com/egoist/denote">免费并开源的应用</a>, 我们的目标是成为 blockstack 上最优秀的笔记应用之一。`
          },
          {
            title: '简单且易用',
            content: `Denote 的设计灵感来源于 Google Keep, 我们专注于提升笔记撰写的体验!`
          }
        ]
      }
    },
    editor: {
      addNote: '撰写笔记..',
      saving: '保存中',
      save: '保存',
      cancel: '取消',
      titlePlaceholder: '标题 (可选)',
      contentPlaceholder: '键入内容..'
    },
    note: {
      delete: '删除',
      deleting: '删除中..',
      edit: '编辑',
      confirmDelete: '你确定吗?'
    }
  }
}

const inter = new Inter({
  locale: lang,
  // Define messages for other locales
  messages
})

export default ({ app }) => {
  app.inter = inter
}
