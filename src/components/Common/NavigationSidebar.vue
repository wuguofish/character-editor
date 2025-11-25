<template>
  <div>
    <!-- 手機版：Hamburger Menu 按鈕 -->
    <div class="mobile-menu-button" @click="toggleMobileMenu">
      <el-icon :size="24">
        <Menu />
      </el-icon>
    </div>

    <!-- 手機版：全螢幕選單覆蓋層 -->
    <transition name="fade">
      <div v-if="showMobileMenu" class="mobile-menu-overlay" @click="closeMobileMenu">
        <div class="mobile-menu-content" @click.stop>
          <div class="mobile-menu-header">
            <h3>導覽選單</h3>
            <el-button circle @click="closeMobileMenu">
              <el-icon>
                <Close />
              </el-icon>
            </el-button>
          </div>
          <nav class="mobile-nav-list">
            <a
              v-for="item in navItems"
              :key="item.id"
              href="#"
              @click.prevent="scrollToSection(item.id)"
              class="mobile-nav-item"
            >
              <span class="nav-icon">{{ item.icon }}</span>
              <span class="nav-text">{{ item.label }}</span>
            </a>
          </nav>
        </div>
      </div>
    </transition>

    <!-- 桌面版：左側固定側邊欄 -->
    <aside class="desktop-sidebar">
      <div class="sidebar-header">
        <h3>快速導覽</h3>
      </div>
      <nav class="nav-list">
        <a
          v-for="item in navItems"
          :key="item.id"
          href="#"
          @click.prevent="scrollToSection(item.id)"
          :class="['nav-item', { active: activeSection === item.id }]"
        >
          <span class="nav-icon">{{ item.icon }}</span>
          <span class="nav-text">{{ item.label }}</span>
        </a>
      </nav>
    </aside>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue'
import { Menu, Close } from '@element-plus/icons-vue'

export default {
  name: 'NavigationSidebar',
  components: {
    Menu,
    Close
  },
  emits: ['navigate'],
  setup(props, { emit }) {
    const showMobileMenu = ref(false)
    const activeSection = ref('personal-info')

    const navItems = [
      { id: 'personal-info', label: '基本資料', icon: '👤' },
      { id: 'basic-settings', label: '基礎設定', icon: '⚙️' },
      { id: 'first-chat', label: '首次對話', icon: '💬' },
      { id: 'detailed-settings', label: '附加資訊', icon: '📋' },
      { id: 'events', label: '重要事件', icon: '🎬' },
      { id: 'secret-stories', label: '私密物語', icon: '🔐' }
    ]

    const toggleMobileMenu = () => {
      showMobileMenu.value = !showMobileMenu.value
    }

    const closeMobileMenu = () => {
      showMobileMenu.value = false
    }

    const scrollToSection = (sectionId) => {
      emit('navigate', sectionId)
      closeMobileMenu()
    }

    // 監聽滾動位置，更新當前區塊
    const updateActiveSection = () => {
      const sections = navItems.map(item => item.id)
      const scrollPosition = window.scrollY + 100 // 加上一點偏移量

      for (let i = sections.length - 1; i >= 0; i--) {
        const sectionId = sections[i]
        const element = document.querySelector(`[data-section="${sectionId}"]`)

        if (element) {
          const top = element.offsetTop
          if (scrollPosition >= top) {
            activeSection.value = sectionId
            break
          }
        }
      }
    }

    onMounted(() => {
      window.addEventListener('scroll', updateActiveSection)
      updateActiveSection()
    })

    onUnmounted(() => {
      window.removeEventListener('scroll', updateActiveSection)
    })

    return {
      showMobileMenu,
      activeSection,
      navItems,
      toggleMobileMenu,
      closeMobileMenu,
      scrollToSection
    }
  }
}
</script>

<style lang="scss" scoped>
/* 手機版：Hamburger Menu 按鈕 */
.mobile-menu-button {
  position: fixed;
  top: 20px;
  left: 20px;
  z-index: 1000;
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
  transition: all 0.3s ease;
  color: white;

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 6px 20px rgba(102, 126, 234, 0.6);
  }

  &:active {
    transform: scale(0.95);
  }
}

/* 手機版：全螢幕覆蓋層 */
.mobile-menu-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(5px);
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.mobile-menu-content {
  background: white;
  border-radius: 20px;
  width: 100%;
  max-width: 400px;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

.mobile-menu-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 2px solid #f0f0f0;

  h3 {
    margin: 0;
    font-size: 1.3em;
    color: #333;
  }
}

.mobile-nav-list {
  padding: 10px;
}

.mobile-nav-item {
  display: flex;
  align-items: center;
  padding: 15px 20px;
  margin: 5px 0;
  border-radius: 12px;
  text-decoration: none;
  color: #333;
  transition: all 0.3s ease;
  background: #f8f9fa;

  &:hover {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    transform: translateX(5px);
  }

  .nav-icon {
    font-size: 1.5em;
    margin-right: 15px;
  }

  .nav-text {
    font-size: 1.1em;
    font-weight: 500;
  }
}

/* 桌面版：左側固定側邊欄 */
.desktop-sidebar {
  position: fixed;
  left: 0;
  top: 100px;
  width: 200px;
  padding: 20px;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 0 15px 15px 0;
  box-shadow: 2px 0 15px rgba(0, 0, 0, 0.1);
  z-index: 100;
  max-height: calc(100vh - 120px);
  overflow-y: auto;
}

.sidebar-header {
  margin-bottom: 15px;
  padding-bottom: 10px;
  border-bottom: 2px solid #f0f0f0;

  h3 {
    margin: 0;
    font-size: 1em;
    color: #666;
    font-weight: 600;
  }
}

.nav-list {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.nav-item {
  display: flex;
  align-items: center;
  padding: 10px 12px;
  border-radius: 10px;
  text-decoration: none;
  color: #666;
  transition: all 0.3s ease;
  font-size: 0.95em;

  &:hover {
    background: #f0f0f0;
    color: #333;
    transform: translateX(3px);
  }

  &.active {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    font-weight: 600;
    box-shadow: 0 2px 8px rgba(102, 126, 234, 0.3);
  }

  .nav-icon {
    font-size: 1.2em;
    margin-right: 10px;
  }

  .nav-text {
    font-size: 0.95em;
  }
}

/* 淡入淡出動畫 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* 手機版樣式 */
@media (max-width: 768px) {
  .desktop-sidebar {
    display: none;
  }
}

/* 桌面版：隱藏手機選單按鈕 */
@media (min-width: 769px) {
  .mobile-menu-button {
    display: none;
  }
}

/* 自訂滾動條樣式 */
.desktop-sidebar::-webkit-scrollbar,
.mobile-menu-content::-webkit-scrollbar {
  width: 6px;
}

.desktop-sidebar::-webkit-scrollbar-track,
.mobile-menu-content::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

.desktop-sidebar::-webkit-scrollbar-thumb,
.mobile-menu-content::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 10px;
}

.desktop-sidebar::-webkit-scrollbar-thumb:hover,
.mobile-menu-content::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>
