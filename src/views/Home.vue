<template>
  <div class="home">
    <div class="container">
      <h1><img :src="require('@/../public/logo.svg')" alt="Logo" class="logo" /> 7755遊戲角色檔案編輯器</h1>
      <p class="description">
        一個專為卿卿我我角色設定而設計的編輯工具
        <br />支援 Google Drive 雲端儲存
      </p>

      <div class="features">
        <div class="feature-card">
          <h3>📝 完整角色設定</h3>
          <p>個人資料、基本設定、對話場景、詳細設定等</p>
        </div>
        <div class="feature-card">
          <h3>☁️ 雲端同步</h3>
          <p>透過 Google Drive 自動儲存與同步</p>
        </div>
        <div class="feature-card">
          <h3>🎨 本機檔案匯入/匯出</h3>
          <p>不想透過 Google Drive？我們支援本機檔案的匯入與匯出功能。</p>
        </div>
        <div class="feature-card">
          <h3>❤️ 聯絡作者</h3>
          <p>本網頁由
            <el-button type="text" class="personal-site-btn" @click="openPersonalSite">
              ✨阿童✨
            </el-button>
            維護。
          </p>
        </div>
      </div>
      <div class="notice">
        <h4>⚠️ 注意事項：</h4>
        <ol style="padding-left: 2.2rem; padding-right: 1.2rem;">
          <li> 佛系維護。</li>
          <li>角色檔案放在使用者的雲端或是電腦，<b>本工具不涉及任何資料儲存</b>，僅做格式轉換。</li>
          <li>因為雲端存檔功能涉及Google雲端的操作，若對權限有疑慮，可選擇使用本機檔案的匯出匯入功能。</li>
          <li>本工具為純粹的網頁，不涉及伺服器資料交換，即使讀取本機檔案也只會暫存在使用者瀏覽器上，請勿找開發者討要資料。</li>
          <li>支援匯出Markdown，給想把角色搬去GPT或其他平台的人，可以有一個草稿使用。（但Markdown格式無法匯回！）</li>
          <li>想知道怎麼寫的，可以去github頁面看，原始碼全部在那邊，可以自己fork一個回去改。</li>
          <li>永久免費、Donate隨喜，付費不會解鎖新功能。</li>
        </ol>
      </div>
      <el-button type="primary" size="large" @click="$router.push('/editor')" class="start-button">
        開始編輯角色 →
      </el-button>
    </div>
    <div class="relate-link-group">
      <el-button type="text" class="donate-btn ani-pulse" @click="openDonatePage">
        ♡ 贊助阿童買果醬
      </el-button>
      <div class="mobile-row">
        <el-button type="text" class="report-btn" @click="openReportPage">
          <el-icon>
            <Flag />
          </el-icon> 建議與回報
        </el-button>
        <el-button type="text" class="github-btn" @click="openGithub">
          <i class="el-icon">
            <GitHubIcon />
          </i> GitHub
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
import GitHubIcon from '@/components/Common/GitHubIcon.vue'
import { Flag } from '@element-plus/icons-vue'

export default {
  name: 'HomeView',
  components: {
    GitHubIcon,
    Flag
  },
  methods: {
    openPersonalSite() {
      window.open('https://wuguofish.github.io/lonely-chat-ai/', '_blank')
    },
    openGithub() {
      window.open('https://github.com/wuguofish/character-editor', '_blank')
    },
    openReportPage() {
      window.open('https://forms.gle/8svwv5X4YSUuxDqb7', '_blank')
    },
    openDonatePage() {
      window.open('https://portaly.cc/atone0331/support', '_blank')
    }
  }
}
</script>

<style lang="scss" scoped>
.home {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  gap: 20px;
}

.container {
  @include home-container;
}

.relate-link-group {
  position: relative;
  top: 0px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 800px;
  margin: 0 auto 50px auto;
  flex-wrap: wrap;
  gap: 10px;
  align-self: center;
      left: auto;
        right: auto;

  @media (max-width: $mobile) {
    flex-direction: column;
    gap: 15px;
    
    .donate-btn {
      width: auto;
      max-width: 280px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    
    .report-btn, .github-btn {
      width: auto;
      max-width: 130px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      font-size: 1em;
    }
    
    .mobile-row {
      display: flex;
      flex-direction: row;
      justify-content: center;
      gap: 10px;
      width: 100%;
    }
  }
}

h1 {
  @include page-title;
}

.description {
  font-size: 1.2em;
  color: #793434;
  margin-bottom: 40px;
  line-height: 1.6;
}

.features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 40px;
}

.notice {
  text-align: left; 
  margin-bottom: 40px;
}

.feature-card {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 15px;
  padding: 20px;
  box-shadow: 0 10px 20px rgba(0,0,0,0.05);
}

.feature-card h3 {
  color: #667eea;
  margin-bottom: 10px;
  font-size: 1.3em;
}

.feature-card p {
  color: #666;
  font-size: 0.9em;
  line-height: 1.5;
}

.start-button {
  font-size: 1.2em;
  padding: 15px 30px;
  border-radius: 25px;
}

.personal-site-btn {
  @include btn-personal-site-home;
}

.github-btn {
  @include btn-github;
}

.report-btn {
  @include btn-report;
}

.donate-btn {  
  @include btn-donate;
}
</style>