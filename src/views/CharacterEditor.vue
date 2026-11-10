<template>
  <div class="character-editor">
    <!-- 導覽側邊欄 -->
    <NavigationSidebar @navigate="handleNavigate" />

    <div class="container">
      <div class="header">
        <h1><img :src="require('@/../public/logo.svg')" alt="Logo" class="logo" /> 7755遊戲角色檔案編輯器</h1>
        <div class="relate-link-group">
          <el-button type="text" class="expand-btn personal-site-btn" @click="openPersonalSite" circle>
            <el-icon class="btn-icon">
              <AiChatIcon />
            </el-icon>
            <span class="btn-text">關於作者</span>
          </el-button>
          <el-button type="text" class="expand-btn github-btn" @click="openGithub" circle>
            <el-icon class="btn-icon">
              <GitHubIcon />
            </el-icon>
            <span class="btn-text">GitHub</span>
          </el-button>
          <el-button type="text" class="expand-btn report-btn" @click="openReportPage" circle>
            <el-icon class="btn-icon">
              <Flag />
            </el-icon>
            <span class="btn-text">回報</span>
          </el-button>
        </div>
      </div>
      <!-- 檔案控制 -->
      <div class="success-message">
        <el-button type="primary" @click="$router.push('/')" plain>
          <el-icon>
            <House />
          </el-icon> 返回首頁
        </el-button>
        <div class="notice">
          <h4>⚠️ 注意事項 ⚠️</h4>
          <p>本工具<b>不涉及任何資料儲存</b>，僅做格式轉換。<br />
            對Google雲端操作功能有疑慮者，請選擇使用本機檔案匯出匯入功能。 <br />
            匯出為Markdown格式的檔案，無法匯回本工具。<br />
            永久免費。
          </p>
        </div>
        <FileControls />
      </div>

      <!-- 狀態訊息 -->
      <StatusMessage />

      <!-- 角色編輯表單 -->
      <div class="character-form">
        <div data-section="personal-info">
          <PersonalInfo />
        </div>
        <div data-section="basic-settings">
          <BasicSettings />
        </div>
        <div data-section="first-chat">
          <FirstChat />
        </div>
        <div data-section="detailed-settings">
          <DetailedSettings ref="detailedSettingsRef" />
        </div>
        <div data-section="events">
          <Events ref="eventsRef" />
        </div>
        <div data-section="secret-stories">
          <SecretStories ref="secretStoriesRef" />
        </div>
      </div>

      <!-- 載入動畫 -->
      <LoadingSpinner v-if="loading" />

      <div class="success-message">
        <FileControls />
        <el-button type="info" @click="scrollToTop" plain>
          🔝 回到頂端
        </el-button>
        <el-button type="primary" @click="$router.push('/')" plain>
          <el-icon>
            <House />
          </el-icon>返回首頁
        </el-button>


      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import FileControls from '@/components/GoogleDrive/FileControls.vue'
import StatusMessage from '@/components/Common/StatusMessage.vue'
import LoadingSpinner from '@/components/Common/LoadingSpinner.vue'
import PersonalInfo from '@/components/Character/PersonalInfo.vue'
import BasicSettings from '@/components/Character/BasicSettings.vue'
import FirstChat from '@/components/Character/FirstChat.vue'
import DetailedSettings from '@/components/Character/DetailedSettings.vue'
import Events from '@/components/Character/Events.vue'
import SecretStories from '@/components/Character/SecretStories.vue'
import NavigationSidebar from '@/components/Common/NavigationSidebar.vue'
import { useGoogleAuth } from '@/composables/useGoogleAuth'
import GitHubIcon from '@/components/Common/GitHubIcon.vue'
import AiChatIcon from '@/components/Common/AiChatIcon.vue'
import { Flag, House } from '@element-plus/icons-vue'

export default {
  name: 'CharacterEditor',
  components: {
    FileControls,
    StatusMessage,
    LoadingSpinner,
    PersonalInfo,
    BasicSettings,
    FirstChat,
    DetailedSettings,
    Events,
    SecretStories,
    NavigationSidebar,
    GitHubIcon,
    AiChatIcon,
    Flag,
    House
  },
  methods: {
    openPersonalSite() {
      window.open('https://wuguofish.github.io/lonely-chat-ai/7755.html', '_blank')
    },
    openGithub() {
      window.open('https://github.com/wuguofish/character-editor', '_blank')
    },
    openReportPage() {
      window.open('https://forms.gle/8svwv5X4YSUuxDqb7', '_blank')
    }
  },
  setup() {
    const authStore = useAuthStore()
    const { signIn } = useGoogleAuth()
    
    const isSignedIn = computed(() => authStore.isSignedIn)
    const loading = computed(() => false)

    const testLogin = async () => {
      try {
        await signIn()
        authStore.setSignedIn(true)
      } catch (error) {
        console.error('登入測試失敗:', error)
      }
    }

    const detailedSettingsRef = ref(null)
    const eventsRef = ref(null)
    const secretStoriesRef = ref(null)

    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    }

    const scrollToDetailedSettings = () => {
      if (detailedSettingsRef.value) {
        detailedSettingsRef.value.$el.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        })
      }
    }

    const scrollToEvents = () => {
      if (eventsRef.value) {
        eventsRef.value.$el.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        })
      }
    }

    const scrollToSecretStories = () => {
      if (secretStoriesRef.value) {
        secretStoriesRef.value.$el.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        })
      }
    }

    const handleNavigate = (sectionId) => {
      const element = document.querySelector(`[data-section="${sectionId}"]`)
      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        })
      }
    }

    return {
      isSignedIn,
      loading,
      testLogin,
      detailedSettingsRef,
      eventsRef,
      secretStoriesRef,
      scrollToTop,
      scrollToDetailedSettings,
      scrollToEvents,
      scrollToSecretStories,
      handleNavigate
    }
  }
}
</script>

<style lang="scss" scoped>

.character-editor {
  padding: 20px;
}

.container {
  @include common-container;
}

/* 桌面版：為左側導覽欄預留空間 */
@media (min-width: 769px) {
  .container {
    margin-left: 220px; // 200px sidebar + 20px spacing
  }
}

h1 {
  @include page-title;
}

.character-form {
  margin-top: 30px;
}

.notice {
  margin-bottom: 30px;
}

.success-message {
  text-align: center;
  margin-top: 30px;
  padding: 25px;
  background: linear-gradient(135deg, #67c23a 0%, #85ce61 100%);
  border-radius: 15px;
  color: white;
  box-shadow: 0 10px 25px rgba(103, 194, 58, 0.3);
}

.success-message h3 {
  margin-bottom: 15px;
  font-size: 1.5em;
}

.success-message p {
  margin-bottom: 20px;
  font-size: 1.1em;
  opacity: 0.9;
}

.success-message .el-button {
  margin-bottom: 20px;
}

/* 共用的展開按鈕樣式 */
.expand-btn {
  border: #ccc solid 1px;
  padding: 0.25rem;  
  transition: all 0.3s ease;
  border-radius: 20px;
  height: 32px !important;
  min-height: 32px !important;
}

.relate-link-group .expand-btn {
  display: inline-flex !important;
  align-items: center !important;
  justify-content: center !important;
}

.relate-link-group .expand-btn > span {
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
}

.relate-link-group .expand-btn .btn-icon,
.relate-link-group .expand-btn .btn-text {
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  line-height: normal !important;
}

.expand-btn .btn-text {
  opacity: 0;
  width: 0;
  transition: all 0.3s ease;
  margin-left: 0;
}

.expand-btn .btn-icon {
  transition: all 0.3s ease;
}

.expand-btn:hover {
  width: auto;
  padding: 0.25rem 0.75rem;  
}

.expand-btn:hover .btn-text {
  opacity: 1;
  width: auto;
  margin-left: 0.25rem;  
}



/* 個別按鈕的背景色 */
.github-btn {
  background: rgba(51, 51, 51, 0.9);
}

.report-btn {  
  background: rgba(200, 51, 51, 0.9);
}

.personal-site-btn {
  @include btn-personal-site;
}

/* 手機螢幕適配 */
@media (max-width: 768px) {

  .character-editor {
      padding: 5px;
  }
  

  .header {
    position: relative;
    text-align: center;
  }

  .success-message {
    padding: 5px;    
  }
}

</style>